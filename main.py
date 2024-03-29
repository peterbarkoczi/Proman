from flask import Flask, render_template, url_for, request, redirect
from util import json_response, get_new_id

import persistence
import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/new-board", methods=['POST'])
def new_board():
    boards = persistence.get_boards()
    new_id = get_new_id(boards)
    new_board_title = request.form["new-board-name"]
    if new_board_title == "":
        persistence.append_boards(new_id)
    else:
        persistence.append_boards(new_id, new_board_title)
    return redirect(url_for('index'))


@app.route("/rename-board", methods=['POST'])
def rename_board():
    old_title = request.form['old-title']
    new_title = request.form['new-title']
    boards = data_handler.get_boards()
    for board in boards:
        if board['title'] == old_title:
            board['title'] = new_title
    persistence.update_boards(boards)
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
