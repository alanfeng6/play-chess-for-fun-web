import {
  getLegalBishopMoves,
  getLegalKingMoves,
  getLegalKnightMoves,
  getLegalPawnMoves,
  getLegalQueenMoves,
  getLegalRookMoves,
} from "../Movement/rules";
import { Color, PieceType } from "../Types";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Chessboard {
  pieces: Piece[];
  totalTurns: number;

  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
  }

  get currentColor(): Color {
    return this.totalTurns % 2 === 1 ? Color.white : Color.black;
  }

  calculateMoves() {
    for (const piece of this.pieces) {
      piece.legalMoves = this.getLegalMoves(piece, this.pieces);
    }
    this.getKingMoves();
    // remove legal moves for color when it is not their turn
    for (const piece of this.pieces.filter(p => p.color !== this.currentColor)) {
        piece.legalMoves = [];
    }
  }

  getKingMoves() {
    const king = this.pieces.find((p) => p.isKing && p.color === this.currentColor);
    if (king?.legalMoves === undefined) {
      return;
    }
    // simulate king moves
    for (const move of king.legalMoves) {
      const simulatedBoard = this.clone();
      const pieceAtDestination = simulatedBoard.pieces.find((p) =>
        p.samePosition(move)
      );
      // if there is a piece at destination remove it
      if (pieceAtDestination) {
        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        );
      }
      const simulatedKing = simulatedBoard.pieces.find(
        (p) => p.isKing && p.color === simulatedBoard.currentColor
      );
      simulatedKing!.position = move;
      for (const opponent of simulatedBoard.pieces.filter(
        (p) => p.color !== simulatedBoard.currentColor
      )) {
        opponent.legalMoves = simulatedBoard.getLegalMoves(
          opponent,
          simulatedBoard.pieces
        );
      }
      let safe = true;
      // determine if move is safe
      for (const piece of simulatedBoard.pieces) {
        if (piece.color === simulatedBoard.currentColor) continue;
        if (piece.isPawn) {
          const legalPawnMoves = simulatedBoard.getLegalMoves(
            piece,
            simulatedBoard.pieces
          );
          if (
            legalPawnMoves?.some(
              (p) => p.x !== piece.position.x && p.samePosition(move)
            )
          ) {
            safe = false;
            break;
          }
        } else if (piece.legalMoves?.some((p) => p.samePosition(move))) {
          safe = false;
          break;
        }
      }
      // remove move from legal moves
      if (!safe) {
        king.legalMoves = king.legalMoves?.filter((m) => !m.samePosition(move));
      }
    }
  }

  getLegalMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.pawn:
        return getLegalPawnMoves(piece, boardState);
      case PieceType.knight:
        return getLegalKnightMoves(piece, boardState);
      case PieceType.bishop:
        return getLegalBishopMoves(piece, boardState);
      case PieceType.rook:
        return getLegalRookMoves(piece, boardState);
      case PieceType.queen:
        return getLegalQueenMoves(piece, boardState);
      case PieceType.king:
        return getLegalKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  playMove(
    enPassant: boolean,
    legalMove: boolean,
    playedPiece: Piece,
    destination: Position
  ): boolean {
    const pawnDirection = playedPiece.color === Color.white ? 1 : -1;
    if (enPassant) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }

          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      this.calculateMoves();
    } else if (legalMove) {
      // set piece position
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          // check if piece is en passantable
          if (piece.isPawn) {
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2;
          }

          piece.position.x = destination.x;
          piece.position.y = destination.y;

          results.push(piece);
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      this.calculateMoves();
    } else {
      return false;
    }
    return true;
  }

  clone(): Chessboard {
    return new Chessboard(this.pieces.map((p) => p.clone()), this.totalTurns);
  }
}
