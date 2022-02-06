"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Moveable {
        constructor(_position) {
            this.position = _position;
            this.velocity = new DoenerDream.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    DoenerDream.Moveable = Moveable;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Moveable.js.map