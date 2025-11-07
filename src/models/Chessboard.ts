import {
  getCastlingMoves,
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
import { SimplifiedPiece } from "./SimplifiedPiece";

export class Chessboard {
  pieces: Piece[];
  totalTurns: number;
  stalemate: boolean;
  insufficientMaterial: boolean;
  repetition: boolean;
  boardHistory: { [key: string]: number };
  moveRule: number;
  winningColor?: Color;

  constructor(
    pieces: Piece[],
    totalTurns: number,
    stalemate: boolean,
    insufficientMaterial: boolean,
    repetition: boolean,
    boardHistory: { [key: string]: number },
    moveRule: number
  ) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
    this.stalemate = stalemate;
    this.insufficientMaterial = insufficientMaterial;
    this.repetition = repetition;
    this.boardHistory = boardHistory;
    this.moveRule = moveRule;
  }

  get currentColor(): Color {
    return this.totalTurns % 2 === 1 ? Color.white : Color.black;
  }

  calculateMoves() {
    for (const piece of this.pieces) {
      piece.legalMoves = this.getLegalMoves(piece, this.pieces);
    }
    // calculate castling
    for (const king of this.pieces.filter((p) => p.isKing)) {
      if (king.legalMoves === undefined) {
        continue;
      }
      king.legalMoves = [
        ...king.legalMoves,
        ...getCastlingMoves(king, this.pieces),
      ];
    }

    this.checkCurrentColorMoves();
    const opponentMoves = this.pieces
      .filter((p) => p.color !== this.currentColor)
      .map((p) => p.legalMoves)
      .flat();
    // remove legal moves for color when it is not their turn
    for (const piece of this.pieces.filter(
      (p) => p.color !== this.currentColor
    )) {
      piece.legalMoves = [];
    }
    this.checkMaterial();
    this.checkRepetition();
    // check if game has ended
    if (
      this.pieces
        .filter((p) => p.color === this.currentColor)
        .some((p) => p.legalMoves !== undefined && p.legalMoves.length > 0)
    ) {
      return;
    }
    this.checkStalemate(opponentMoves);
  }

  checkCurrentColorMoves() {
    // loop through current color's piece
    for (const piece of this.pieces.filter(
      (p) => p.color === this.currentColor
    )) {
      if (piece.legalMoves === undefined) {
        continue;
      }
      // simulate all moves
      for (const move of piece.legalMoves) {
        const simulatedBoard = this.clone();
        const oldSim = simulatedBoard.pieces.length;
        let isPieceAtDestination = false;
        // remove piece at destination
        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        );
        if (simulatedBoard.pieces.length !== oldSim) {
          isPieceAtDestination = true;
        }
        // get piece on cloned board
        const clonedPiece = simulatedBoard.pieces.find((p) =>
          p.samePiecePosition(piece)
        )!;
        // if en passant remove it as well
        const direction = clonedPiece.color === Color.white ? 1 : -1;
        if (clonedPiece.isPawn && !isPieceAtDestination) {
          simulatedBoard.pieces = simulatedBoard.pieces.filter(
            (p) => !p.samePosition(new Position(move.x, move.y - direction))
          );
        }

        clonedPiece.position = move.clone();
        // get king of cloned board
        const clonedKing = simulatedBoard.pieces.find(
          (p) => p.isKing && p.color === simulatedBoard.currentColor
        )!;

        // loop through opponent pieces, update their legal moves
        // and check if current color's king will be in danger
        for (const opponent of simulatedBoard.pieces.filter(
          (p) => p.color !== simulatedBoard.currentColor
        )) {
          opponent.legalMoves = simulatedBoard.getLegalMoves(
            opponent,
            simulatedBoard.pieces
          );
          if (opponent.isPawn) {
            if (
              opponent.legalMoves.some(
                (m) =>
                  m.x !== opponent.position.x &&
                  m.samePosition(clonedKing.position)
              )
            ) {
              piece.legalMoves = piece.legalMoves?.filter(
                (m) => !m.samePosition(move)
              );
            }
          } else {
            if (
              opponent.legalMoves.some((m) =>
                m.samePosition(clonedKing.position)
              )
            ) {
              piece.legalMoves = piece.legalMoves?.filter(
                (m) => !m.samePosition(move)
              );
            }
          }
        }
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
    const numPiecesBefore = this.pieces.length;
    // if move is castling move
    const distance = Math.abs(destination.x - playedPiece.position.x);
    if (playedPiece.isKing && distance === 2) {
      const direction = destination.x - playedPiece.position.x > 0 ? 1 : -1;
      this.pieces = this.pieces.map((p) => {
        if (p.samePiecePosition(playedPiece)) {
          p.position.x = destination.x;
        } else if (p.isRook && p.color === playedPiece.color && !p.hasMoved) {
          const rookDistance = Math.abs(p.position.x - destination.x);
          if (rookDistance <= 2) {
            p.position.x = destination.x - direction;
          }
        }
        return p;
      });
      this.calculateMoves();
      return true;
    }
    if (enPassant) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          piece.position.x = destination.x;
          piece.position.y = destination.y;
          piece.hasMoved = true;
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
          piece.hasMoved = true;

          results.push(piece);
        } else if (!piece.samePosition(destination)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
    } else {
      return false;
    }
    this.moveRule++;
    if (playedPiece.isPawn || this.pieces.length < numPiecesBefore) {
      this.moveRule = 0;
    }
    this.calculateMoves();
    return true;
  }

  checkMaterial(): void {
    // check white and black have king or king + bishop/knight
    const whiteEligibleForDraw =
      this.pieces.filter((p) => p.color === Color.white).length === 1 ||
      (this.pieces.filter((p) => p.color === Color.white).length === 2 &&
        this.pieces.filter(
          (p) => p.color === Color.white && (p.isKnight || p.isBishop)
        ).length === 1);
    const blackEligibleForDraw =
      this.pieces.filter((p) => p.color === Color.black).length === 1 ||
      (this.pieces.filter((p) => p.color === Color.black).length === 2 &&
        this.pieces.filter(
          (p) => p.color === Color.black && (p.isKnight || p.isBishop)
        ).length === 1);
    if (whiteEligibleForDraw && blackEligibleForDraw) {
      this.insufficientMaterial = true;
    }
    // check 2 knights and king vs king
    else if (
      this.pieces.filter((p) => p.color === Color.white).length === 3 &&
      this.pieces.filter((p) => p.color === Color.white && p.isKnight)
        .length === 2 &&
      this.pieces.filter((p) => p.color === Color.black).length === 1
    ) {
      this.insufficientMaterial = true;
    } else if (
      this.pieces.filter((p) => p.color === Color.black).length === 3 &&
      this.pieces.filter((p) => p.color === Color.black && p.isKnight)
        .length === 2 &&
      this.pieces.filter((p) => p.color === Color.white).length === 1
    ) {
      this.insufficientMaterial = true;
    }
  }

  checkRepetition(): void {
    const simplifiedPieces = this.pieces.map((p) => new SimplifiedPiece(p));
    const stringSimplifiedPieces = JSON.stringify(simplifiedPieces);
    if (this.boardHistory[stringSimplifiedPieces] === undefined) {
      this.boardHistory[stringSimplifiedPieces] = 1;
    } else {
      this.boardHistory[stringSimplifiedPieces]++;
    }
    if (this.boardHistory[stringSimplifiedPieces] === 3) {
      this.repetition = true;
    }
  }

  checkStalemate(opponentMoves: (Position | undefined)[]): void {
    const kingPos = this.pieces.find(
      (p) => p.isKing && p.color === this.currentColor
    )!.position;
    if (opponentMoves.some((m) => m?.samePosition(kingPos))) {
      this.winningColor =
        this.currentColor === Color.white ? Color.black : Color.white;
    } else {
      this.stalemate = true;
    }
  }

  clone(): Chessboard {
    return new Chessboard(
      this.pieces.map((p) => p.clone()),
      this.totalTurns,
      this.stalemate,
      this.insufficientMaterial,
      this.repetition,
      this.boardHistory,
      this.moveRule
    );
  }
}
