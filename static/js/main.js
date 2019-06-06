import {dom} from "./dom.js";
import {initEventListeners} from "./event_listeners.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    // places all event listeners
    initEventListeners();
}


init();
