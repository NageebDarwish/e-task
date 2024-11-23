import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { product } from "../../../types/products";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import Loader from "../../../Components/Dashboard/Loader";
import { toast } from "react-toastify";
import NavBar from "../../../Components/Website/NavBar/NavBar";

export const Cart = () => {
  const [products, setProducts] = useState<[]>([]);
  const [count, setCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getProducts =
      JSON.parse(localStorage.getItem("product") as string) || [];
    setProducts(getProducts);
  }, [count]);

  const originalPrice = products?.reduce(
    (sum, product) => sum + (Number(product.price) || 0) * (product.count || 1),
    0
  );

  const savings = products?.reduce(
    (sum, product) =>
      sum +
      (Number(product.price) - Number(product.discount) || 0) *
        (product.count || 1),
    0
  );

  const total = originalPrice - savings;

  const handleDelete = (id: string) => {
    const filterProduct = products?.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };

  const changeCount = (id: string, btnCount: number) => {
    const getProducts =
      JSON.parse(localStorage.getItem("product") as string) || [];
    const findProduct = getProducts.find(
      (product: product) => product.id === id
    );
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };

  const productsShow = products?.map((product: product, key: number) => (
    <div className="mb-4 relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="absolute top-0 end-0 cursor-pointer rounded-full flex items-center justify-center bg-red-500 text-white"
        style={{ width: "20px", height: "20px" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 border p-12">
        <img
          src={product?.images?.[0]?.image}
          className="rounded object-cover"
          alt="img"
        />
        <div className="col-span-2">
          <h1 className="text-3xl mb-4">{product.title}</h1>
          <p className="mb-2 text-gray-500 truncate">{product.description}</p>
          <div className="flex items-center gap-3">
            <h5 className="m-0 text-primary">{product?.discount}$</h5>
            <h6 className="m-0 line-through text-gray-500">
              {product?.price}$
            </h6>
          </div>
        </div>

        <PlusMinusBtn
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < products.length; i++) {
        formData.append(`products[${i}][name]`, products[i].title);
        formData.append(`products[${i}][price]`, products[i].discount);
        formData.append(`products[${i}][quantity]`, products[i].count);
      }
      const res = await Axios.post(`/create-checkout-session`, formData);
      window.location.replace(res.data.url);
    } catch (err) {
      toast.error(
        "Stripe Not Allowed In Your Region, Use Vpn Or Try Again Later"
      );
    } finally {
      setLoading(false);
    }
  };

  const OrderSummary = (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-gray-900 ">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 ">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900 ">
              ${Number(originalPrice)?.toFixed(2)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 ">Savings</dt>
            <dd className="text-base font-medium text-green-600">
              -${Number(savings)?.toFixed(2)}
            </dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base font-bold text-gray-900 ">Total</dt>
          <dd className="text-base font-bold text-gray-900 ">
            ${Number(total)?.toFixed(2)}
          </dd>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className={`flex w-full gap-4 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ${
          loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        Proceed to Checkout {loading && <Loader />}
      </button>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500"> or </span>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
        >
          Continue Shopping
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="container mt-16">
        <h1 className="my-12 text-4xl">Cart</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 items-start gap-10">
          <div>{productsShow}</div>
          {OrderSummary}
        </div>
      </div>
    </>
  );
};
