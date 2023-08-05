export interface Business {
  id: string;
  shopName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastName: string;
  firstName: string;
  Products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  businessOwnerId: string;
  quantity: number;
  category: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "businessOwner" | "customer";
  createdAt: Date;
  updatedAt: Date;
}
