// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import {boardHeaderListener, boardTitleListeners, columnTitleListeners} from "./event_listeners.js";

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
            boardHeaderListener();
            boardTitleListeners();
            columnTitleListeners();
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
    boardCreatorButtonHandler: function (boardCreatorBox, boardCreatorButton) {
        const fakeDiv = document.createElement('div');
        fakeDiv.setAttribute('id', 'fake-div');
        boardCreatorBox.appendChild(fakeDiv);


        const boardNamerBox = document.createElement("div");
        boardNamerBox.setAttribute('id', 'board-namer-box');
        fakeDiv.appendChild(boardNamerBox);
        boardNamerBox.innerHTML = `<form action="/new-board" method="post">
                                       <input type="text" id="new-board-name" 
                                              name="new-board-name" placeholder="Board name" autofocus>
                                       <button id="board-save-button">Save</button>
                                   </form>`;

        boardCreatorButton.disabled = true;

        dom.escapeNewBoardHandler(fakeDiv, boardCreatorButton);
    //  dom.saveNewBoardHandler(fakeDiv, boardCreatorButton);
    },
    /* saveNewBoardHandler: function (whatToClose, boardCreatorButton) {
        const boardSaveButton = document.querySelector('#board-save-button');
        boardSaveButton.addEventListener('click', function () {
            dom.saveBoard(whatToClose, boardCreatorButton)
        });
        document.addEventListener('keydown', function () {
            if (event.key === "Enter") dom.saveBoard(whatToClose, boardCreatorButton);
        });
    },
    saveBoard: function (whatToClose, boardCreatorButton) {
        let boardName = document.querySelector('#new-board-name').value;
        dom.createNewBoard(boardName);
        dom.closeBox(whatToClose, boardCreatorButton)
    },
    createNewBoard: function (boardName) {
        const boardTemplate = document.querySelector('#board-template');
        const clone = document.importNode(boardTemplate.content, true);
        const boardTitle = clone.querySelector('.board-title');
        const boardContainer = document.querySelector('#boards');

        boardTitle.textContent = boardName;
        boardContainer.appendChild(clone);
    }, */
    closeBox: function (whatToClose, boardCreatorButton) {
        whatToClose.remove();
        boardCreatorButton.disabled = false;
    },
    escapeNewBoardHandler: function (whatToClose, boardCreatorButton) {
        document.addEventListener('keydown', function () {
            if (event.key === 'Escape') {
                dom.closeBox(whatToClose, boardCreatorButton);
            }
        });
        whatToClose.addEventListener('click', function () {
            console.log(event.target.id);
            if (event.target.id === 'fake-div') {
                dom.closeBox(whatToClose, boardCreatorButton)
            }
        })
    }
};