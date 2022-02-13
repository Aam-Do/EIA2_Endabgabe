namespace DoenerDream {
    export class Plate extends Moveable {
        public contents: string[];

        public constructor() {
            super(new Vector(middle.x - 25, middle.y));
            this.contents = [];
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "white";
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 35, 0, 360);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
}