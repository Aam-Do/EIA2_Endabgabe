namespace DoenerDream {
    export abstract class Human extends Moveable {
        public abstract moods: string[];
        public mood: string;
        protected intervalId: number;

        protected constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            drawHuman(this.mood);
            crc2.restore();
        }

        protected updateMood(_addend: number): void {
            if (_addend < 0) {
                if (this.moods.indexOf(this.mood) + _addend >= 0) {
                    this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
                }
                else {
                    this.mood = this.moods[0];
                }
            }
            else if (this.moods.indexOf(this.mood) + _addend >= this.moods.length) {
                this.mood = this.moods[this.moods.length];
            }
            else {
                this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
            }
        }

    }
}