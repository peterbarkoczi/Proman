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
        document.querySelector('#loading').remove();
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
    boardCreatorButtonHandler: function (boardCreatorBox, boardCreatorButton) {
        const boardNamerBox = document.createElement("div");
        boardNamerBox.setAttribute('id', 'board-namer-box');
        boardCreatorBox.appendChild(boardNamerBox);
        boardNamerBox.innerHTML = `<input type="text" id="new-board-name">
                                  <button id="board-save-button">Save</button>`;

        boardCreatorButton.disabled = true;

        dom.escapeNewBoardHandler(boardNamerBox, boardCreatorButton);
        dom.saveNewBoardHandler(boardNamerBox, boardCreatorButton);
    },
    saveNewBoardHandler: function (boardNamerBox, boardCreatorButton) {
        const boardSaveButton = document.querySelector('#board-save-button');
        boardSaveButton.addEventListener('click', function () {
            dom.saveBoard(boardNamerBox, boardCreatorButton)
        });
        document.addEventListener('keydown', function () {
            if (event.key === "Enter") dom.saveBoard(boardNamerBox, boardCreatorButton);
        });
    },
    saveBoard: function (boardNamerBox, boardCreatorButton) {
        let boardName = document.querySelector('#new-board-name').value;
        dom.createNewBoard(boardName);
        dom.closeBoardCreatorBox(boardNamerBox, boardCreatorButton)
    },
    createNewBoard: function (boardName) {
        const boardTemplate = document.querySelector('#board-template');
        const clone = document.importNode(boardTemplate.content, true);
        const boardTitle = clone.querySelector('.board-title');
        const boardContainer = document.querySelector('#boards');

        boardTitle.textContent = boardName;
        boardContainer.appendChild(clone);
    },
    closeBoardCreatorBox: function (boardCreatorBox, boardCreatorButton) {
        boardCreatorBox.remove();
        boardCreatorButton.disabled = false;
    },
    escapeNewBoardHandler: function (boardCreatorBox, boardCreatorButton) {
        document.addEventListener('keydown', function () {
            if (event.key === 'Escape') {
                dom.closeBoardCreatorBox(boardCreatorBox, boardCreatorButton);
            }
        })
    }
};