import "./Square.css";

interface Props {
  num: number;
  image?: string;
}

const Square = ({ num, image }: Props) => {
  if (num % 2 === 0) {
    return (
      <div className="square black-square">
        <img src={image} className="img"></img>
      </div>
    );
  } else {
    return (
      <div className="square white-square">
        <img src={image} className="img"></img>
      </div>
    );
  }
  return <div className="square">Square</div>;
};

export default Square;
