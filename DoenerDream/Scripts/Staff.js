"use strict";
var DoenerDream;
(function (DoenerDream) {
    let TASK;
    (function (TASK) {
        TASK[TASK["BAR"] = 0] = "BAR";
        TASK[TASK["GOINGTOCONTAINER"] = 1] = "GOINGTOCONTAINER";
        TASK[TASK["GOINGTOKITCHEN"] = 2] = "GOINGTOKITCHEN";
        TASK[TASK["REFILLING"] = 3] = "REFILLING";
        TASK[TASK["COMINGFROMREFILL"] = 4] = "COMINGFROMREFILL";
        TASK[TASK["RETURNING"] = 5] = "RETURNING";
        TASK[TASK["WAITING"] = 6] = "WAITING";
        TASK[TASK["RECOVERING"] = 7] = "RECOVERING";
    })(TASK = DoenerDream.TASK || (DoenerDream.TASK = {}));
    class Staff extends DoenerDream.Human {
        constructor(_restingTime) {
            super(new DoenerDream.Vector(0, 0));
            this.moods = ["burnout", "stressed", "content", "bored", "sleeping"];
            let validPos = false;
            let pos = new DoenerDream.Vector(0, 0);
            while (validPos == false) {
                pos.set(Math.round(DoenerDream.calculateRandom(800, 1200)), Math.round(DoenerDream.calculateRandom(35, DoenerDream.crc2.canvas.height - 35)));
                if (pos.x > 1000 && pos.y > 450) {
                    validPos = false;
                }
                else {
                    validPos = true;
                }
            }
            this.position = pos;
            this.mood = "content";
            this.task = TASK.WAITING;
            this.originalPosition = this.position.copy();
            this.restingTime = _restingTime * 1000;
            this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, 1);
        }
        move(_timeslice) {
            super.move(_timeslice);
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if ((this.velocity.length * _timeslice) + 150 > new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y).length) {
                        let distance = new DoenerDream.Vector(1200 - this.position.x, 200 - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                        this.task = TASK.GOINGTOKITCHEN;
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    if ((this.velocity.length * _timeslice) + 30 > new DoenerDream.Vector(1200 - this.position.x, 200 - this.position.y).length) {
                        this.velocity.set(0, 0);
                        let difference = this.target.capacity - this.target.amount;
                        DoenerDream.stock[this.target.ingredient] -= difference;
                        this.task = TASK.REFILLING;
                        setTimeout(this.comeBackFromRefill.bind(this), 3000);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    if ((this.velocity.length * _timeslice) + 150 > new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y).length) {
                        let distance = new DoenerDream.Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                        this.task = TASK.RETURNING;
                        this.target = undefined;
                    }
                    break;
                case TASK.RETURNING:
                    if ((this.velocity.length * _timeslice) > new DoenerDream.Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y).length) {
                        this.velocity.set(0, 0);
                        this.task = TASK.WAITING;
                        clearInterval(this.intervalId);
                        this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, 1);
                    }
            }
        }
        refill(_target) {
            if (this.mood == this.moods[this.moods.length - 1])
                this.mood = this.moods[this.moods.length - 2];
            this.task = TASK.GOINGTOCONTAINER;
            this.target = _target;
            let distance = new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(200 / distance.length);
            clearInterval(this.intervalId);
            this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, -1);
        }
        fillPlate(_container) {
            DoenerDream.plate.contents.push(_container.ingredient);
            _container.amount -= 1;
        }
        updateMood(_addend) {
            if (this.task != TASK.BAR) {
                if (this.moods.indexOf(this.mood) == 0) {
                    clearInterval(this.intervalId);
                    let currentTask = this.task;
                    this.task = TASK.RECOVERING;
                    this.velocity.set(0, 0);
                    setTimeout(this.resumeTask.bind(this), this.restingTime, currentTask);
                }
                else if (this.moods.indexOf(this.mood) == this.moods.length - 1 && _addend > 0) {
                    // 
                }
                else {
                    super.updateMood(_addend);
                }
            }
        }
        resumeTask(_task) {
            super.updateMood(1);
            this.task = _task;
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if (this.target) {
                        let distance = new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    {
                        let distance = new DoenerDream.Vector(1200 - this.position.x, 200 - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    {
                        let distance = new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                    }
                    break;
                case TASK.REFILLING:
                    setTimeout(this.comeBackFromRefill.bind(this));
                case TASK.RETURNING:
                    this.task = TASK.WAITING;
            }
        }
        comeBackFromRefill() {
            if (DoenerDream.stock[this.target.ingredient] - this.target.capacity <= 0) {
                this.target.amount += DoenerDream.stock[this.target.ingredient];
                DoenerDream.stock[this.target.ingredient] = 0;
            }
            else {
                this.target.amount = this.target.capacity;
                DoenerDream.stock[this.target.ingredient] -= this.target.capacity - this.target.amount;
            }
            DoenerDream.updateStockDiv();
            this.task = TASK.COMINGFROMREFILL;
            let distance = new DoenerDream.Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(200 / distance.length);
        }
    }
    DoenerDream.Staff = Staff;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Staff.js.map