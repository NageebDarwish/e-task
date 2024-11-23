import Landing from "../../../Components/Website/Landing/Landing";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import { ShowLatestProducts } from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestSaleProducts />

      <ShowTopRated />
      <ShowLatestProducts />
    </div>
  );
}
