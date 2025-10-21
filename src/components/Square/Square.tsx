import "./Square.css";

interface Props {
  num: number;
  image?: string;
}

const Square = ({ num, image }: Props) => {
  if (num % 2 === 0) {
    return (
      <div className="square black-square">
        {image && <div style={{backgroundImage: `url(${image})`}} className="piece"></div>}
      </div>
    );
  } else {
    return (
      <div className="square white-square">
        {image && <div style={{backgroundImage: `url(${image})`}} className="piece"></div>}
      </div>
    );
  }
  return <div className="square">Square</div>;
};

export default Square;
