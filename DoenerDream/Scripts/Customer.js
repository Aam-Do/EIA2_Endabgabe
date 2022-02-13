"use strict";
var DoenerDream;
(function (DoenerDream) {
    let STATE;
    (function (STATE) {
        STATE[STATE["INQUEUE"] = 0] = "INQUEUE";
        STATE[STATE["WAITING"] = 1] = "WAITING";
        STATE[STATE["LEAVING"] = 2] = "LEAVING";
    })(STATE || (STATE = {}));
    class Customer extends DoenerDream.Human {
        constructor(_position) {
            super(_position);
            this.moods = ["pissed", "angry", "unwell", "fine", "happy", "ecstatic"];
            this.velocity.set(150, 0);
            this.mood = this.moods[Math.round(DoenerDream.calculateRandom(3, 4))];
            this.order = ["yufka", "corn", "lettuce", "cabbage", "onions", "sauce", "falafel"];
            this.state = STATE.INQUEUE;
        }
        move(_timeslice) {
            super.move(_timeslice);
            switch (this.state) {
                case STATE.INQUEUE:
                    let nextInLine = DoenerDream.customers[DoenerDream.customers.indexOf(this) - 1];
                    if (this.position.x >= DoenerDream.middle.x - 150) {
                        this.velocity.set(0, 0);
                        this.state = STATE.WAITING;
                        this.purchase();
                        break;
                    }
                    else if (nextInLine) {
                        if ((this.velocity.length * _timeslice) + 150 > new DoenerDream.Vector(nextInLine.position.x - this.position.x, nextInLine.position.y - this.position.y).length) {
                            this.velocity.set(0, 0);
                        }
                        else {
                            this.velocity.set(150, 0);
                        }
                    }
                    break;
                case STATE.LEAVING:
                    if (this.position.y > DoenerDream.crc2.canvas.height + 50)
                        DoenerDream.removeCustomer(this);
            }
        }
        receiveFood() {
            this.velocity.set(0, 150);
            this.state = STATE.LEAVING;
        }
        purchase() {
            //
        }
    }
    DoenerDream.Customer = Customer;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Customer.js.map