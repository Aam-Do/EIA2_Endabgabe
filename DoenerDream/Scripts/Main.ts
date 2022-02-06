/*
Aufgabe: Endabagbe Döner Trainer
Name: Amélie Dell'Oro
Matrikel: 268339
Datum: 06.02.22
Inspiration: Lena Lappe
*/

namespace DoenerDream {

    window.addEventListener("load", hndLoad);

    let middleX: number;
    let middleY: number;
    let background: ImageData;
    export let crc2: CanvasRenderingContext2D;
    export interface Stock {
        [key: string]: number;
    }
    let stocks: Stock = {
        onions: 74,
        lettuce: 33,
        cabbage: 68,
        corn: 52,
        sauce: 46
    };

    function hndLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        crc2 = canvas.getContext("2d")!;
        middleX = crc2.canvas.width / 2;
        middleY = crc2.canvas.height / 2;


        drawBackground();
        background = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

        // window.setInterval(update, 50);
    }

    function drawBackground(): void {
        crc2.fillStyle = "saddlebrown";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        crc2.fillStyle = "black";
        crc2.fillRect(middleX - 100, 0, 150, crc2.canvas.height);

        crc2.fillStyle = "azure";
        crc2.fillRect(middleX + (middleX / 2), 0, middleX / 2, crc2.canvas.height);

        crc2.fillStyle = "lightgrey";
        crc2.fillRect(crc2.canvas.width - middleX / 6, 0, middleX / 6, middleY);
    }

}