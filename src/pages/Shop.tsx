import { useNavigate, useParams } from "react-router-dom";
import Product from "../components/cards/Product";
import { getBusinesses } from "../utils/api";
import { useQuery } from "react-query";

export default function Shop() {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });
  const business = data?.find((business) => business.id === shopId);
  const handleBack = () => {
    navigate(-1);
  };
  if (!business) {
    return <div>Business not found</div>;
  }
  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="flex items-center justify-center border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        {business.shopName}&apos;s Products
        <button onClick={handleBack} className="text-base font-normal">
          back
        </button>
      </h1>
      <div>
        <div className="mt-5 flex flex-col flex-wrap gap-5 sm:flex-row">
          {business.Products.map((product) => (
            <Product showCart key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
