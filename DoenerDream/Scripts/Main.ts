/*
Aufgabe: Endabagbe Döner Trainer
Name: Amélie Dell'Oro
Matrikel: 268339
Datum: 06.02.22
Inspiration: Lena Lappe
*/

namespace DoenerDream {

    window.addEventListener("load", hndLoad);

    let formData: FormData;
    let customerSpawnPoint: Vector;
    let customerSpawnRate: number;
    let staffRestingTime: number;
    let staffAmount: number;
    let maxStock: number;
    let containerCapacity: number;
    export let barPosition: Vector;
    export let middle: Vector;
    export let kitchenPosition: Vector;
    let background: ImageData;
    export let crc2: CanvasRenderingContext2D;
    export let customers: Customer[] = [];
    let workers: Staff[] = [];
    let containers: Container[] = [];
    export let plate: Plate;
    export interface Stock {
        [key: string]: number;
    }
    export let stock: Stock;
    let stockDiv: HTMLDivElement;
    let orderDiv: HTMLDivElement;
    let lastFrame: number;
    let canvas: HTMLCanvasElement;
    let body: HTMLBodyElement;
    export let test: Customer[] = [];

    export function calculateRandom(_min: number, _max: number): number {
        let random: number = (Math.random() * (_max - _min)) + _min;
        return (random);
    }

    function hndLoad(_event: Event): void {
        // let startButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#startButton");
        // startButton.addEventListener("click", prepareGame);
        prepareGame();
    }

    function prepareGame(): void {
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
        stock = {
            onions: maxStock,
            lettuce: 30,
            cabbage: 30,
            corn: 30,
            sauce: maxStock
        };

        // canvas = document.createElement("canvas");
        // canvas.setAttribute("width", "1300");
        // canvas.setAttribute("height", "800");
        body = <HTMLBodyElement>document.querySelector("body");
        // let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        // body.removeChild(form);
        // body.appendChild(canvas);

        canvas = <HTMLCanvasElement>document.querySelector("canvas");

        crc2 = canvas.getContext("2d")!;
        middle = new Vector(crc2.canvas.width / 2, crc2.canvas.height / 2);
        barPosition = new Vector(middle.x - 100, 0);
        plate = new Plate;
        customerSpawnPoint = new Vector(-50, middle.y);

        drawBackground();
        background = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

        canvas.addEventListener("click", hndCanvasClick);

        stockDiv = document.createElement("div");
        stockDiv.setAttribute("id", "stockDiv");
        body.appendChild(stockDiv);
        updateStockDiv();

        startGame();
    }

    function updateStockDiv(): void {
        stockDiv.innerHTML = "";
        for (let ingredient in stock) {
            let paragraph: HTMLParagraphElement = document.createElement("p");
            paragraph.innerHTML = ingredient + ": " + stock[ingredient];
            let restockButton: HTMLButtonElement = document.createElement("button");
            restockButton.setAttribute("id", ingredient);
            restockButton.innerHTML = "Restock";
            if (stock[ingredient] >= maxStock)
                restockButton.setAttribute("disabled", "true");
            restockButton.addEventListener("click", restock);
            paragraph.appendChild(restockButton);
            stockDiv.appendChild(paragraph);
        }
    }

    function restock(_event: MouseEvent): void {
        let target: HTMLButtonElement = <HTMLButtonElement>_event.target;
        target.setAttribute("disabled", "true");
        setTimeout(function (): void {stock[target.id] = maxStock; updateStockDiv(); }, 5000);
        
    }

    function startGame(): void {
        lastFrame = performance.now();
        update();

        setInterval(customerLeave, 4100);
        newCustomer();
        window.setInterval(newCustomer, 3900);
    }

    function hndCanvasClick(_event: MouseEvent): void {
        // 
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
        crc2.fillRect(barPosition.x, barPosition.y, 150, crc2.canvas.height);

        crc2.fillStyle = "azure";
        crc2.fillRect(middle.x + (middle.x / 2), 0, middle.x / 2, crc2.canvas.height);

        crc2.fillStyle = "lightgrey";
        crc2.fillRect(crc2.canvas.width - middle.x / 6, 0, middle.x / 6, middle.y);
    }

}