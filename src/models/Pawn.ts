import { Color, PieceType } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {
  enPassant?: boolean;
  constructor(
    position: Position,
    color: Color,
    enPassant?: boolean,
    legalMoves: Position[] = []
  ) {
    super(position, PieceType.pawn, color, legalMoves);
    this.enPassant = enPassant;
  }

  clone(): Pawn {
    return new Pawn(
      this.position.clone(),
      this.color,
      this.enPassant,
      this.legalMoves?.map((m) => m.clone())
    );
  }
}
