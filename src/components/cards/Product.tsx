import { Product as ProductInterface } from "../../utils/interfaces";
import productPlacehoder from "../../assets/product.jpeg";
import { useCartContext } from "../../contexts/CartWrapper";
import { useParams } from "react-router-dom";

interface ProductProps extends ProductInterface {
  showCart: boolean;
}
export default function Product(props: ProductProps) {
  const { name, price, quantity, description, category, showCart } = props;
  const { shopId } = useParams<{ shopId: string }>();
  const [, setCartItems] = useCartContext();
  const handleCart = () => {
    if (shopId === undefined) return;
    setCartItems((prev) => ({
      ...prev,
      [shopId]: [...(prev[shopId] ?? []), props],
    }));
  };
  return (
    <div className="flex gap-3 rounded bg-white p-5 drop-shadow-md lg:pr-20">
      <img
        className="h-28 w-28 object-cover"
        src={productPlacehoder}
        alt="product"
      />
      <div>
        <h1 className="font-serif text-3xl font-medium">{name}</h1>
        <p className="mt-3 text-xl font-bold">${price}</p>
        <p className="mt-3 text-sm">
          <span className="font-light">category:</span> {category}
        </p>
        <p className="mt-1 text-sm">
          <span className="font-light">quantity:</span> {quantity}
        </p>
        <p>
          {!description
            ? ""
            : description.slice(0, 50) + (description.length > 50 ? "..." : "")}
        </p>
        {showCart && (
          <button
            className="mt-2 rounded bg-emerald-600 px-4 py-2 text-white"
            onClick={handleCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
