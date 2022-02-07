namespace DoenerDream {

    enum TASK {
        FRONTING,
        RESTOCKING,
        WAITING,
        
    }

    export class Staff extends Human {
        protected moods: string[] = ["burnout", "stressed", "content", "bored", "sleeping"];

    }
}