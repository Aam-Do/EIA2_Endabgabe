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
    // let stocks: Stock = {
    //     onions: 74,
    //     lettuce: 33,
    //     cabbage: 68,
    //     corn: 52,
    //     sauce: 46
    // };
    let customerSpawnPoint;
    let test;
    let lastFrame;
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        DoenerDream.crc2 = canvas.getContext("2d");
        DoenerDream.middleX = DoenerDream.crc2.canvas.width / 2;
        DoenerDream.middleY = DoenerDream.crc2.canvas.height / 2;
        customerSpawnPoint = new DoenerDream.Vector(0, DoenerDream.middleY);
        test = [new DoenerDream.Customer(customerSpawnPoint)];
        drawBackground();
        background = DoenerDream.crc2.getImageData(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        lastFrame = performance.now();
        update();
        setTimeout(customerLeave, 4000);
    }
    function customerLeave() {
        console.log("leave");
        test[0].leave();
    }
    function update() {
        DoenerDream.crc2.putImageData(background, 0, 0);
        let frameTime = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let person of test) {
            person.move(frameTime / 1000);
            person.draw();
        }
        window.requestAnimationFrame(update);
    }
    function removeCustomer(_customer) {
        test.splice(test.indexOf(_customer), 1);
    }
    DoenerDream.removeCustomer = removeCustomer;
    function drawBackground() {
        DoenerDream.crc2.fillStyle = "saddlebrown";
        DoenerDream.crc2.fillRect(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "black";
        DoenerDream.crc2.fillRect(DoenerDream.middleX - 100, 0, 150, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "azure";
        DoenerDream.crc2.fillRect(DoenerDream.middleX + (DoenerDream.middleX / 2), 0, DoenerDream.middleX / 2, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "lightgrey";
        DoenerDream.crc2.fillRect(DoenerDream.crc2.canvas.width - DoenerDream.middleX / 6, 0, DoenerDream.middleX / 6, DoenerDream.middleY);
    }
    function calculateRandom(_min, _max) {
        let random = (Math.random() * (_max - _min)) + _min;
        return (random);
    }
    DoenerDream.calculateRandom = calculateRandom;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Main.js.map