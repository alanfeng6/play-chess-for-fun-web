import { Piece, Position } from "../../models";
import { Color } from "../../Types";
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
};

export const getLegalKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = new Position(
        knight.position.x + j,
        knight.position.y + i * 2
      );
      const horizontalMove = new Position(
        knight.position.x + i * 2,
        knight.position.y + j,
      );
      if (isEmptyOrOccupiedByOpponent(verticalMove, boardState, knight.color)) {
        legalMoves.push(verticalMove);
      }
      if (
        isEmptyOrOccupiedByOpponent(horizontalMove, boardState, knight.color)
      ) {
        legalMoves.push(horizontalMove);
      }
    }
  }
  return legalMoves;
};
