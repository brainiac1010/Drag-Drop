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
    });

    list.addEventListener("touchmove", function (e) {
        e.preventDefault();
        let touchLocation = e.targetTouches[0];
        let draggingItem = document.querySelector('.dragging');
        draggingItem.style.position = "absolute";
        draggingItem.style.left = `${touchLocation.pageX}px`;
        draggingItem.style.top = `${touchLocation.pageY}px`;
    });

    list.addEventListener("touchend", function (e) {
        let draggingItem = document.querySelector('.dragging');
        draggingItem.style.position = "static";
        draggingItem.classList.remove('dragging');

        let touchLocation = e.changedTouches[0];
        let elementAtDrop = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

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
