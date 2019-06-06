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
        boardHeader.addEventListener('click', function() {
            let boardColumns = board.querySelector('.board-columns');
            if (boardColumns.classList.contains('hidden')) {
                boardColumns.classList.remove('hidden')
            } else {
                boardColumns.classList.add('hidden')
            }
        })
    }

}