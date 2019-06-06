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
