namespace DoenerDream {
    export class Container extends Moveable {
        public ingredient: string;
        public capacity: number;
        public amount: number;

        public constructor(_ingredient: string, _capacity: number) {
            super(new Vector(barPosition.x + 30, 25));
            this.ingredient = _ingredient;
            this.capacity = _capacity;
            this.amount = this.capacity;
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            drawContainer(this.amount, this.capacity, this.ingredient);
            crc2.restore();
        }
    }
}
