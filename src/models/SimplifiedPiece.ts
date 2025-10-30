import { PieceType, Color } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class SimplifiedPiece {
      position: Position;
      type: PieceType;
      color: Color;
      legalMoves?: Position[];
    constructor(piece: Piece) {
        this.position = piece.position.clone();
        this.type = piece.type;
        this.color = piece.color;
        this.legalMoves = piece.legalMoves?.map(m => m.clone());
    }
}