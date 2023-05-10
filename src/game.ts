import Player from "./entities/player";
import { Position } from "./entities/atributes/position";

export default class Game {
  players: Player[] = [];

  PLAYER_SPEED = 4;

  constructor() { }

  addNewPlayerToGame(playerId: string): Player {
    const player = new Player(playerId, { x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500) }, `rgb(${this.randomRgb()},${this.randomRgb()},${this.randomRgb()})`)
    this.players.push(player)
    return player;
  }

  //TODO: que devuelva el Player, en un futuro va a servir
  deletePlayerFromGame(playerId: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == playerId) {
        this.players.splice(i, 1);
      }
    }
  }

  private randomRgb(): number {
    return Math.floor(Math.random() * 255);
  }

  /*MEJORAR ESTA BASURA*/
  /*keys = [w,s,a,d]*/
  updatePlayerPosition(keys: Array<boolean>, playerId: string): {[playerId: string]: Position}{
    let returnData: {[playerId: string]: Position} = {};
    this.players.forEach((player) => {
      if (player.id === playerId) {
        if (keys[0]) {
          player.position.y += this.PLAYER_SPEED;
        }
        if (keys[1]) {
          player.position.y += -this.PLAYER_SPEED;
        }
        if (keys[2]) {
          player.position.x += -this.PLAYER_SPEED;
        }
        if (keys[3]) {
          player.position.x += this.PLAYER_SPEED;
        }
        returnData[playerId] = player.position;
      }
    })

    return returnData;
  }

}