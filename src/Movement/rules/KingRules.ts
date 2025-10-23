import { Piece, Position } from "../../models";
import { Color } from "../../Types";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./GeneralRules";

export const kingMove = (
  prevPosition: Position,
  position: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  let multiplierX =
    position.x < prevPosition.x ? -1 : position.x > prevPosition.x ? 1 : 0;
  let multiplierY =
    position.y < prevPosition.y ? -1 : position.y > prevPosition.y ? 1 : 0;
  let passedSquare = new Position(
    prevPosition.x + multiplierX,
    prevPosition.y + multiplierY
  );
  if (passedSquare.samePosition(position)) {
    if (isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)) {
      return true;
    }
  } else {
    if (isOccupied(passedSquare, boardState)) {
      return false;
    }
  }
  return false;
};

export const getLegalKingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  // up
  let destination = new Position(
    king.position.x,
    king.position.y + 1
  );
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // right
  destination = new Position(king.position.x + 1, king.position.y);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // down
  destination = new Position(king.position.x, king.position.y - 1);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // left
  destination = new Position(king.position.x - 1, king.position.y);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // up right
  destination = new Position(king.position.x + 1, king.position.y + 1);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // down right
  destination = new Position(king.position.x + 1, king.position.y - 1);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // down left
  destination = new Position(king.position.x - 1, king.position.y - 1);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  // up left
  destination = new Position(king.position.x - 1, king.position.y + 1);
  if (!isOccupied(destination, boardState)) {
    legalMoves.push(destination);
  } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
    legalMoves.push(destination);
  }

  return legalMoves;
};
