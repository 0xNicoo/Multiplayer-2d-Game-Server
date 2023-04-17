import { Position } from "./atributes/position";

export default class Player {
    id: string;
    position: Position;
    color: string;

    constructor(id: string, positon: Position, color: string) {
        this.id = id;
        this.position = positon;
        this.color = color;
    }

}