/*
Aufgabe: Endabagbe Döner Trainer
Name: Amélie Dell'Oro
Matrikel: 268339
Datum: 06.02.22
Inspiration: Lena Lappe
*/

namespace DoenerDream {

    window.addEventListener("load", hndLoad);

    export let middle: Vector;
    let background: ImageData;
    export let crc2: CanvasRenderingContext2D;
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
    let customerSpawnPoint: Vector;
    export let test: Customer[] = [];
    let lastFrame: number;
    export let plate: Plate;

    export function calculateRandom(_min: number, _max: number): number {
        let random: number = (Math.random() * (_max - _min)) + _min;
        return (random);
    }

    function hndLoad(_event: Event): void {

        startGame();
    }

    function startGame(): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        crc2 = canvas.getContext("2d")!;
        middle = new Vector(crc2.canvas.width / 2, crc2.canvas.height / 2);
        plate = new Plate;
        customerSpawnPoint = new Vector(-50, middle.y);

        drawBackground();
        background = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

        lastFrame = performance.now();
        update();

        setInterval(customerLeave, 4100);
        newCustomer();
        window.setInterval(newCustomer, 3900);
    }

    // test Functions

    function newCustomer(): void {
        if (test.length < 5) {
            test.push(new Customer(new Vector(customerSpawnPoint.x, customerSpawnPoint.y)));
        }
    }

    function customerLeave(): void {
        test[0].receiveFood();
    }

    function update(): void {
        crc2.putImageData(background, 0, 0);
        let frameTime: number = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let person of test) {
            person.move(frameTime / 1000);
            person.draw();
        }
        window.requestAnimationFrame(update);
    }

    export function removeCustomer(_customer: Customer): void {
        test.splice(test.indexOf(_customer), 1);

    }

    function drawBackground(): void {
        crc2.fillStyle = "saddlebrown";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        crc2.fillStyle = "black";
        crc2.fillRect(middle.x - 100, 0, 150, crc2.canvas.height);

        crc2.fillStyle = "azure";
        crc2.fillRect(middle.x + (middle.x / 2), 0, middle.x / 2, crc2.canvas.height);

        crc2.fillStyle = "lightgrey";
        crc2.fillRect(crc2.canvas.width - middle.x / 6, 0, middle.x / 6, middle.y);
    }

}