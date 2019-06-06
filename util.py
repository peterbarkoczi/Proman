from functools import wraps
from flask import jsonify


def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function


def get_new_id(boards):
    last_board = max(boards, key=lambda x: x['id'])
    last_id = int(last_board['id'])
    return last_id + 1
