import { Color, Piece, Position, samePosition } from "../../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./GeneralRules";

export const rookMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    if (prevPosition.x === position.x) {
      for (let i = 1; i < 8; i++) {
        let multiplier = position.y < prevPosition.y ? -1 : 1;
        let passedSquare: Position = {
          x: prevPosition.x,
          y: prevPosition.y + i * multiplier,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
    } else if (prevPosition.y === position.y) {
      for (let i = 1; i < 8; i++) {
        let multiplier = position.x < prevPosition.x ? -1 : 1;
        let passedSquare: Position = {
          x: prevPosition.x + i * multiplier,
          y: prevPosition.y,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }