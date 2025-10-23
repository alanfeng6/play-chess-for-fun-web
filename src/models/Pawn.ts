import { Color, PieceType } from "../Types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Pawn extends Piece {
    enPassant?: boolean;
    constructor(position: Position, color: Color) {
        super(position, PieceType.pawn, color);
    }
}