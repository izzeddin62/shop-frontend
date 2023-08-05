import { Link } from "react-router-dom";
import Shop from "../components/cards/Shop";
import { getBusinesses } from "../utils/api";
import { useQuery } from "react-query";

export default function Home() {
  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });

  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        Shops
      </h1>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row">
        {data?.map((business) => (
          <Link to={`/shop/${business.id}`} key={business.id}>
            <Shop image={2} name={business.shopName} />
          </Link>
        ))}
      </div>
    </div>
  );
}
