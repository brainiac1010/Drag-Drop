let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

for (let list of lists) {
    // Handle drag events for desktop
    list.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    });

    rightBox.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    rightBox.addEventListener("drop", function (e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("text/plain");
        let draggableElement = document.getElementById(data);
        rightBox.appendChild(draggableElement);
    });

    leftBox.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    leftBox.addEventListener("drop", function (e) {
        e.preventDefault();
        let data = e.dataTransfer.getData("text/plain");
        let draggableElement = document.getElementById(data);
        leftBox.appendChild(draggableElement);
    });

    // Handling touch events for mobile
    list.addEventListener("touchstart", function (e) {
        e.target.classList.add('dragging');
        let touch = e.touches[0];
        e.target.initialX = touch.clientX;
        e.target.initialY = touch.clientY;
    });

    list.addEventListener("touchmove", function (e) {
        let touch = e.touches[0];
        let draggingItem = document.querySelector('.dragging');
        let deltaX = touch.clientX - draggingItem.initialX;
        let deltaY = touch.clientY - draggingItem.initialY;

        draggingItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    list.addEventListener("touchend", function (e) {
        let draggingItem = document.querySelector('.dragging');
        draggingItem.classList.remove('dragging');
        draggingItem.style.transform = 'none';

        let touch = e.changedTouches[0];
        let elementAtDrop = document.elementFromPoint(touch.clientX, touch.clientY);

        if (rightBox.contains(elementAtDrop)) {
            rightBox.appendChild(draggingItem);
        } else if (leftBox.contains(elementAtDrop)) {
            leftBox.appendChild(draggingItem);
        }
    });
}

// Generate unique IDs for draggable elements
for (let i = 0; i < lists.length; i++) {
    lists[i].id = `list-item-${i}`;
}
