import { Color, Piece, Position, samePosition } from "../../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./GeneralRules";

export const kingMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    let multiplierX = (position.x < prevPosition.x) ? -1 : (position.x > prevPosition.x) ? 1 : 0;
    let multiplierY = (position.y < prevPosition.y) ? -1 : (position.y > prevPosition.y) ? 1 : 0;
    let passedSquare: Position = {x: prevPosition.x + multiplierX, y: prevPosition.y + multiplierY};
    if (samePosition(passedSquare, position)) {
      if (isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)) {
        return true;
      }
    }
    else {
      if (isOccupied(passedSquare, boardState)) {
        return false;
      }
    }
    return false;
  }