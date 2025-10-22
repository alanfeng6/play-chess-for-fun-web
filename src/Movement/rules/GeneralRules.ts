import { Color, Piece, Position, samePosition } from "../../Constants";

export const isOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position));
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
    (p) => samePosition(p.position, position) && p.color !== color
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