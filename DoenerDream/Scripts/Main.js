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
    let background;
    // export interface Stock {
    //     [key: string]: number;
    // }
    // let stock: Stock = {
    //     onions: 74,
    //     lettuce: 33,
    //     cabbage: 68,
    //     corn: 52,
    //     sauce: 46
    // };
    // let maxStock: number;
    let customerSpawnPoint;
    DoenerDream.test = [];
    let lastFrame;
    function calculateRandom(_min, _max) {
        let random = (Math.random() * (_max - _min)) + _min;
        return (random);
    }
    DoenerDream.calculateRandom = calculateRandom;
    function hndLoad(_event) {
        startGame();
    }
    function startGame() {
        let canvas = document.querySelector("canvas");
        DoenerDream.crc2 = canvas.getContext("2d");
        DoenerDream.middle = new DoenerDream.Vector(DoenerDream.crc2.canvas.width / 2, DoenerDream.crc2.canvas.height / 2);
        DoenerDream.plate = new DoenerDream.Plate;
        customerSpawnPoint = new DoenerDream.Vector(-50, DoenerDream.middle.y);
        drawBackground();
        background = DoenerDream.crc2.getImageData(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        lastFrame = performance.now();
        update();
        setInterval(customerLeave, 4100);
        newCustomer();
        window.setInterval(newCustomer, 3900);
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
        DoenerDream.crc2.fillRect(DoenerDream.middle.x - 100, 0, 150, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "azure";
        DoenerDream.crc2.fillRect(DoenerDream.middle.x + (DoenerDream.middle.x / 2), 0, DoenerDream.middle.x / 2, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "lightgrey";
        DoenerDream.crc2.fillRect(DoenerDream.crc2.canvas.width - DoenerDream.middle.x / 6, 0, DoenerDream.middle.x / 6, DoenerDream.middle.y);
    }
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Main.js.map