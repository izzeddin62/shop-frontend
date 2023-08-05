import { Outlet, useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";
import ProfileIcon from "../../assets/ProfileIcon";
import chart from "../../assets/chart.svg";
import { useCartContext } from "../../contexts/CartWrapper";

export default function AppWrapper() {
  const [cartItems] = useCartContext();
  const navigate = useNavigate();
  const { shopId } = useParams<{ shopId: string }>();

  const handleCartClick = () => {
    if (!shopId) return;
    navigate(`/shop/${shopId}/cart`);
  };
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <header className="flex h-14 items-center justify-between bg-emerald-600 px-6 ">
        <Button>
          <ProfileIcon className="text-white" />
        </Button>
        <div className="text-xl text-white">logo</div>
        <button className="relative" onClick={handleCartClick}>
          <img src={chart} alt="cart" className="h-6 w-6" />
          <span className="absolute -right-4 -top-4 text-white">
            {shopId ? cartItems[shopId]?.length : ""}
          </span>
        </button>
      </header>
      <div className="flex-1 px-4">
        <Outlet />
      </div>
    </div>
  );
}
