"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Customer extends DoenerDream.Human {
        constructor(_position) {
            super(_position);
            this.moods = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];
            this.mood = this.moods[Math.round(DoenerDream.calculateRandom(3, 4))];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.currentCustomer = false;
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.y > DoenerDream.crc2.canvas.height)
                DoenerDream.removeCustomer(this);
        }
    }
    DoenerDream.Customer = Customer;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Customer.js.map