import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CuisineCard({ monster }) {
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={monster.imgUrl} alt={monster.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{monster.name}</h5>
        <p className="card-text fs-5">Rp {monster.price.toLocaleString()}</p>
        <Link to={`/detail/${monster.id}`} className="btn btn-primary">
          Detail
        </Link>
      </div>
    </div>
  );
}

CuisineCard.propTypes = {
  cuisine: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
  }),
  handleOnDetailCuisine: PropTypes.func,
  handleOnEditCuisine: PropTypes.func,
  handleOnDeleteCuisine: PropTypes.func,
};
