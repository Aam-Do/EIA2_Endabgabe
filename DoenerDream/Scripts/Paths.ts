namespace DoenerDream {
    export function drawHuman(_mood: string): void {
        switch (_mood) {
            case "pissed":
                crc2.fillStyle = "crimson";
                break;
            case "angry":
                crc2.fillStyle = "orangered";
                break;
            case "okay":
                crc2.fillStyle = "orange";
                break;
            case "good":
                crc2.fillStyle = "yellow";
                break;
            case "happy":
                crc2.fillStyle = "greenyellow";
                break;
            case "ecstatic":
                crc2.fillStyle = "lime";
                break;
            case "burnout":
                crc2.fillStyle = "red";
                break;
            case "stressed":
                crc2.fillStyle = "orange";
                break;
            case "bored":
                crc2.fillStyle = "lightgreen";
                break;
            case "sleeping":
                crc2.fillStyle = "deepskyblue";
                break;
            default:
                crc2.fillStyle = "yellow";
        }
        crc2.beginPath();
        crc2.arc(0, 0, 30, 0, 360);
        crc2.closePath();
        crc2.fill();
    }
}