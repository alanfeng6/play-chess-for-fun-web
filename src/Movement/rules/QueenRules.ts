import { Color, Piece, Position } from "../../Constants";
import { bishopMove } from "./BishopRules";
import { rookMove } from "./RookRules";

export const queenMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    if (
      rookMove(prevPosition, position, color, boardState) ||
      bishopMove(prevPosition, position, color, boardState)
    ) {
      return true;
    }
    return false;
  }