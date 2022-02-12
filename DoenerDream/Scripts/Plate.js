"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Plate extends DoenerDream.Moveable {
        constructor() {
            super(DoenerDream.middle);
            this.contents = [];
        }
        draw() {
            // 
        }
    }
    DoenerDream.Plate = Plate;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Plate.js.map