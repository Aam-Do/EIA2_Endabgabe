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
    let soldMeals = 0;
    let stockDiv;
    let statsDiv;
    let orderDiv;
    let lastFrame;
    let canvas;
    let body;
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
        // falafel: maxStock,
        // yufkaBread: maxStock,
        // doenerBread: maxStock
        // };
        staffRestingTime = 6;
        staffAmount = 3;
        customerSpawnRate = 8;
        maxStock = 60;
        containerCapacity = 20;
        DoenerDream.stock = {
            onions: maxStock,
            lettuce: maxStock,
            cabbage: maxStock,
            corn: maxStock,
            sauce: maxStock,
            falafel: maxStock,
            yufka: maxStock,
            doener: maxStock
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
        statsDiv = document.createElement("div");
        statsDiv.setAttribute("id", "statsDiv");
        body.appendChild(statsDiv);
        orderDiv = document.createElement("div");
        orderDiv.setAttribute("id", "orderDiv");
        body.appendChild(orderDiv);
        updateOrderDiv(["onions", "cabbage", "lettuce"]);
        startGame();
    }
    function updateOrderDiv(_order) {
        orderDiv.innerHTML = "";
        let headline = document.createElement("p");
        headline.innerHTML = "<b> Order <b>";
        orderDiv.appendChild(headline);
        for (let ingredient of _order) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = "- " + ingredient;
            orderDiv.appendChild(paragraph);
        }
    }
    function updateStatsDiv() {
        statsDiv.innerHTML = "";
        let amount = document.createElement("p");
        amount.innerHTML = "Meals sold: " + soldMeals;
        statsDiv.appendChild(amount);
        let customerMood = document.createElement("p");
        let mood = "none";
        let moodIndex = 0;
        if (DoenerDream.customers.length > 0) {
            for (let customer of DoenerDream.customers) {
                moodIndex += customer.moods.indexOf(customer.mood);
            }
            moodIndex = Math.floor(moodIndex / DoenerDream.customers.length);
            mood = DoenerDream.customers[0].moods[moodIndex];
        }
        customerMood.innerHTML = "Average customer mood: " + mood;
        statsDiv.appendChild(customerMood);
        let staffMood = document.createElement("p");
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
    function updateStockDiv() {
        stockDiv.innerHTML = "";
        for (let ingredient in DoenerDream.stock) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = ingredient + ": " + DoenerDream.stock[ingredient] + " / " + maxStock;
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
        // setInterval(customerLeave, 9000);
        newCustomer();
        // for (let i: number = 0; i < staffAmount; i++) {
        let staff = new DoenerDream.Staff(staffRestingTime);
        workers.push(staff);
        staff.task = DoenerDream.TASK.BAR;
        // }
        let loop = 0;
        for (let ingredient in DoenerDream.stock) {
            let container = new DoenerDream.Container(ingredient, containerCapacity);
            if (loop == 4) {
                container.position.y += loop * 2 * 85;
            }
            else {
                container.position.y += loop * 85;
            }
            containers.push(container);
            loop += 1;
        }
        DoenerDream.plate = new DoenerDream.Plate();
        update();
        // window.setInterval(newCustomer, customerSpawnRate * 1000);
    }
    function hndCanvasClick(_event) {
        let object = _event.target;
        let rect = object.getBoundingClientRect();
        let scaling = new DoenerDream.Vector(DoenerDream.crc2.canvas.height / rect.height, DoenerDream.crc2.canvas.width / rect.width);
        let pointer = new DoenerDream.Vector((_event.clientX - rect.left) * scaling.x, (_event.clientY - rect.top) * scaling.x);
        let target;
        for (let container of containers) {
            if (container.position.x < pointer.x && pointer.x < container.position.x + 90 && pointer.y > container.position.y && pointer.y < container.position.y + 70) {
                target = container;
            }
        }
        // for (let staff of workers) {
        // }
        if (target instanceof DoenerDream.Container) {
            if (target.amount > 0) {
                let barStaff;
                for (let staff of workers) {
                    if (staff.task == DoenerDream.TASK.BAR)
                        barStaff = staff;
                }
                if (barStaff)
                    barStaff.fillPlate(target);
            }
        }
        console.log(DoenerDream.plate.contents, target);
    }
    // test Functions
    function newCustomer() {
        if (DoenerDream.customers.length < 5) {
            DoenerDream.customers.push(new DoenerDream.Customer(new DoenerDream.Vector(customerSpawnPoint.x, customerSpawnPoint.y)));
        }
    }
    function customerLeave() {
        DoenerDream.customers[0].receiveFood();
    }
    function update() {
        DoenerDream.crc2.putImageData(background, 0, 0);
        let frameTime = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let customer of DoenerDream.customers) {
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
        DoenerDream.plate.draw();
        updateStatsDiv();
        window.requestAnimationFrame(update);
    }
    function removeCustomer(_customer) {
        DoenerDream.customers.splice(DoenerDream.customers.indexOf(_customer), 1);
    }
    DoenerDream.removeCustomer = removeCustomer;
    function drawBackground() {
        DoenerDream.crc2.save();
        DoenerDream.crc2.fillStyle = "saddlebrown";
        DoenerDream.crc2.fillRect(0, 0, DoenerDream.crc2.canvas.width, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "black";
        DoenerDream.crc2.fillRect(DoenerDream.barPosition.x, DoenerDream.barPosition.y, 150, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "azure";
        DoenerDream.crc2.fillRect(DoenerDream.middle.x + (DoenerDream.middle.x / 2), 0, DoenerDream.middle.x / 2, DoenerDream.crc2.canvas.height);
        DoenerDream.crc2.fillStyle = "lightgrey";
        DoenerDream.crc2.fillRect(DoenerDream.crc2.canvas.width - DoenerDream.middle.x / 6, 0, DoenerDream.middle.x / 6, DoenerDream.middle.y);
        DoenerDream.crc2.restore();
    }
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Main.js.map