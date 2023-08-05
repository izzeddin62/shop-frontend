import { Business } from "./interfaces";
import axios from "axios";

export async function getBusinesses() {
  const res = await axios.get<{ businesses: Business[]; message: string }>(
    "http://localhost:3003/products",
  );
  return res.data.businesses;
}
