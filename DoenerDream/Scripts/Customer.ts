namespace DoenerDream {

    export enum STATE {
        INQUEUE,
        WAITING,
        LEAVING
    }

    export class Customer extends Human {
        public order: string[];
        public state: STATE;
        public moods: string[] = ["pissed", "angry", "okay", "good", "happy", "ecstatic"];

        public constructor(_position: Vector) {
            super(_position);
            this.velocity.set(150, 0);
            this.mood = this.moods[Math.round(calculateRandom(3, 4))];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            // for (let order in stock) {

            // }
            this.state = STATE.INQUEUE;
            setInterval(this.updateMood.bind(this), 10000);
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);

            switch (this.state) {
                case STATE.INQUEUE:
                    let nextInLine: Customer = customers[customers.indexOf(this) - 1];
                    if (this.position.x >= middle.x - 150) {
                        this.velocity.set(0, 0);
                        this.state = STATE.WAITING;
                        updateOrderDiv(this.order);
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
            clearInterval(setInterval(this.updateMood));
            if (_plate.length == this.order.length) {
                let overlap: number = 0;
                for (let ingredient of this.order) {
                    if (_plate.includes(ingredient))
                        overlap += 1;
                }
                if (overlap == this.order.length)
                    super.updateMood(1);
                else if (overlap == this.order.length - 1)
                    super.updateMood(-1);
                else {
                    super.updateMood(-2);
                }
            }
            else if (_plate.length - this.order.length == 1 || _plate.length - this.order.length == -1) {
                super.updateMood(-1);
            }
            else {
                super.updateMood(-2);
            }

            this.velocity.set(0, 150);
            this.state = STATE.LEAVING;
        }

        protected updateMood(): void {
            if (this.moods.indexOf(this.mood) == 0) {
                clearInterval(setInterval(this.updateMood));
                this.velocity.set(0, 150);
                this.state = STATE.LEAVING;
            }
            else {
                super.updateMood(-1);
            }
            console.log("updated customer mood");
        }
    }
}