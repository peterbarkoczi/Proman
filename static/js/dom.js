// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    hideLoading: function () {
        document.querySelector('#loading').style.display = 'none';
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards((boards) => {
            this.showBoards(boards);
            this.hideLoading();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        const template = document.querySelector('#board-template');

        const boardsDiv = document.querySelector('#boards');

        for (let board of boards) {
            const clone = document.importNode(template.content, true);
            clone.querySelector('.board-title').textContent = board.title;
            boardsDiv.appendChild(clone);
        }
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features

    createBoardButtonHandler: function (boardCreator, divCreateBoard, buttonCreateBoard) {
        boardCreator.setAttribute('id', 'board-creator');
        boardCreator.innerHTML = `<input type="text" id="new-board-name">
                                  <button id="save-button">Save</button>`;
        divCreateBoard.appendChild(boardCreator);
        buttonCreateBoard.disabled = true;
    },

    escHandler: function (buttonCreateBoard, boardCreator) {
        document.addEventListener('keydown', function () {
            if (event.key === 'Escape') {
                boardCreator.remove();
                buttonCreateBoard.disabled = false;
            }
        })
    }
};