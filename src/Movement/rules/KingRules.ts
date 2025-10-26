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
  let destination = new Position(king.position.x, king.position.y + 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // right
  destination = new Position(king.position.x + 1, king.position.y);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // down
  destination = new Position(king.position.x, king.position.y - 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // left
  destination = new Position(king.position.x - 1, king.position.y);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // up right
  destination = new Position(king.position.x + 1, king.position.y + 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // down right
  destination = new Position(king.position.x + 1, king.position.y - 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // down left
  destination = new Position(king.position.x - 1, king.position.y - 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  // up left
  destination = new Position(king.position.x - 1, king.position.y + 1);
  if (
    !(
      destination.x < 0 ||
      destination.x > 7 ||
      destination.y < 0 ||
      destination.y > 7
    )
  ) {
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, king.color)) {
      legalMoves.push(destination);
    }
  }

  return legalMoves;
};

// in this function the opponent moves have been calculated
export const getCastlingMoves = (
  king: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  if (king.hasMoved) {
    return legalMoves;
  }
  // get rooks from king's color that haven't moved
  const rooks = boardState.filter(
    (p) => p.isRook && p.color === king.color && !p.hasMoved
  );
  // loop through rooks
  for (const rook of rooks) {
    // determine if we need to go to right or left side
    const direction = king.position.x - rook.position.x > 0 ? 1 : -1;
    const adjacent = king.position.clone();
    adjacent.x -= direction;
    if (!rook.legalMoves?.some((m) => m.samePosition(adjacent))) {
      continue;
    }
    const concerningSquares = rook.legalMoves.filter(
      (m) => m.y === king.position.y
    );
    // check if any of opponent pieces can capture
    // squares in between king and rook
    const opponentPieces = boardState.filter((p) => p.color !== king.color);
    let legal = true;
    for (const opponent of opponentPieces) {
      if (opponent.legalMoves === undefined) {
        continue;
      }
      for (const move of opponent.legalMoves) {
        if (concerningSquares.some((s) => s.samePosition(move))) {
          legal = false;
        }
        if (!legal) {
          break;
        }
      }
      if (!legal) {
        break;
      }
    }
    if (!legal) {
      continue;
    }
    // we now want to add it as legal move
    legalMoves.push(
      new Position(king.position.x - 2 * direction, king.position.y)
    );
  }

  return legalMoves;
};
