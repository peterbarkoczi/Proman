window.onload = function () {
    let containers = document.querySelectorAll('.board-column-content');
    let containersArray = Array.from(containers);
    dragula(containersArray);
};
