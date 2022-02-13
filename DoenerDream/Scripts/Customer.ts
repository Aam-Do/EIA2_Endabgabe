namespace DoenerDream {

    export enum STATE {
        INQUEUE,
        WAITING,
        LEAVING
    }

    export class Customer extends Human {
        public order: string[];
        public state: STATE;
        public moods: string[] = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];

        public constructor(_position: Vector) {
            super(_position);
            this.velocity.set(150, 0);
            this.mood = this.moods[Math.round(calculateRandom(3, 4))];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.state = STATE.INQUEUE;
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);

            switch (this.state) {
                case STATE.INQUEUE:
                    let nextInLine: Customer = customers[customers.indexOf(this) - 1];
                    if (this.position.x >= middle.x - 150) {
                        this.velocity.set(0, 0);
                        this.state = STATE.WAITING;
                        this.purchase();
                        break;
                    }
                    else if (nextInLine) {
                        if ((this.velocity.length * _timeslice) + 150 > new Vector(nextInLine.position.x - this.position.x, nextInLine.position.y - this.position.y).length) {
                            this.velocity.set(0, 0);
                        }
                        else {
                            this.velocity.set(150, 0);
                        }
                    }
                    break;
                case STATE.LEAVING:
                    if (this.position.y > crc2.canvas.height + 50)
                    removeCustomer(this);
            }
        }

        public receiveFood(_plate: string[]): void {
            // clearInterval()
            
            this.velocity.set(0, 150);
            this.state = STATE.LEAVING;
        }

        private purchase(): void {
            //
        }

    }
}