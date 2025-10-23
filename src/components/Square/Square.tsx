import "./Square.css";

interface Props {
  num: number;
  image?: string;
  highlight: boolean;
}

const Square = ({ num, image, highlight }: Props) => {
  const className: string = [
    "square",
    num % 2 === 0 && "black-square",
    num % 2 !== 0 && "white-square",
    highlight && "highlighted-square",
    image && "piece-square"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="piece"
        ></div>
      )}
    </div>
  );
};

export default Square;
