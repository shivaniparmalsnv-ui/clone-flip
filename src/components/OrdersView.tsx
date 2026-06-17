/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, ShieldCheck, MapPin, Truck, Box, Calendar, ShoppingBag } from "lucide-react";
import { Order, Product } from "../types";

interface OrdersViewProps {
  orders: Order[];
  onContinueShopping: () => void;
  onViewProduct: (product: Product) => void;
}

export default function OrdersView({
  orders,
  onContinueShopping,
  onViewProduct
}: OrdersViewProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-12 text-center max-w-2xl mx-auto my-12 shadow-sm space-y-6" id="empty-orders-view">
        <div className="w-24 h-24 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-800">No Orders Placed Yet!</h2>
          <p className="text-sm font-semibold text-gray-400 max-w-sm mx-auto">
            Place an order using our secure virtual checkout to track real-time delivery milestones right here.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="mx-auto px-8 py-3 bg-[#2874f0] text-white text-sm font-extrabold rounded-lg shadow-md hover:bg-blue-600 transition hover:scale-105 cursor-pointer"
          id="orders-shop-now-btn"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  // Get milestone color representation
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Order Confirmed":
        return "text-blue-600 bg-blue-50 border-blue-105";
      case "Shipped":
        return "text-purple-600 bg-purple-50 border-purple-105";
      case "Out for Delivery":
        return "text-amber-600 bg-amber-50 border-amber-105";
      case "Delivered":
        return "text-green-600 bg-green-50 border-green-105";
      default:
        return "text-gray-600 bg-gray-50 border-gray-155";
    }
  };

  return (
    <div className="space-y-6 mt-6" id="orders-view-box">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-xl font-extrabold text-gray-800">
          My Order History ({orders.length} {orders.length === 1 ? "order" : "orders"})
        </h2>
        <button
          onClick={onContinueShopping}
          className="text-xs font-bold text-[#2874f0] hover:underline"
        >
          Keep shopping
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            id={`order-block-${order.id}`}
          >
            {/* Top row carrying Order ID & Date */}
            <div className="p-4 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-2.5 text-xs font-semibold text-gray-500">
              <div className="flex flex-wrap gap-4">
                <span>
                  ORDER ID: <span className="font-extrabold text-gray-800 font-mono">{order.id}</span>
                </span>
                <span>
                  PLACED ON: <span className="font-extrabold text-gray-800">{order.orderDate}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Total Value:</span>
                <span className="text-sm font-black text-gray-950">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Inner info */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Product items (col-span-2) */}
              <div className="md:col-span-2 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-start cursor-pointer hover:bg-slate-50/20 p-1.5 rounded transition"
                    onClick={() => onViewProduct(item.product)}
                  >
                    <div className="w-16 h-16 rounded border border-gray-100 p-1.5 bg-white shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-sm font-bold text-gray-800 truncate hover:text-[#2874f0] transition-colors">
                        {item.product.title}
                      </h4>
                      <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-xs font-black text-gray-700">₹{item.product.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status and Milestones */}
              <div className="md:col-span-1 bg-slate-50/50 p-4 border border-gray-150 rounded-xl space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Status</span>
                  <div className={`p-2 rounded border text-center text-xs font-black uppercase ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Est. Delivery: <span className="font-bold text-gray-800">{order.estimatedDelivery}</span></span>
                  </div>
                  
                  <div className="flex items-start gap-2 border-t border-gray-200/50 pt-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800 truncate">{order.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">
                        {order.shippingAddress.addressLines}, {order.shippingAddress.locality}
                      </p>
                    </div>
                  </div>

                  {order.paymentDetails.method && (
                    <div className="border-t border-gray-200/50 pt-2.5 flex items-center justify-between text-[11px] text-gray-450 uppercase">
                      <span>Paid via</span>
                      <span className="font-bold text-gray-700">{order.paymentDetails.method.toUpperCase()}</span>
                    </div>
                  )}

                  {order.discountSaved > 0 && (
                    <div className="text-green-650 bg-green-50/50 p-2 border border-green-100 rounded text-[10px] text-center font-bold">
                      Saved ₹{order.discountSaved.toLocaleString()} overall!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
