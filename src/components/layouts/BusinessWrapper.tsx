import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon";
import { getUser } from "../../utils/api";
import logout from "../../assets/logout.svg";
import { useQuery } from "react-query";

export default function BusinessWrapper() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading } = useQuery({
    queryKey: "user",
    queryFn: () => getUser(JSON.parse(token!)),
    onError: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
    onSuccess: (data) => {
      console.log(data, "==============");
      if (data.type !== "businessOwner") {
        navigate("/");
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

        <Link to="/business" className="text-xl text-white">
          logo
        </Link>
        <div></div>
      </header>
      <div className="flex-1 px-4">
        <Outlet context={data} />
      </div>
    </div>
  );
}
