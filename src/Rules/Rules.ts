import { PieceType, Color, Piece, Position } from "../Constants";

export default class Rules {
  isOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.position.x === x && p.position.y === y);
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
      (p) => p.position.x === x && p.position.y === y && p.color !== color
    );
    if (piece) {
      return true;
    }
    return false;
  }

  isEnPassant(
    prevPosition: Position,
    position: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    const pawnDirection = color === Color.white ? 1 : -1;
    if (type === PieceType.pawn) {
      if ((prevPosition.x - position.x === 1 || position.x - prevPosition.x === 1) && position.y - prevPosition.y === pawnDirection) {
        const piece = boardState.find(
          (p) => p.position.x === position.x && p.position.y === position.y - pawnDirection && p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  isLegalMove(
    prevPosition: Position,
    position: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    if (type === PieceType.pawn) {
      const startingRow = color === Color.white ? 1 : 6;
      const pawnDirection = color === Color.white ? 1 : -1;

      // regular moves
      if (
        prevPosition.x === position.x &&
        prevPosition.y === startingRow &&
        position.y - prevPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.isOccupied(position.x, position.y, boardState) &&
          !this.isOccupied(position.x, position.y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (prevPosition.x === position.x && position.y - prevPosition.y === pawnDirection) {
        if (!this.isOccupied(position.x, position.y, boardState)) {
          return true;
        }
      }
      // captures
      else if (prevPosition.x - position.x === 1 && position.y - prevPosition.y === pawnDirection) {
        // upper or bottom left
        if (this.isOccupiedByOpponent(position.x, position.y, boardState, color)) {
          return true;
        }
      } else if (position.x - prevPosition.x === 1 && position.y - prevPosition.y === pawnDirection) {
        // upper or bottom right
        if (this.isOccupiedByOpponent(position.x, position.y, boardState, color)) {
          return true;
        }
      }
    }

    return false;
  }
}
