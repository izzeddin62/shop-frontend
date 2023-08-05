/* eslint-disable max-lines-per-function */
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../utils/api";
import { useMutation } from "react-query";
import { useState } from "react";

export default function Signup() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
    shopName: "",
  });
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () =>
      signup(userData.type, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        shopName: userData.shopName,
      }),
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data.user.type === "businessOwner") navigate("/business");
      else {
        navigate("/");
      }
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-lg bg-white  p-4 drop-shadow lg:mt-20 lg:pb-20">
      {isError && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span>{" "}
          {isError
            ? "Invalid email or password"
            : "Change a few things up and try submitting again."}
        </div>
      )}
      <div className="h-2 w-full bg-purple-800"></div>
      <h1 className="mt-5 border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium text-[#333]">
        Signup
      </h1>
      <form action="" className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            User type
          </label>
          <select
            name="type"
            id="type"
            required
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option selected disabled value="">
              Select user type
            </option>
            <option value="customer">Customer</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            First Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            className="focus:border-emring-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-emerald-500"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Last Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            className="focus:border-emring-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-emerald-500"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            required
          />
        </div>
        {userData.type === "business" && (
          <div className="mb-4">
            <label
              htmlFor="shopName"
              className="lock mb-2 text-sm font-medium text-gray-900"
            >
              Shop Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="focus:border-emring-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-emerald-500"
              name="shopName"
              id="shopName"
              placeholder="Enter shop name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            className="focus:border-emring-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-emerald-500"
            name="email"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="focus:ring-emborder-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-emerald-500"
            placeholder="enter password"
            required
          />
        </div>

        <button
          disabled={isLoading}
          className="mt-5 w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:w-auto"
        >
          Signup
        </button>
        <p className="mt-2 text-[#333]">
          Already joined us.{" "}
          <Link to="/login" className="text-blue-700 underline">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}
