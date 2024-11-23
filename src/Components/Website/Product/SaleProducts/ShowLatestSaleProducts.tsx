import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import Product from "./SaleProducts";

import { useQuery } from "@tanstack/react-query";
import { product } from "../../../../types/products";
import { SkeletonCard } from "../../Skeleton/SkeletonCard";

export default function ShowLatestSaleProducts() {
  const { data: products, isLoading: loading } = useQuery({
    queryFn: () => Axios.get(`${LatestSale}`),
    queryKey: ["latest-sale"],
  });

  const productsShow = products?.data?.map((product: product) => (
    <Product
      title={product?.title}
      description={product?.description}
      images={product?.images}
      sale
      price={product?.price}
      discount={product?.discount}
      rating={product?.rating}
      id={product?.id}
      col="3"
    />
  ));
  return (
    <div className="mt-16 container">
      <h1 className="lg:text-4xl mb-12 text-center">Sale Products</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-stretch mt-5 gap-2 mb-5">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
