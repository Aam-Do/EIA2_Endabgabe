"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Human extends DoenerDream.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.fillStyle = "yellow";
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.crc2.beginPath();
            DoenerDream.crc2.arc(0, 0, 30, 0, 360);
            DoenerDream.crc2.closePath();
            DoenerDream.crc2.fill();
            DoenerDream.crc2.restore();
        }
        updateMood(_addend) {
            if (_addend < 0)
                if (this.moods.indexOf(this.mood) > 0)
                    this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
                else {
                    this.mood = this.moods[this.moods.indexOf(this.mood) + _addend];
                }
        }
    }
    DoenerDream.Human = Human;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Human.js.map