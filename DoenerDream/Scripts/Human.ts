namespace DoenerDream {
    export abstract class Human extends Moveable {
        protected abstract readonly moods: string[];
        protected mood: string;

        protected constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "yellow";
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 360);
            crc2.fill();
            crc2.restore();
        }

        public updateMood(_addend: number): void {
            console.log(this.mood);
            this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
        }

    }
}