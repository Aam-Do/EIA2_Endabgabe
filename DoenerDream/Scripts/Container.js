"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Container extends DoenerDream.Moveable {
        constructor(_ingredient, _capacity) {
            super(new DoenerDream.Vector(DoenerDream.barPosition.x + 30, 25));
            this.ingredient = _ingredient;
            this.capacity = _capacity;
            this.amount = this.capacity;
        }
        draw() {
            DoenerDream.crc2.save();
            DoenerDream.crc2.translate(this.position.x, this.position.y);
            DoenerDream.drawContainer(this.amount, this.capacity, this.ingredient);
            DoenerDream.crc2.restore();
        }
    }
    DoenerDream.Container = Container;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Container.js.map