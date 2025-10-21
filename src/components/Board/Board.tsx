import Square from "../Square/Square";
import "./Board.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "./black_pawn.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "./white_pawn.png", x: i, y: 1 });
}
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "black" : "white";
  const y = p === 0 ? 7 : 0;

  pieces.push({ image: `./${type}_rook.png`, x: 0, y });
  pieces.push({ image: `./${type}_rook.png`, x: 7, y });
  pieces.push({ image: `./${type}_knight.png`, x: 1, y });
  pieces.push({ image: `./${type}_knight.png`, x: 6, y });
  pieces.push({ image: `./${type}_bishop.png`, x: 2, y });
  pieces.push({ image: `./${type}_bishop.png`, x: 5, y });
  pieces.push({ image: `./${type}_queen.png`, x: 3, y });
  pieces.push({ image: `./${type}_king.png`, x: 4, y });
}

const Board = () => {
  let board = [];
  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      const num = i + j;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === j && p.y === i) {
          image = p.image;
        }
      });
      board.push(<Square num={num} image={image} />);
    }
  }
  return <div id="board">{board}</div>;
};

export default Board;
