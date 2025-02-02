const imagePaths = [...Array(30).keys()].map(i => `images/image${i}.jpeg`);

function displayImages() {
    let container = document.getElementById("image-container");
    container.innerHTML = "";
    imagePaths.forEach(path => {
        let img = document.createElement("img");
        img.src = path;
        img.className = "image-box";
        container.appendChild(img);
    });

    setTimeout(() => {
        skipViewing();
    }, 120000); 
}

function skipViewing() {
    document.getElementById("viewing-phase").style.display = "none";
    document.getElementById("recall-phase").style.display = "block";
    setupRecallGrid();
}

function setupRecallGrid() {
    let bank = document.getElementById("photo-bank");
    let grid = document.getElementById("empty-grid");

    bank.innerHTML = "";
    grid.innerHTML = "";

    let shuffledImages = [...imagePaths].sort(() => Math.random() - 0.5);

    shuffledImages.forEach(path => {
        let img = document.createElement("img");
        img.src = path;
        img.className = "image-box draggable";
        img.draggable = true;
        img.ondragstart = dragStart;
        bank.appendChild(img);
    });

    for (let i = 0; i < 30; i++) {
        let slot = document.createElement("div");
        slot.className = "grid-slot";
        slot.ondragover = allowDrop;
        slot.ondrop = drop;
        grid.appendChild(slot);
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.src);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    if (event.target.classList.contains("grid-slot") && !event.target.hasChildNodes()) {
        let draggedImg = document.createElement("img");
        draggedImg.src = data;
        draggedImg.className = "image-box";
        event.target.appendChild(draggedImg);
    }
}

window.onload = displayImages;
