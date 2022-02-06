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
    let middleX;
    let middleY;
    let background;
    let stocks = {
        onions: 74,
        lettuce: 33,
        cabbage: 68,
        corn: 52,
        sauce: 46
    };
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        DoenerDream.crc2 = canvas.getContext("2d");
        middleX = DoenerDream.crc2.canvas.width / 2;
        middleY = DoenerDream.crc2.canvas.height / 2;
        drawBackground();
        background = DoenerDream.crc2.getImageData(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        // window.setInterval(update, 50);
    }
    function drawBackground() {
        DoenerDream.crc2.fillStyle = "saddlebrown";
        DoenerDream.crc2.fillRect(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "black";
        DoenerDream.crc2.fillRect(middleX - 100, 0, 150, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "azure";
        DoenerDream.crc2.fillRect(middleX + (middleX / 2), 0, middleX / 2, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "lightgrey";
        DoenerDream.crc2.fillRect(DoenerDream.crc2.canvas.width - middleX / 6, 0, middleX / 6, middleY);
    }
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Main.js.map