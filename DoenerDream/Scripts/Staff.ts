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
            super(new Vector(800, 400));
            this.mood = "content";
            this.task = TASK.WAITING;
            this.originalPosition = new Vector(600, 400);
            this.restingTime = _restingTime * 1000;
            setInterval(this.updateMood.bind(this), this.restingTime, 1);
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if ((this.velocity.length * _timeslice) + 250 > new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y).length) {
                        this.velocity.set(800, 400);
                        this.task = TASK.GOINGTOKITCHEN;
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    if ((this.velocity.length * _timeslice) + 100 > new Vector(800 - this.position.x, 400 - this.position.y).length) {
                        this.velocity.set(0, 0);
                        let difference: number = this.target!.capacity - this.target!.amount;
                        stock[this.target!.ingredient] -= difference;
                        this.task = TASK.REFILLING;
                        setTimeout(this.comeBackFromRefill);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    if ((this.velocity.length * _timeslice) + 250 > new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y).length) {
                        let distance: Vector = new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y);
                        this.velocity.set(distance.x, distance.y);
                        this.velocity.scale(100 / distance.length);
                        this.task = TASK.RETURNING;
                        this.target = undefined;
                    }
                    break;
                case TASK.RETURNING:
                    if ((this.velocity.length * _timeslice) + 250 > new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y).length) {
                        this.velocity.set(0, 0);
                        this.task = TASK.WAITING;
                        clearInterval(setInterval(this.updateMood.bind(this)));
                        setInterval(this.updateMood.bind(this), this.restingTime, 1);
                    }
            }
        }

        public refill(_target: Container): void {
            this.task = TASK.GOINGTOCONTAINER;
            this.target = _target;
            let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(100 / distance.length);
            clearInterval(setInterval(this.updateMood.bind(this)));
            setInterval(this.updateMood.bind(this), this.restingTime, -1);
        }

        public fillPlate(_container: Container): void {
            plate.contents.push(_container.ingredient);
            _container.amount -= 1;
        }

        protected updateMood(_addend: number): void {
            if (this.moods.indexOf(this.mood) >= 0) {
                clearInterval(setInterval(this.updateMood.bind(this)));
                let currentTask: TASK = this.task;
                this.task = TASK.RECOVERING;
                this.velocity.set(0, 0);
                setTimeout(this.resumeTask, this.restingTime * 2, currentTask);
            }
            else if (this.moods.indexOf(this.mood) == this.moods.length - 1 && _addend > 0) {
                // 
            }
            else {
                super.updateMood(_addend);
            }
        }

        private resumeTask(_task: TASK): void {
            // this.task = _task;
            // switch (this.task) {
            //     case TASK.GOINGTOCONTAINER:
            //         if (this.target) {
            //             let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            //             this.velocity.set(distance.x, distance.y);
            //             this.velocity.scale(100 / distance.length);
            //         }
            // }
        }

        private comeBackFromRefill(): void {
            this.target!.amount = this.target!.capacity;
            this.task = TASK.COMINGFROMREFILL;
            let distance: Vector = new Vector(this.target!.position.x - this.position.x, this.target!.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(100 / distance.length);
        }

    }
}