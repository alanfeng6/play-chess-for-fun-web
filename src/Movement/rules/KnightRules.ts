import { Color, Piece, Position } from "../../Constants";
import { isEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // top and bottom
        if (position.y - prevPosition.y === 2 * i) {
          if (prevPosition.x - position.x === j) {
            if (isEmptyOrOccupiedByOpponent(position, boardState, color)) {
              return true;
            }
          }
        }
        // left and right
        else if (position.x - prevPosition.x === 2 * i) {
          if (prevPosition.y - position.y === j) {
            if (isEmptyOrOccupiedByOpponent(position, boardState, color)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }