"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Plate extends DoenerDream.Moveable {
        constructor() {
            super(new DoenerDream.Vector(DoenerDream.middle.x - 25, DoenerDream.middle.y));
            this.contents = [];
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.fillStyle = "white";
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.crc2.beginPath();
            DoenerDream.crc2.arc(0, 0, 35, 0, 360);
            DoenerDream.crc2.closePath();
            DoenerDream.crc2.fill();
            DoenerDream.crc2.restore();
        }
    }
    DoenerDream.Plate = Plate;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Plate.js.map