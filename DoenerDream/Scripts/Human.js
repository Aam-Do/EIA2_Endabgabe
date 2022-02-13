"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Human extends DoenerDream.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.drawHuman(this.mood);
            DoenerDream.crc2.restore();
        }
        updateMood(_addend) {
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
    DoenerDream.Human = Human;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Human.js.map