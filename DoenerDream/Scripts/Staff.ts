namespace DoenerDream {

    export enum TASK {
        BAR,
        GOINGTOCONTAINER,
        GOINGTOKITCHEN,
        REFILLING,
        COMINGFROMREFILL,
        RETURNING,
        WAITING,
        RECOVERING
    }

    export class Staff extends Human {
        public active: boolean;
        public task: TASK;
        public target: Container | undefined;
        public moods: string[] = ["burnout", "stressed", "content", "bored", "sleeping"];
        private restingTime: number;
        private originalPosition: Vector;

        public constructor(_restingTime: number) {
            let validPos: boolean = false;
            let pos: Vector = new Vector(0, 0);
            while (validPos == false) {
                pos.set(Math.round(calculateRandom(800, 1200)), Math.round(calculateRandom(35, crc2.canvas.height - 35)));
                if (pos.x > 1000 && pos.y > 450) {
                    validPos = false;
                }
                else {
                    validPos = true;
                }
            }
            super(pos);
            this.mood = "content";
            this.task = TASK.WAITING;
            this.originalPosition = this.position.copy();
            this.restingTime = _restingTime * 1000;
            this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, 1);
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if ((this.velocity.length * _timeslice) + 150 > new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y).length) {
                        let distance: Vector = new Vector(1200 - this.position.x, 200 - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                        this.task = TASK.GOINGTOKITCHEN;
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    if ((this.velocity.length * _timeslice) + 30 > new Vector(1200 - this.position.x, 200 - this.position.y).length) {
                        this.velocity.set(0, 0);
                        let difference: number = this.target!.capacity - this.target!.amount;
                        stock[this.target!.ingredient] -= difference;
                        this.task = TASK.REFILLING;
                        setTimeout(this.comeBackFromRefill.bind(this), 3000);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    if ((this.velocity.length * _timeslice) + 150 > new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y).length) {
                        let distance: Vector = new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                        this.task = TASK.RETURNING;
                        this.target = undefined;
                    }
                    break;
                case TASK.RETURNING:
                    if ((this.velocity.length * _timeslice) > new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y).length) {
                        this.velocity.set(0, 0);
                        this.task = TASK.WAITING;
                        clearInterval(this.intervalId);
                        this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, 1);
                    }
            }
        }

        public refill(_target: Container): void {
            this.task = TASK.GOINGTOCONTAINER;
            this.target = _target;
            let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(200 / distance.length);
            clearInterval(this.intervalId);
            this.intervalId = setInterval(this.updateMood.bind(this), this.restingTime, -1);
        }

        public fillPlate(_container: Container): void {
            plate.contents.push(_container.ingredient);
            _container.amount -= 1;
        }

        protected updateMood(_addend: number): void {
            if (this.task != TASK.BAR) {
                if (this.moods.indexOf(this.mood) == 0) {
                    clearInterval(this.intervalId);
                    let currentTask: TASK = this.task;
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

        private resumeTask(_task: TASK): void {
            super.updateMood(1);
            this.task = _task;
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if (this.target) {
                        let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    {
                        let distance: Vector = new Vector(1200 - this.position.x, 200 - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(200 / distance.length);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    {
                        let distance: Vector = new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y);
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

        private comeBackFromRefill(): void {
            if (stock[this.target!.ingredient] - this.target!.capacity <= 0) {
                this.target!.amount += stock[this.target!.ingredient];
                stock[this.target!.ingredient] = 0;
            }
            else {
                this.target!.amount = this.target!.capacity;
                stock[this.target!.ingredient] -= this.target!.capacity - this.target!.amount;
            }
            updateStockDiv();
            this.task = TASK.COMINGFROMREFILL;
            let distance: Vector = new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(200 / distance.length);
        }

    }
}