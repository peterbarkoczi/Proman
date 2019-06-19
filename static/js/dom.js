// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import {initEventListeners} from "./event_listeners.js";


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
        document.querySelector('#loading').remove();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards((boards) => {
            this.showBoards(boards);
            this.hideLoading();
            initEventListeners();
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
            clone.querySelector("section").setAttribute("id", board.id);
            console.log(clone);
            boardsDiv.appendChild(clone);
            let boardId = board.id;
            this.loadCards(boardId);
        }
    },
    showBoard: function (board) {
        const template = document.querySelector('#board-template');

        const boardsDiv = document.querySelector('#boards');

        const clone = document.importNode(template.content, true);
        clone.querySelector('.board-title').textContent = board.title;
        boardsDiv.appendChild(clone);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, (cards) => {
            this.showCards(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    boardCreatorButtonHandler: function (boardCreatorBox, boardCreatorButton) {
        const fakeDiv = document.createElement('div');
        fakeDiv.setAttribute('id', 'fake-div');
        boardCreatorBox.appendChild(fakeDiv);


        const boardNamerBox = document.createElement("div");
        boardNamerBox.setAttribute('id', 'board-namer-box');
        fakeDiv.appendChild(boardNamerBox);
        boardNamerBox.innerHTML = `<form action="#" id="name-form">
                                   <input type="text" id="new-board-name" 
                                   name="new-board-name" placeholder="Board name" autofocus>
                                   <button id="board-save-button">Save</button>
                                   </form>`;

        const nameForm = document.querySelector("#name-form");
        dom.escapeNewBoardHandler(fakeDiv, boardCreatorButton);

        nameForm.addEventListener('submit', function (event) {
            event.preventDefault();
            dom.closeBox(fakeDiv);
            const boardTitle = boardNamerBox.querySelector("#new-board-name").value;
            dataHandler.createNewBoard(boardTitle,
                response => dataHandler.getBoard(response,
                    board => dom.showBoard(board)
                )
            )
        });
    },
    closeBox: function (whatToClose) {
        whatToClose.remove();
    },
    escapeNewBoardHandler: function (whatToClose) {
        document.addEventListener('keydown', function () {
            if (event.key === 'Escape') {
                dom.closeBox(whatToClose);
            }
        });
        whatToClose.addEventListener('click', function () {
            if (event.target.id === 'fake-div') {
                dom.closeBox(whatToClose)
            }
        })
    }
};