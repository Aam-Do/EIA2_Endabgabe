namespace DoenerDream {
    export class Customer extends Human {
        public order: string[];
        public currentCustomer: boolean;
        protected moods: string[] = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];

        public constructor(_position: Vector) {
            super(_position);
            this.velocity.set(150, 0);
            this.mood = this.moods[3];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.currentCustomer = false;
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);

            if (this.position.y > crc2.canvas.height) {
                removeCustomer(this);
            }
            else if (this.position.x >= middleX - 150) {
                this.velocity.set(0, 0);
                this.position.x -= 1;
                this.currentCustomer = true;
            }

        }

        public leave(): void {
            this.velocity.set(0, 150);
        }


    }
}