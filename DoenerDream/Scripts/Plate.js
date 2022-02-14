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
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.drawPlate(this.contents);
            DoenerDream.crc2.restore();
        }
    }
    DoenerDream.Plate = Plate;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Plate.js.map