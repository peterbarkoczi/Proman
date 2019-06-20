import {dataHandler} from "./data_handler.js";

window.onload = function () {
    let containers = document.querySelectorAll('.board-column-content');
    let containersArray = Array.from(containers);
    dragula(containersArray).on('drop', function (element) {
        let id = element.getAttribute('id');
        let title = element.textContent;
        let status = element.parentNode.parentNode.querySelector('.board-column-title').textContent;
        let statusId = statuses[`${status}`];
        let boardId = element.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        let newRow = {'id': id, 'board_id': boardId, 'title': title, 'status_id': statusId, 'order': 0};
        dataHandler.saveCardPosition(JSON.stringify(newRow))
    });
};


const statuses = {'New': 0, 'In Progress': 1, 'Testing': 2, 'Done': 3};