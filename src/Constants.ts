import { Chessboard } from "./models/Chessboard";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";
import { Position } from "./models/Position";
import { Color, PieceType } from "./Types";

export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export const initialBoard: Chessboard = new Chessboard([
  new Piece(new Position(0, 7), PieceType.rook, Color.black, false),
  new Piece(new Position(1, 7), PieceType.knight, Color.black, false),
  new Piece(new Position(2, 7), PieceType.bishop, Color.black, false),
  new Piece(new Position(3, 7), PieceType.queen, Color.black, false),
  new Piece(new Position(4, 7), PieceType.king, Color.black, false),
  new Piece(new Position(5, 7), PieceType.bishop, Color.black, false),
  new Piece(new Position(6, 7), PieceType.knight, Color.black, false),
  new Piece(new Position(7, 7), PieceType.rook, Color.black, false),
  new Pawn(new Position(0, 6), Color.black, false),
  new Pawn(new Position(1, 6), Color.black, false),
  new Pawn(new Position(2, 6), Color.black, false),
  new Pawn(new Position(3, 6), Color.black, false),
  new Pawn(new Position(4, 6), Color.black, false),
  new Pawn(new Position(5, 6), Color.black, false),
  new Pawn(new Position(6, 6), Color.black, false),
  new Pawn(new Position(7, 6), Color.black, false),
  new Pawn(new Position(0, 1), Color.white, false),
  new Pawn(new Position(1, 1), Color.white, false),
  new Pawn(new Position(2, 1), Color.white, false),
  new Pawn(new Position(3, 1), Color.white, false),
  new Pawn(new Position(4, 1), Color.white, false),
  new Pawn(new Position(5, 1), Color.white, false),
  new Pawn(new Position(6, 1), Color.white, false),
  new Pawn(new Position(7, 1), Color.white, false),
  new Piece(new Position(0, 0), PieceType.rook, Color.white, false),
  new Piece(new Position(1, 0), PieceType.knight, Color.white, false),
  new Piece(new Position(2, 0), PieceType.bishop, Color.white, false),
  new Piece(new Position(3, 0), PieceType.queen, Color.white, false),
  new Piece(new Position(4, 0), PieceType.king, Color.white, false),
  new Piece(new Position(5, 0), PieceType.bishop, Color.white, false),
  new Piece(new Position(6, 0), PieceType.knight, Color.white, false),
  new Piece(new Position(7, 0), PieceType.rook, Color.white, false),
], 1, false, false, false, {}, 0);

initialBoard.calculateMoves();