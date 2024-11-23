import { Axios } from "../../../../Api/axios";
import { TopRatedApi } from "../../../../Api/Api";
import { SkeletonCard } from "../../Skeleton/SkeletonCard";
import SaleProducts from "../SaleProducts/SaleProducts";
import { product } from "../../../../types/products";
import { useQuery } from "@tanstack/react-query";

export default function ShowTopRated() {
  const { data: products, isLoading: loading } = useQuery({
    queryFn: () => Axios.get(`${TopRatedApi}`),
    queryKey: ["latest"],
  });
  const productsShow = products?.data?.map((product: product) => (
    <SaleProducts
      title={product?.title}
      description={product?.description}
      images={product?.images}
      price={product?.price}
      discount={product?.discount}
      rating={product?.rating}
      id={product?.id}
      col="3"
    />
  ));
  return (
    <div className="mt-16 container">
      <h1 className="lg:text-4xl mb-12 text-center">Top Products</h1>
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
