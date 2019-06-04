import {dom} from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    initEventListeners();
}

function initEventListeners() {
    newBoardListeners();
}

function newBoardListeners() {
    const divCreateBoard = document.querySelector("#create-board");
    const buttonCreateBoard = document.querySelector("#create-board-button");
    const boardCreator = document.createElement("div");

    buttonCreateBoard.addEventListener('click', function () {
        dom.createBoardButtonHandler(boardCreator, divCreateBoard, buttonCreateBoard);
    });
    dom.escHandler(buttonCreateBoard, boardCreator);
}

init();
