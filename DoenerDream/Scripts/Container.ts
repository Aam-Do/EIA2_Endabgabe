namespace DoenerDream {
    export class Container extends Moveable {
        public ingredient: string;
        public capacity: number;
        public amount: number;

        public constructor() {
            super(new Vector(1, 1));
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "green";
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 360);
            crc2.fill();
            crc2.restore();
        }
    }
}
