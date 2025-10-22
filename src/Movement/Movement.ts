import { PieceType, Color, Piece, Position } from "../Constants";
import { pawnMove, knightMove, bishopMove, rookMove, queenMove, kingMove } from "./rules";

export default class Movement {
  isEnPassant(
    prevPosition: Position,
    position: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ): boolean {
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
  ): boolean {
    let legalMove = false;
    switch (type) {
      case PieceType.pawn:
        legalMove = pawnMove(prevPosition, position, color, boardState);
        break;
      case PieceType.knight:
        legalMove = knightMove(prevPosition, position, color, boardState);
        break;
      case PieceType.bishop:
        legalMove = bishopMove(prevPosition, position, color, boardState);
        break;
      case PieceType.rook:
        legalMove = rookMove(prevPosition, position, color, boardState);
        break;
      case PieceType.queen:
        legalMove = queenMove(prevPosition, position, color, boardState);
        break;
      case PieceType.king:
        legalMove = kingMove(prevPosition, position, color, boardState);
    }
    return legalMove;
  }
}
