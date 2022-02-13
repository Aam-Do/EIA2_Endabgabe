"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Container extends DoenerDream.Moveable {
        constructor(_ingredient, _capacity) {
            super(new DoenerDream.Vector(DoenerDream.barPosition.x, 25));
            this.ingredient = _ingredient;
            this.capacity = _capacity;
            this.amount = this.capacity;
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.translate(this.position.x + 30, this.position.y);
            DoenerDream.crc2.fillStyle = "green";
            DoenerDream.crc2.fillRect(0, 70 - 70 * (this.amount / this.capacity), 90, 70 * (this.amount / this.capacity));
            DoenerDream.crc2.strokeStyle = "white";
            DoenerDream.crc2.strokeRect(0, 0, 90, 70);
            DoenerDream.crc2.restore();
        }
    }
    DoenerDream.Container = Container;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Container.js.map