namespace DoenerDream {
    export abstract class Human extends Moveable {
        public abstract moods: string[];
        public mood: string;

        protected constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();
            crc2.fillStyle = "yellow";
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 360);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }

        protected updateMood(_addend: number): void {
            if (_addend < 0) {
                if (this.moods.indexOf(this.mood) > 0) {
                    this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
                }
            }
            else {
                this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
            }
        }

    }
}