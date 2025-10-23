import { Piece, Position } from "../../models";
import { Color } from "../../Types";

export const isOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => p.samePosition(position));
  if (piece) {
    return true;
  }
  return false;
};

export const isOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  color: Color
): boolean => {
  const piece = boardState.find(
    (p) => p.samePosition(position) && p.color !== color
  );
  if (piece) {
    return true;
  }
  return false;
};

export const isEmptyOrOccupiedByOpponent = (
    position: Position,
    boardState: Piece[],
    color: Color
  ) => {
    return (
      !isOccupied(position, boardState) ||
      isOccupiedByOpponent(position, boardState, color)
    );
  }