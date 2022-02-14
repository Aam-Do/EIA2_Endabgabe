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
    let soldMeals: number = 0;
    export let plate: Plate;
    export interface Stock {
        [key: string]: number;
    }
    export let stock: Stock;
    let stockDiv: HTMLDivElement;
    let statsDiv: HTMLDivElement;
    let orderDiv: HTMLDivElement;
    let lastFrame: number;
    let canvas: HTMLCanvasElement;
    let body: HTMLBodyElement;

    export function calculateRandom(_min: number, _max: number): number {
        let random: number = (Math.random() * (_max - _min)) + _min;
        return (random);
    }

    function hndLoad(_event: Event): void {
        let startButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#startButton");
        startButton.addEventListener("click", prepareGame);
    }

    function prepareGame(): void {
        formData = new FormData(document.forms[0]);

        staffRestingTime = Number(formData.get("restTime")) * 1000;
        staffAmount = Number(formData.get("staffAmount"));
        customerSpawnRate = (60 / Number(formData.get("customerAmount"))) * 1000;
        maxStock = Number(formData.get("stockCapacity"));
        containerCapacity = Number(formData.get("containerCapacity"));
        stock = {
            onions: maxStock,
            lettuce: maxStock,
            cabbage: maxStock,
            corn: maxStock,
            sauce: maxStock,
            falafel: maxStock,
            yufka: maxStock,
            doener: maxStock
        };

        // staffRestingTime = 10;
        // staffAmount = 3;
        // customerSpawnRate = 8;
        // maxStock = 60;
        // containerCapacity = 20;
        // stock = {
        //     onions: maxStock,
        //     lettuce: maxStock,
        //     cabbage: maxStock,
        //     corn: maxStock,
        //     sauce: maxStock,
        //     falafel: maxStock,
        //     yufka: maxStock,
        //     doener: maxStock
        // };

        canvas = document.createElement("canvas");
        canvas.setAttribute("width", "1300");
        canvas.setAttribute("height", "800");
        body = <HTMLBodyElement>document.querySelector("body");
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        body.removeChild(form);
        body.appendChild(canvas);

        // canvas = <HTMLCanvasElement>document.querySelector("canvas");

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

        statsDiv = document.createElement("div");
        statsDiv.setAttribute("id", "statsDiv");
        body.appendChild(statsDiv);

        orderDiv = document.createElement("div");
        orderDiv.setAttribute("id", "orderDiv");
        body.appendChild(orderDiv);
        updateOrderDiv([]);

        startGame();
    }

    export function updateOrderDiv(_order: string[]): void {
        orderDiv.innerHTML = "";
        let headline: HTMLParagraphElement = document.createElement("p");
        headline.innerHTML = "<b> Order <b>";
        orderDiv.appendChild(headline);
        for (let ingredient of _order) {
            let paragraph: HTMLParagraphElement = document.createElement("p");
            paragraph.innerHTML = "- " + ingredient;
            orderDiv.appendChild(paragraph);
        }
    }

    function updateStatsDiv(): void {
        statsDiv.innerHTML = "";
        let amount: HTMLParagraphElement = document.createElement("p");
        amount.innerHTML = "Meals sold: " + soldMeals;
        statsDiv.appendChild(amount);

        let customerMood: HTMLParagraphElement = document.createElement("p");
        let mood: string = "none";
        let moodIndex: number = 0;
        if (customers.length > 0) {
            for (let customer of customers) {
                moodIndex += customer.moods.indexOf(customer.mood);
            }
            moodIndex = Math.floor(moodIndex / customers.length);
            mood = customers[0].moods[moodIndex];
        }
        customerMood.innerHTML = "Average customer mood: " + mood;
        statsDiv.appendChild(customerMood);

        let staffMood: HTMLParagraphElement = document.createElement("p");
        mood = "none";
        moodIndex = 0;
        if (workers.length > 0) {
            for (let staff of workers) {
                moodIndex += staff.moods.indexOf(staff.mood);
            }
            moodIndex = Math.floor(moodIndex / workers.length);
            mood = workers[0].moods[moodIndex];
        }
        staffMood.innerHTML = "Average staff mood: " + mood;
        statsDiv.appendChild(staffMood);
    }

    export function updateStockDiv(): void {
        stockDiv.innerHTML = "";
        for (let ingredient in stock) {
            let paragraph: HTMLParagraphElement = document.createElement("p");
            paragraph.innerHTML = ingredient + ": " + stock[ingredient] + " / " + maxStock;
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
        setTimeout(function (): void { stock[target.id] = maxStock; updateStockDiv(); }, 5000);
    }

    function startGame(): void {
        lastFrame = performance.now();
        newCustomer();
        for (let i: number = 0; i < staffAmount; i++) {
            let staff: Staff = new Staff(staffRestingTime);
            workers.push(staff);
            if (i == 0) {
                staff.position = new Vector(750, middle.y);
                staff.task = TASK.BAR;
            }
        }
        let loop: number = 0;
        for (let ingredient in stock) {
            let container: Container = new Container(ingredient, containerCapacity);
            if (loop == 4) {
                container.position.y += loop * 2 * 85;
            }
            else {
                container.position.y += loop * 85;
            }
            containers.push(container);
            loop += 1;
        }
        plate = new Plate();
        update();
        window.setInterval(newCustomer, customerSpawnRate);
    }

    function hndCanvasClick(_event: MouseEvent): void {
        let object: HTMLElement = <HTMLElement>_event.target;
        let rect: DOMRect = object.getBoundingClientRect();
        let scaling: Vector = new Vector(crc2.canvas.height / rect.height, crc2.canvas.width / rect.width);
        let pointer: Vector = new Vector((_event.clientX - rect.left) * scaling.x, (_event.clientY - rect.top) * scaling.x);

        let target: Staff | Plate | Container | undefined;
        for (let container of containers) {
            if (container.position.x < pointer.x && pointer.x < container.position.x + 90 && pointer.y > container.position.y && pointer.y < container.position.y + 70) {
                let targeted: boolean = false;
                for (let staff of workers) {
                    if (staff.target == container)
                        targeted = true;
                }
                if (targeted == false)
                    target = container;
            }
        }
        for (let staff of workers) {
            if (30 >= new Vector(staff.position.x - pointer.x, staff.position.y - pointer.y).length && staff.task == TASK.WAITING) {
                staff.active = true;
                target = staff;
                console.log(staff);
            }
        }
        if (35 >= new Vector(plate.position.x - pointer.x, plate.position.y - pointer.y).length)
            target = plate;
        if (target instanceof Container) {
            let activeStaff: Staff | undefined;
            for (let staff of workers) {
                if (staff.active == true) {
                    activeStaff = staff;
                    staff.refill(target);
                    staff.active = false;
                    console.log(target);
                }
            }
            if (activeStaff == undefined) {
                if (target.amount > 0) {
                    let barStaff: Staff | undefined;
                    for (let staff of workers) {
                        if (staff.task == TASK.BAR)
                            barStaff = staff;
                    }
                    if (barStaff)
                        barStaff.fillPlate(target);
                    console.log("added " + target.ingredient);
                }
            }
        }
        else if (target instanceof Plate) {
            for (let customer of customers) {
                if (customer.state == STATE.WAITING) {
                    customer.receiveFood(target.contents);
                    plate.contents = [];
                    soldMeals += 1;
                }
            }
        }
        else if (target == undefined) {
            for (let staff of workers) {
                if (staff.active == true)
                    staff.active = false;
            }
        }
    }

    function newCustomer(): void {
        if (customers.length < 4) {
            customers.push(new Customer(new Vector(customerSpawnPoint.x, customerSpawnPoint.y)));
        }
    }

    function update(): void {
        crc2.putImageData(background, 0, 0);
        let frameTime: number = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let customer of customers) {
            customer.move(frameTime / 1000);
            customer.draw();
        }
        for (let container of containers) {
            container.draw();
        }
        for (let staff of workers) {
            staff.move(frameTime / 1000);
            staff.draw();
        }
        plate.draw();
        updateStatsDiv();
        window.requestAnimationFrame(update);
    }

    export function removeCustomer(_customer: Customer): void {
        customers.splice(customers.indexOf(_customer), 1);

    }

    function drawBackground(): void {
        crc2.save();
        crc2.fillStyle = "saddlebrown";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        crc2.fillStyle = "black";
        crc2.fillRect(barPosition.x, barPosition.y, 150, crc2.canvas.height);

        crc2.fillStyle = "azure";
        crc2.fillRect(middle.x + (middle.x / 2), 0, middle.x / 2, crc2.canvas.height);

        crc2.fillStyle = "lightgrey";
        crc2.fillRect(crc2.canvas.width - middle.x / 6, 0, middle.x / 6, middle.y);
        crc2.restore();
    }

}