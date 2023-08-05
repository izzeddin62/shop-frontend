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
