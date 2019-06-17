import {dom} from "./dom.js";

export function initEventListeners() {
    newBoardListeners();
}

function newBoardListeners() {
    const boardCreatorBox = document.querySelector("#board-creator-box");
    const boardCreatorButton = document.querySelector("#board-creator-button");

    boardCreatorButton.addEventListener('click', function () {
        dom.boardCreatorButtonHandler(boardCreatorBox, boardCreatorButton);
    });
}

export function boardHeaderListener() {
    const boards = document.querySelectorAll('.board');
    for (let board of boards) {
        let boardHeader = board.querySelector('.board-header');
        boardHeader.addEventListener('click', function () {
            toggleBoard(board);
        })
    }
}

function toggleBoard(board) {
    if (!event.target.classList.contains('board-header')) {
        return;
    }
    let boardColumns = board.querySelector('.board-columns');
    boardColumns.classList.toggle('hidden')
}

export function boardTitleListeners() {
    const boardTitles = document.querySelectorAll('.board-title');
    for (let boardTitle of boardTitles) {
        boardTitle.addEventListener('click', function() {
            renameBoard(boardTitle.textContent, event.target)
        })
    }
}

export function columnTitleListeners() {
    const columnTitles = document.querySelectorAll('.board-column-title');
    for (let columnTitle of columnTitles) {
        columnTitle.addEventListener('click', function() {
            renameColumn(columnTitle.textContent, event.target)
        })
    }
}

function renameBoard(oldTitle, newTitle) {
    let inputField = document.createElement('form');
    inputField.setAttribute('class', 'rename-field');
    inputField.setAttribute('action', '/rename-board');
    inputField.setAttribute('method', 'POST');
    inputField.innerHTML = `<input type="text" hidden name="old-title" value="${oldTitle}">
                            <input type="text" name="new-title" value="${oldTitle}">
                            <button type="submit">Save</button>`;
    newTitle.parentNode.replaceChild(inputField, newTitle)
}

function renameColumn(oldTitle, newTitle) {
    let inputField = document.createElement('form');
    inputField.setAttribute('class', 'rename-field');
    inputField.setAttribute('action', '/rename-column');
    inputField.setAttribute('method', 'POST');
    inputField.innerHTML = `<input type="text" hidden name="old-title" value="${oldTitle}">
                            <input type="text" name="new-title" value="${oldTitle}">
                            <button type="submit">Save</button>`;
    newTitle.parentNode.replaceChild(inputField, newTitle)
}
