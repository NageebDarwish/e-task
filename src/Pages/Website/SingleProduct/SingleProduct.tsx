import { useContext, useEffect, useState } from "react";

import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { CART, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";
import Loader from "../../../Components/Dashboard/Loader";
import { toast } from "react-toastify";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [productImages, setProductImages] = useState([]);

  const [loadingCart, setLoadingCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setIsChange } = useContext(Cart);
  const { id } = useParams();

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${Pro}/${id}`)
      .then((res) => {
        setProductImages(
          res.data?.[0]?.images.map((img) => {
            return { original: img?.image, thumbnail: img?.image };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems =
        JSON.parse(localStorage.getItem("product") as string) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;

      console.log(productCount);
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      toast.success("Item Added To Cart Successfully");
      return true;
    } catch (err) {
      toast.error("Requested quantity exceeds available stock");

      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSave = async () => {
    const check = await checkStock();
    if (check) {
      const getItems =
        JSON.parse(localStorage?.getItem("product") as string) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);

      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <div className="container">
      <div className="grid lg:grid-cols-3">
        {loading ? (
          <>
            {/* <div className="col-lg-4 col-md-6 col-12">
              <SkeletonShow height="250px" length="1" classess="col-12" />
              <div className="col-12 d-flex mt-1">
                <SkeletonShow height="100px" length="1" classess="col-4" />
                <SkeletonShow height="100px" length="1" classess="col-4" />
                <SkeletonShow height="100px" length="1" classess="col-4" />
              </div>
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-lg-5">
                <SkeletonShow
                  height="20px"
                  length="1"
                  classess="col-lg-8 col-12"
                />{" "}
                <SkeletonShow
                  height="210px"
                  length="1"
                  classess="col-lg-8 col-12 mt-2"
                />{" "}
                <hr className="col-lg-8 col-12" />
                <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                  <SkeletonShow
                    height="20px"
                    length="1"
                    classess="col-4 mt-2"
                  />{" "}
                  <SkeletonShow
                    height="20px"
                    length="1"
                    classess="col-4 mt-2"
                  />{" "}
                </div>
              </div>
            </div> */}
          </>
        ) : (
          <>
            <div className="">
              <ImageGallery items={productImages} />
            </div>
            <div className="col-span-2">
              <div className="ms-5">
                <h1 className="text-4xl mb-6">{product.title}</h1>
                <p className="text-gray-500 mb-2">{product.About}</p>
                <h3 className="">{product.description}</h3>

                <div className="flex items-center justify-between pt-4 border-t flex-wrap">
                  <div>
                    {product.stock === 1 && (
                      <p className="text-danger">There is only 1 left</p>
                    )}
                    {showGoldStars}
                    {showEmptyStars}

                    <div className="flex items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}$</h5>
                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.price}$
                      </h6>
                    </div>
                  </div>

                  {product.stock === 0 ? (
                    <p>This Prouduct is unavilable</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                      <div
                        onClick={handleSave}
                        style={{ cursor: "pointer" }}
                        className="border p-2 rounded"
                      >
                        {loadingCart ? (
                          <Loader />
                        ) : (
                          <img
                            src={"/icons/cart.png"}
                            alt="cart"
                            width="20px"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
