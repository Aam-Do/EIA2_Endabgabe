"use strict";
var DoenerDream;
(function (DoenerDream) {
    function drawHuman(_mood) {
        switch (_mood) {
            case "pissed":
                DoenerDream.crc2.fillStyle = "crimson";
                break;
            case "angry":
                DoenerDream.crc2.fillStyle = "orangered";
                break;
            case "okay":
                DoenerDream.crc2.fillStyle = "orange";
                break;
            case "good":
                DoenerDream.crc2.fillStyle = "yellow";
                break;
            case "happy":
                DoenerDream.crc2.fillStyle = "greenyellow";
                break;
            case "ecstatic":
                DoenerDream.crc2.fillStyle = "lime";
                break;
            case "burnout":
                DoenerDream.crc2.fillStyle = "red";
                break;
            case "stressed":
                DoenerDream.crc2.fillStyle = "orange";
                break;
            case "bored":
                DoenerDream.crc2.fillStyle = "lightgreen";
                break;
            case "sleeping":
                DoenerDream.crc2.fillStyle = "deepskyblue";
                break;
            default:
                DoenerDream.crc2.fillStyle = "yellow";
        }
        DoenerDream.crc2.beginPath();
        DoenerDream.crc2.arc(0, 0, 30, 0, 360);
        DoenerDream.crc2.closePath();
        DoenerDream.crc2.fill();
    }
    DoenerDream.drawHuman = drawHuman;
})(DoenerDream || (DoenerDream = {}));
//# sourceMappingURL=Paths.js.map