import csv

STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _read_csv(file_name):
    """
    Reads content of a .csv file
    :param file_name: relative path to data file
    :return: OrderedDict
    """
    with open(file_name) as boards:
        rows = csv.DictReader(boards, delimiter=',', quotechar='"')
        formatted_data = []
        for row in rows:
            formatted_data.append(dict(row))
        return formatted_data


def _append_csv(file_name, new_id, new_board_title):
    new_row = f'{new_id},"{new_board_title}"\n'
    with open(file_name, 'a') as boards:
        boards.write(new_row)


def append_boards(new_id, new_board_title='New Board'):
    return _append_csv(BOARDS_FILE, new_id, new_board_title)


def _update_csv(file_name, updated_boards):
    with open(file_name, 'w', newline='') as boards:
        field_names = ['id', 'title']
        writer = csv.DictWriter(boards, fieldnames=field_names)

        writer.writeheader()
        for board in updated_boards:
            writer.writerow(board)


def update_boards(boards):
    return _update_csv(BOARDS_FILE, boards)


def update_columns(columns):
    return _update_csv(STATUSES_FILE, columns)


def _get_data(data_type, file, force):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param file: relative path to data file
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    if force or data_type not in _cache:
        _cache[data_type] = _read_csv(file)
    return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_statuses(force=False):
    return _get_data('statuses', STATUSES_FILE, force)


def get_boards(force=False):
    return _get_data('boards', BOARDS_FILE, force)


def get_cards(force=False):
    return _get_data('cards', CARDS_FILE, force)
