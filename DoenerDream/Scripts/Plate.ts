namespace DoenerDream {
    export class Plate extends Moveable {
        public contents: string[];

        public constructor() {
            super(new Vector(middle.x - 25, middle.y));
            this.contents = [];
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            drawPlate(this.contents);
            crc2.restore();
        }
    }
}