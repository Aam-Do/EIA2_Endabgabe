namespace DoenerDream {
    export class Customer extends Human {
        public order: string[];
        public currentCustomer: boolean;
        protected moods: string[] = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];

        public constructor(_position: Vector) {
            super(_position);
            this.mood = this.moods[Math.round(calculateRandom(3, 4))];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.currentCustomer = false;
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);

            if (this.position.y > crc2.canvas.height)
                removeCustomer(this);
        }


    }
}