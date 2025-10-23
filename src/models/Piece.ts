import { Color, PieceType } from "../Types";
import { Position } from "./Position";

export class Piece {
  image: string;
  position: Position;
  type: PieceType;
  color: Color;
  legalMoves?: Position[];
  constructor(
    position: Position,
    type: PieceType,
    color: Color,
    legalMoves?: Position[]
  ) {
    this.image = `./${color}_${type}.png`;
    this.position = position;
    this.type = type;
    this.color = color;
  }

  get isPawn() : boolean {
    return this.type === PieceType.pawn;
  }

  get isKnight() : boolean {
    return this.type === PieceType.knight;
  }

  get isBishop() : boolean {
    return this.type === PieceType.bishop;
  }

  get isRook() : boolean {
    return this.type === PieceType.rook;
  }

  get isQueen() : boolean {
    return this.type === PieceType.queen;
  }

  get isKing() : boolean {
    return this.type === PieceType.king;
  }

  samePiecePosition(otherPiece: Piece) : boolean {
    return this.position.samePosition(otherPiece.position);
  }

  samePosition(otherPosition: Position) : boolean {
    return this.position.samePosition(otherPosition);
  }
}
