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

function saveButtonListener() {
    const saveButton = document.querySelector("#save-button");
    saveButton.addEventListener('click', saveButtonFunction);
    document.addEventListener('keydown', function () {
        if (event.key === 'Enter') {
            let boardName = saveButtonFunction();
            dom.createBoard(boardName);
        }
    });
}

function saveButtonFunction() {
    const boardNameField = document.querySelector('#new-board-name');
    let boardName = boardNameField.value;
    return boardName
}

function newBoardListeners() {
    const divCreateBoard = document.querySelector("#create-board");
    const buttonCreateBoard = document.querySelector("#create-board-button");
    const boardCreatorField = document.createElement("div");

    buttonCreateBoard.addEventListener('click', function () {
        dom.createBoardButtonHandler(boardCreatorField, divCreateBoard, buttonCreateBoard);
        saveButtonListener();
    });
    dom.escHandler(buttonCreateBoard, boardCreatorField);
}

init();
