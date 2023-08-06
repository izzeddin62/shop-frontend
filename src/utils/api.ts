import { Business, Product, User } from "./interfaces";
import axios from "axios";

export async function getBusinesses() {
  const res = await axios.get<{ businesses: Business[]; message: string }>(
    "http://localhost:3003/products",
  );
  return res.data.businesses;
}

export async function login(email: string, password: string, type: string) {
  if (type === "customer") {
    const res = await axios.post<{
      token: string;
      user: User;
      message: string;
    }>("http://localhost:3003/auth/signin", { email, password });
    return res.data;
  }
  const res = await axios.post<{ token: string; user: User; message: string }>(
    "http://localhost:3003/auth/owner/signin",
    { email, password },
  );
  return res.data;
}

export async function getUser(token: string) {
  const res = await axios.get<{ user: User; message: string }>(
    "http://localhost:3003/auth/user",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.user;
}

export async function createProduct(
  token: string,
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "businessOwnerId">,
) {
  const res = await axios.post<{
    product: Product;
    message: string;
  }>(
    "http://localhost:3003/products",
    { ...product },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.product;
}

export async function signup(
  type: string,
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    shopName?: string;
  },
) {
  if (type === "customer") {
    delete user.shopName;
    const res = await axios.post<{
      token: string;
      user: User;
      message: string;
    }>("http://localhost:3003/auth/signup", { ...user });
    return res.data;
  }
  const res = await axios.post<{
    token: string;
    user: User;
    message: string;
  }>("http://localhost:3003/auth/owner/signup", { ...user });
  return res.data;
}

export async function orderProducts(
  token: string,
  products: [string, number][],
) {
  const res = await axios.post<{
    message: string;
    products: Product[];
  }>(
    "http://localhost:3003/products/order",
    { products },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}
