import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-aria-components";
import Product from "../components/cards/Product";
import { getBusinesses } from "../utils/api";
import { useCartContext } from "../contexts/CartWrapper";
import { useQuery } from "react-query";

export default function Cart() {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });
  const business = data?.find((business) => business.id === shopId);
  const [cartItems] = useCartContext();
  if (!shopId) return <div>Cart is empty</div>;
  const cartItemsForShop = cartItems[shopId];
  if (!cartItemsForShop) return <div>Cart is empty</div>;
  if (!business) {
    return <div>Business not found</div>;
  }
  const chartItemsMap = new Map<string, number>();
  cartItemsForShop.forEach((item) => {
    if (chartItemsMap.has(item.id)) {
      chartItemsMap.set(item.id, (chartItemsMap.get(item.id) ?? 0) + 1);
    } else {
      chartItemsMap.set(item.id, 1);
    }
  });
  const chartItems: [string, number][] = [];
  for (const i of chartItemsMap) {
    chartItems.push(i);
  }
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="flex items-center justify-between border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        {business.shopName}&apos; shop cart
        <button onClick={handleBack} className="text-base font-normal">
          back
        </button>
      </h1>
      <div>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row">
          {chartItems.map(([id, quantity]) => (
            <Product
              key={id}
              showCart={false}
              {...cartItemsForShop.find((el) => el.id === id)!}
              quantity={quantity}
            />
          ))}
        </div>
        <Button
          className={
            "fixed inset-x-0 bottom-10 mx-auto block w-full max-w-[600px] rounded-md bg-emerald-600 px-4 py-2 text-center text-white"
          }
        >
          Order products
        </Button>
      </div>
    </div>
  );
}
