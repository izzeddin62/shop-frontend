/* eslint-disable max-lines-per-function */
import { Business, User } from "../utils/interfaces";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createProduct } from "../utils/api";
import { useState } from "react";

export default function NewProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const user = useOutletContext<User>();
  const token = JSON.parse(localStorage.getItem("token")!);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () =>
      createProduct(token, {
        ...productData,
        price: +productData.price,
        quantity: +productData.quantity,
      }),
    onSuccess: async (data) => {
      const previousBusinesses =
        queryClient.getQueryData<Business[]>("businesses");
      queryClient.setQueryData<Business[]>(
        "businesses",
        (previousBusinesses) =>
          previousBusinesses?.map((business) => {
            if (business.id === user.id) {
              return {
                ...business,
                products: [...business.Products, data],
              };
            } else {
              return business;
            }
          }) ?? [],
      );
      navigate("/business");
      return { previousBusinesses };
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  const handleBack = () => {
    navigate(-1);
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
      <h1 className="mt-5 flex items-center justify-between border-b border-b-gray-800 pb-3 font-serif text-3xl font-medium text-[#333]">
        Add a new Product
        <button onClick={handleBack} className="text-base font-normal">
          back
        </button>
      </h1>
      <form action="" className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            className="focus:border-emring-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-emerald-500"
            name="name"
            id="name"
            placeholder="Enter the name of the product"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="number"
            onChange={handleChange}
            className="focus:ring-emborder-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-emerald-500"
            placeholder="enter the price of the product"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            onChange={handleChange}
            className="focus:ring-emborder-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-emerald-500"
            placeholder="Number of items in stock"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="lock mb-2 text-sm font-medium text-gray-900"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            className="focus:ring-emborder-emerald-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-emerald-500"
            placeholder="enter the category of the product. ex: fitness, electronics, etc."
            required
          />
        </div>

        <button
          disabled={isLoading}
          className="mt-5 w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:w-auto"
        >
          {isLoading ? "Loading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
