import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { product } from "../../../../types/products";

const SaleProducts = ({
  id,
  col,
  title,
  description,
  sale,
  discount,
  price,
  rating,
  images,
}: product) => {
  const roundStars = Math.round(rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  return (
    <NavLink to={`/product/${id}`} className={`h-full`}>
      <div className="m-1 border rounded p-3 h-full flex flex-col justify-between relative">
        <div>
          <p className="truncate lg:text-2xl mb-2">{title}</p>
          <p className="truncate text-gray-500">{description}</p>
        </div>
        <div className="px-5 py-5 position-relative">
          {sale && (
            <p
              className="m-0 absolute top-0 right-0 bg-blue-600 rounded-circle  text-white uppercase inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px" }}
            >
              Sale
            </p>
          )}
          <div
            className="w-full h-[170px] bg-cover bg-center"
            style={{
              backgroundImage: `url('${images?.[0]?.image}')`,
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between pt-4 border-top">
          <div>
            {showGoldStars}
            {showEmptyStars}

            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{discount}$</h5>
              <h6 className="m-0 text-gray-400 line-through">{price}$</h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img src={"/icons/cart.png"} alt="cart" width="20px" />
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SaleProducts;
