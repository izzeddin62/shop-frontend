import { Link, Navigate, useOutletContext } from "react-router-dom";
import Product from "../components/cards/Product";
import { User } from "../utils/interfaces";
import { getBusinesses } from "../utils/api";
import { useQuery } from "react-query";

export default function Business() {
  const user = useOutletContext<User>();
  if (user.type !== "businessOwner") {
    return <Navigate to="/" />;
  }

  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });
  const business = data?.find((business) => business.id === user.id);
  if (!business) {
    return <div>Business not found</div>;
  }
  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        {business.shopName}&apos;s Products
      </h1>
      <div>
        <div className="mt-5 flex flex-col flex-wrap gap-5 sm:flex-row">
          {business.Products.map((product) => (
            <Product showCart={false} key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Link
        to="add-product"
        className={
          "fixed inset-x-0 bottom-10 mx-auto block w-full max-w-[600px] rounded-md bg-emerald-600 px-4 py-2 text-center text-white"
        }
      >
        Add new product
      </Link>
    </div>
  );
}
