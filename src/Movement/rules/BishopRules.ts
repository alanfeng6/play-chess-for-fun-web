import { Color, Piece, Position, samePosition } from "../../Constants";
import { isEmptyOrOccupiedByOpponent, isOccupied } from "./GeneralRules";

export const bishopMove = (
    prevPosition: Position,
    position: Position,
    color: Color,
    boardState: Piece[]
  ): boolean => {
    for (let i = 1; i < 8; i++) {
      // up right
      if (position.x > prevPosition.x && position.y > prevPosition.y) {
        let passedSquare: Position = {
          x: prevPosition.x + i,
          y: prevPosition.y + i,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
      // down right
      if (position.x > prevPosition.x && position.y < prevPosition.y) {
        let passedSquare: Position = {
          x: prevPosition.x + i,
          y: prevPosition.y - i,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
      // down left
      if (position.x < prevPosition.x && position.y < prevPosition.y) {
        let passedSquare: Position = {
          x: prevPosition.x - i,
          y: prevPosition.y - i,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
      // up left
      if (position.x < prevPosition.x && position.y > prevPosition.y) {
        let passedSquare: Position = {
          x: prevPosition.x - i,
          y: prevPosition.y + i,
        };
        if (samePosition(passedSquare, position)) {
          if (
            isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)
          ) {
            return true;
          }
        } else {
          if (isOccupied(passedSquare, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }