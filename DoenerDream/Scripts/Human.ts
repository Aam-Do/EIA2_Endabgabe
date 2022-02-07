namespace DoenerDream {
    export abstract class Human extends Moveable {
        protected abstract readonly moods: string[];
        protected mood: string;

        protected constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.arc(0, 0, 20, 0, 360);
            crc2.fill();
            crc2.restore();
        }

        protected updateMood(): void {
        //
        }

    }
}