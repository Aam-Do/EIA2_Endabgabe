namespace DoenerDream {
    export class Container extends Moveable {
        public ingredient: string;
        public capacity: number;
        public amount: number;

        public constructor(_ingredient: string, _capacity: number) {
            super(new Vector(barPosition.x, 25));
            this.ingredient = _ingredient;
            this.capacity = _capacity;
            this.amount = this.capacity;
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x + 30, this.position.y);
            crc2.fillStyle = "green";
            crc2.fillRect(0, 70 - 70 * (this.amount / this.capacity), 90, 70 * (this.amount / this.capacity));
            crc2.strokeStyle = "white";
            crc2.strokeRect(0, 0, 90, 70);
            crc2.restore();
        }
    }
}
