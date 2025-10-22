import { PieceType, Color, type Piece } from "../components/Board/Board";

export default class Rules {
  isOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    }
    return false;
  }

  isOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.color !== color
    );
    if (piece) {
      return true;
    }
    return false;
  }

  isLegalMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    if (type === PieceType.pawn) {
      const startingRow = color === Color.white ? 1 : 6;
      const pawnDirection = color === Color.white ? 1 : -1;

      // regular moves
      if (
        prevX === x &&
        prevY === startingRow &&
        y - prevY === 2 * pawnDirection
      ) {
        if (
          !this.isOccupied(x, y, boardState) &&
          !this.isOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (prevX === x && y - prevY === pawnDirection) {
        if (!this.isOccupied(x, y, boardState)) {
          return true;
        }
      }
      // captures
      else if (prevX - x === 1 && y - prevY === pawnDirection) {
        // upper or bottom left
        if (this.isOccupiedByOpponent(x, y, boardState, color)) {
          return true;
        }
      } else if (x - prevX === 1 && y - prevY === pawnDirection) {
        // upper or bottom right
        if (this.isOccupiedByOpponent(x, y, boardState, color)) {
          return true;
        }
      }
    }

    return false;
  }
}
