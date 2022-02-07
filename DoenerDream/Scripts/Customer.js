"use strict";
var DoenerDream;
(function (DoenerDream) {
    class Customer extends DoenerDream.Human {
        constructor(_position) {
            super(_position);
            this.moods = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];
            this.velocity.set(150, 0);
            this.mood = this.moods[3];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.currentCustomer = false;
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.y > DoenerDream.crc2.canvas.height) {
                DoenerDream.removeCustomer(this);
            }
            else if (this.position.x >= DoenerDream.middleX - 150) {
                this.velocity.set(0, 0);
                this.position.x -= 1;
                this.currentCustomer = true;
            }
        }
        leave() {
            this.velocity.set(0, 150);
        }
    }
    DoenerDream.Customer = Customer;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Customer.js.map