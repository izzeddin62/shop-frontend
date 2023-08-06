import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon";
import chart from "../../assets/chart.svg";
import { getUser } from "../../utils/api";
import logout from "../../assets/logout.svg";
import { useCartContext } from "../../contexts/CartWrapper";
import { useQuery } from "react-query";

export default function AppWrapper() {
  const [cartItems] = useCartContext();
  const navigate = useNavigate();
  const { shopId } = useParams<{ shopId: string }>();
  const token = localStorage.getItem("token");
  const { data, isLoading } = useQuery({
    queryKey: "user",
    queryFn: () => getUser(JSON.parse(token!)),
    onError: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!shopId) return;
    navigate(`/shop/${shopId}/cart`);
  };
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <header className="flex h-14 items-center justify-between bg-emerald-600 px-6 ">
        {data ? (
          <button onClick={handleLogout}>
            <img src={logout} alt="logout" className="h-6 w-6" />{" "}
          </button>
        ) : (
          <Link to="/login">
            <ProfileIcon className="text-white" />
          </Link>
        )}

        <Link to="/" className="text-xl text-white">
          logo
        </Link>
        <button className="relative" onClick={handleCartClick}>
          <img src={chart} alt="cart" className="h-6 w-6" />
          <span className="absolute -right-4 -top-4 text-white">
            {shopId ? cartItems[shopId]?.length : ""}
          </span>
        </button>
      </header>
      <div className="flex-1 px-4">
        <Outlet context={data} />
      </div>
    </div>
  );
}
