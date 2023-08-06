/* eslint-disable max-lines-per-function */
import { Business, User } from "../utils/interfaces";
import { getBusinesses, orderProducts } from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Product from "../components/cards/Product";
import { useCartContext } from "../contexts/CartWrapper";

export default function Cart() {
  const user = useOutletContext<User>();
  const { shopId } = useParams<{ shopId: string }>();
  const token = JSON.parse(localStorage.getItem("token")!);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery(["businesses"], getBusinesses, {
    useErrorBoundary: true,
  });
  const business = data?.find((business) => business.id === shopId);
  const [cartItems, setCartItems] = useCartContext();

  const cartItemsForShop = cartItems[shopId!];
  const chartItemsMap = new Map<string, number>();
  cartItemsForShop?.forEach((item) => {
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
  const { mutate } = useMutation({
    mutationFn: () => orderProducts(token, chartItems),
    onSuccess: async () => {
      const previousBusinesses =
        queryClient.getQueryData<Business[]>("businesses");
      queryClient.setQueryData<Business[]>(
        "businesses",
        (previousBusinesses) =>
          previousBusinesses?.map((business) => {
            if (business.id === user.id) {
              const newProducts = business.Products.map((product) => {
                if (chartItemsMap.has(product.id)) {
                  return {
                    ...product,
                    quantity: product.quantity - chartItemsMap.get(product.id)!,
                  };
                }
                return product;
              });
              return {
                ...business,
                products: newProducts,
              };
            } else {
              return business;
            }
          }) ?? [],
      );
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        delete newCartItems[shopId!];
        return newCartItems;
      });
      navigate("/order");
      return { previousBusinesses };
    },
  });
  const handleBack = () => {
    navigate(-1);
  };

  const handleOrder = () => {
    mutate();
  };
  return (
    <div className="mx-auto mt-10 max-w-[944px]">
      <h1 className="flex items-center justify-between border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium">
        {business?.shopName}&apos; shop cart
        <button onClick={handleBack} className="text-base font-normal">
          back
        </button>
      </h1>
      <div>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row">
          {chartItems.map(([id, quantity]) => (
            <Product
              key={id}
              {...cartItemsForShop!.find((el) => el.id === id)!}
              quantity={quantity}
              showCart={false}
            />
          ))}
        </div>
        <button
          onClick={handleOrder}
          className={
            "fixed inset-x-0 bottom-10 mx-auto block w-full max-w-[600px] rounded-md bg-emerald-600 px-4 py-2 text-center text-white"
          }
        >
          Order products
        </button>
      </div>
    </div>
  );
}
