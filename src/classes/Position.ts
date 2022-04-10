export class Position {
    x:number;
    y:number;
    z:number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getPosition() {
        return [this.x, this.y, this.z];
    }

    setPosition(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}