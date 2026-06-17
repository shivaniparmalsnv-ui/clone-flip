/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number; // Final price
  originalPrice: number; // Before discount
  rating: number;
  ratingCount: number;
  reviewCount: number;
  brand: string;
  isFAssured: boolean;
  image: string;
  highlights: string[];
  specifications: Record<string, string>;
  offers: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  isFAssured: boolean;
  sortBy: "popularity" | "price_low_high" | "price_high_low" | "discount_high_low";
}

export interface Address {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  state: string;
  addressLines: string;
  locality: string;
  addressType: "home" | "work";
}

export interface PaymentDetails {
  method: "upi" | "card" | "cod";
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  totalAmount: number;
  discountSaved: number;
  orderDate: string;
  status: "Order Confirmed" | "Shipped" | "Out for Delivery" | "Delivered";
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "system";
  text: string;
  timestamp: string;
}
