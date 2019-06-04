import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    initEventListeners();
}


function initEventListeners() {
    newBoardListener();
}

function newBoardListener() {
    const createBoardButton = document.querySelector("#create-board");
    const boards = document.querySelector("#boards");

    createBoardButton.addEventListener('click', function () {

        const boardCreator = document.createElement("div");
        boardCreator.setAttribute('id', 'board-creator');
        boardCreator.innerHTML = `<input type="text" id="new-board-name">
                                  <button id="save-button">Save</button>`;

        createBoardButton.appendChild(boardCreator);

    });
}

init();
