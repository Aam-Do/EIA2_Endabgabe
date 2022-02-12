"use strict";
/*
Aufgabe: Endabagbe Döner Trainer
Name: Amélie Dell'Oro
Matrikel: 268339
Datum: 06.02.22
Inspiration: Lena Lappe
*/
var DoenerDream;
(function (DoenerDream) {
    window.addEventListener("load", hndLoad);
    let formData;
    let customerSpawnPoint;
    let customerSpawnRate;
    let staffRestingTime;
    let staffAmount;
    let maxStock;
    let containerCapacity;
    let background;
    DoenerDream.customers = [];
    let workers = [];
    let containers = [];
    let stockDiv;
    let orderDiv;
    let lastFrame;
    let canvas;
    let body;
    DoenerDream.test = [];
    function calculateRandom(_min, _max) {
        let random = (Math.random() * (_max - _min)) + _min;
        return (random);
    }
    DoenerDream.calculateRandom = calculateRandom;
    function hndLoad(_event) {
        // let startButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#startButton");
        // startButton.addEventListener("click", prepareGame);
        prepareGame();
    }
    function prepareGame() {
        // formData = new FormData(document.forms[0]);
        // staffRestingTime = Number(formData.get("restTime"));
        // staffAmount = Number(formData.get("staffAmount"));
        // customerSpawnRate = Number(formData.get("customerAmount"));
        // maxStock = Number(formData.get("stockCapacity"));
        // containerCapacity = Number(formData.get("containerCapacity"));
        // stock = {
        //     onions: maxStock,
        //     lettuce: maxStock,
        //     cabbage: maxStock,
        //     corn: maxStock,
        //     sauce: maxStock
        // };
        staffRestingTime = 6;
        staffAmount = 3;
        customerSpawnRate = 8;
        maxStock = 60;
        containerCapacity = 20;
        DoenerDream.stock = {
            onions: maxStock,
            lettuce: 30,
            cabbage: 30,
            corn: 30,
            sauce: maxStock
        };
        // canvas = document.createElement("canvas");
        // canvas.setAttribute("width", "1300");
        // canvas.setAttribute("height", "800");
        body = document.querySelector("body");
        // let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        // body.removeChild(form);
        // body.appendChild(canvas);
        canvas = document.querySelector("canvas");
        DoenerDream.crc2 = canvas.getContext("2d");
        DoenerDream.middle = new DoenerDream.Vector(DoenerDream.crc2.canvas.width / 2, DoenerDream.crc2.canvas.height / 2);
        DoenerDream.barPosition = new DoenerDream.Vector(DoenerDream.middle.x - 100, 0);
        DoenerDream.plate = new DoenerDream.Plate;
        customerSpawnPoint = new DoenerDream.Vector(-50, DoenerDream.middle.y);
        drawBackground();
        background = DoenerDream.crc2.getImageData(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        canvas.addEventListener("click", hndCanvasClick);
        stockDiv = document.createElement("div");
        stockDiv.setAttribute("id", "stockDiv");
        body.appendChild(stockDiv);
        updateStockDiv();
        startGame();
    }
    function updateStockDiv() {
        stockDiv.innerHTML = "";
        for (let ingredient in DoenerDream.stock) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = ingredient + ": " + DoenerDream.stock[ingredient];
            let restockButton = document.createElement("button");
            restockButton.setAttribute("id", ingredient);
            restockButton.innerHTML = "Restock";
            if (DoenerDream.stock[ingredient] >= maxStock)
                restockButton.setAttribute("disabled", "true");
            restockButton.addEventListener("click", restock);
            paragraph.appendChild(restockButton);
            stockDiv.appendChild(paragraph);
        }
    }
    function restock(_event) {
        let target = _event.target;
        target.setAttribute("disabled", "true");
        setTimeout(function () { DoenerDream.stock[target.id] = maxStock; updateStockDiv(); }, 5000);
    }
    function startGame() {
        lastFrame = performance.now();
        update();
        setInterval(customerLeave, 4100);
        newCustomer();
        window.setInterval(newCustomer, 3900);
    }
    function hndCanvasClick(_event) {
        // 
    }
    // test Functions
    function newCustomer() {
        if (DoenerDream.test.length < 5) {
            DoenerDream.test.push(new DoenerDream.Customer(new DoenerDream.Vector(customerSpawnPoint.x, customerSpawnPoint.y)));
        }
    }
    function customerLeave() {
        DoenerDream.test[0].receiveFood();
    }
    function update() {
        DoenerDream.crc2.putImageData(background, 0, 0);
        let frameTime = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let person of DoenerDream.test) {
            person.move(frameTime / 1000);
            person.draw();
        }
        window.requestAnimationFrame(update);
    }
    function removeCustomer(_customer) {
        DoenerDream.test.splice(DoenerDream.test.indexOf(_customer), 1);
    }
    DoenerDream.removeCustomer = removeCustomer;
    function drawBackground() {
        DoenerDream.crc2.fillStyle = "saddlebrown";
        DoenerDream.crc2.fillRect(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "black";
        DoenerDream.crc2.fillRect(DoenerDream.barPosition.x, DoenerDream.barPosition.y, 150, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "azure";
        DoenerDream.crc2.fillRect(DoenerDream.middle.x + (DoenerDream.middle.x / 2), 0, DoenerDream.middle.x / 2, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "lightgrey";
        DoenerDream.crc2.fillRect(DoenerDream.crc2.canvas.width - DoenerDream.middle.x / 6, 0, DoenerDream.middle.x / 6, DoenerDream.middle.y);
    }
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Main.js.map