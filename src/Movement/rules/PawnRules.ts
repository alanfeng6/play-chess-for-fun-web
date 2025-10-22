import { Color, Piece, Position } from "../../Constants";
import { isOccupied, isOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    const startingRow = color === Color.white ? 1 : 6;
    const pawnDirection = color === Color.white ? 1 : -1;

    // regular moves
    if (
      prevPosition.x === position.x &&
      prevPosition.y === startingRow &&
      position.y - prevPosition.y === 2 * pawnDirection
    ) {
      if (
        !isOccupied(position, boardState) &&
        !isOccupied(
          { x: position.x, y: position.y - pawnDirection },
          boardState
        )
      ) {
        return true;
      }
    } else if (
      prevPosition.x === position.x &&
      position.y - prevPosition.y === pawnDirection
    ) {
      if (!isOccupied(position, boardState)) {
        return true;
      }
    }
    // captures
    else if (
      prevPosition.x - position.x === 1 &&
      position.y - prevPosition.y === pawnDirection
    ) {
      // upper or bottom left
      if (isOccupiedByOpponent(position, boardState, color)) {
        return true;
      }
    } else if (
      position.x - prevPosition.x === 1 &&
      position.y - prevPosition.y === pawnDirection
    ) {
      // upper or bottom right
      if (isOccupiedByOpponent(position, boardState, color)) {
        return true;
      }
    }
    return false;
  }