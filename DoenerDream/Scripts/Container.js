"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Container extends DoenerDream.Moveable {
        constructor() {
            super(new DoenerDream.Vector(1, 1));
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.fillStyle = "green";
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.crc2.beginPath();
            DoenerDream.crc2.arc(0, 0, 30, 0, 360);
            DoenerDream.crc2.fill();
            DoenerDream.crc2.restore();
        }
    }
    DoenerDream.Container = Container;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Container.js.map