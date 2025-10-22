import { PieceType, Color, Piece, Position, samePosition } from "../Constants";

export default class Rules {
  isEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    color: Color
  ) {
    return (
      !this.isOccupied(position, boardState) ||
      this.isOccupiedByOpponent(position, boardState, color)
    );
  }

  isOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));
    if (piece) {
      return true;
    }
    return false;
  }

  isOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.color !== color
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
      if (
        (prevPosition.x - position.x === 1 ||
          position.x - prevPosition.x === 1) &&
        position.y - prevPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === position.x &&
            p.position.y === position.y - pawnDirection &&
            p.enPassant
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
          !this.isOccupied(position, boardState) &&
          !this.isOccupied(
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
        if (!this.isOccupied(position, boardState)) {
          return true;
        }
      }
      // captures
      else if (
        prevPosition.x - position.x === 1 &&
        position.y - prevPosition.y === pawnDirection
      ) {
        // upper or bottom left
        if (this.isOccupiedByOpponent(position, boardState, color)) {
          return true;
        }
      } else if (
        position.x - prevPosition.x === 1 &&
        position.y - prevPosition.y === pawnDirection
      ) {
        // upper or bottom right
        if (this.isOccupiedByOpponent(position, boardState, color)) {
          return true;
        }
      }
    } else if (type === PieceType.knight) {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // top and bottom
          if (position.y - prevPosition.y === 2 * i) {
            if (prevPosition.x - position.x === j) {
              if (
                this.isEmptyOrOccupiedByOpponent(position, boardState, color)
              ) {
                return true;
              }
            }
          }
          // left and right
          else if (position.x - prevPosition.x === 2 * i) {
            if (prevPosition.y - position.y === j) {
              if (
                this.isEmptyOrOccupiedByOpponent(position, boardState, color)
              ) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }
}
