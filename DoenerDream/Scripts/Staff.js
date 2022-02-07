"use strict";
var DoenerDream;
(function (DoenerDream) {
    let TASK;
    (function (TASK) {
        TASK[TASK["FRONTING"] = 0] = "FRONTING";
        TASK[TASK["RESTOCKING"] = 1] = "RESTOCKING";
        TASK[TASK["WAITING"] = 2] = "WAITING";
    })(TASK || (TASK = {}));
    class Staff extends DoenerDream.Human {
        constructor() {
            super(...arguments);
            this.moods = ["burnout", "stressed", "content", "bored", "sleeping"];
        }
    }
    DoenerDream.Staff = Staff;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Staff.js.map