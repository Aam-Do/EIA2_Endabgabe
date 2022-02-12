namespace DoenerDream {

    enum TASK {
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
        protected moods: string[] = ["burnout", "stressed", "content", "bored", "sleeping"];
        private restingTime: number;
        private originalPosition: Vector;

        public constructor() {
            super(new Vector(600, 400));
            this.mood = "content";
            this.task = TASK.WAITING;
            this.originalPosition = new Vector(600, 400);
            setInterval(this.updateMood, this.restingTime, 1);
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);
            switch (this.task) {
                case TASK.GOINGTOCONTAINER:
                    if (this.target) {
                        if ((this.velocity.length * _timeslice) + 250 > new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y).length) {
                            this.velocity.set(800, 400);
                            this.task = TASK.GOINGTOKITCHEN;
                        }
                    }
                    break;
                case TASK.GOINGTOKITCHEN:
                    if ((this.velocity.length * _timeslice) + 100 > new Vector(800 - this.position.x, 400 - this.position.y).length) {
                        this.velocity.set(0, 0);
                        this.task = TASK.REFILLING;
                        setTimeout(this.comeBackFromRefill);
                    }
                    break;
                case TASK.COMINGFROMREFILL:
                    if (this.target) {
                        if ((this.velocity.length * _timeslice) + 250 > new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y).length) {
                            let distance: Vector = new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y);
                            this.velocity.set(distance.x, distance.y);
                            this.velocity.scale(100 / distance.length);
                            this.task = TASK.RETURNING;
                            this.target = undefined;
                        }
                    }
                    break;
                case TASK.RETURNING:
                    if ((this.velocity.length * _timeslice) + 250 > new Vector(this.originalPosition.x - this.position.x, this.originalPosition.y - this.position.y).length) {
                        this.velocity.set(0, 0);
                        this.task = TASK.WAITING;
                        clearInterval(setInterval(this.updateMood));
                        setInterval(this.updateMood, this.restingTime, 1);
                    }
            }
        }

        public refill(_target: Container): void {
            this.task = TASK.GOINGTOCONTAINER;
            this.target = _target;
            let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
            this.velocity.set(distance.x, distance.y);
            this.velocity.scale(100 / distance.length);
            clearInterval(setInterval(this.updateMood));
            setInterval(this.updateMood, this.restingTime, -1);
        }

        public fillPlate(_container: Container): void {
            plate.contents.push(_container.ingredient);
            _container.amount -= 1;
        }

        protected updateMood(_addend: number): void {
            switch (this.moods.indexOf(this.mood)) {
                case 0:
                    clearInterval(setInterval(this.updateMood));
                    let currentTask: TASK = this.task;
                    this.task = TASK.RECOVERING;
                    this.velocity.set(0, 0);
                    setTimeout(this.resumeTask, this.restingTime * 2, currentTask);
                    break;
                case this.moods.length - 1:
                    break;
                default:
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
            if (this.target) {
                this.target.amount = this.target.capacity;
                this.task = TASK.COMINGFROMREFILL;
                let distance: Vector = new Vector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
                this.velocity.set(distance.x, distance.y);
                this.velocity.scale(100 / distance.length);
            }
        }

    }
}