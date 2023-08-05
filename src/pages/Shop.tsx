import Product from "../components/cards/Product";
import { getBusinesses } from "../utils/api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function Shop() {
  const { shopId } = useParams<{ shopId: string }>();
  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });
  const business = data?.find((business) => business.id === shopId);
  if (!business) {
    return <div>Business not found</div>;
  }
  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        {business.shopName}&apos;s Products
      </h1>
      <div>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row">
          {business.Products.map((product) => (
            <Product showCart key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
