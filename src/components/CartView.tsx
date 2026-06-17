/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Trash2, ShieldCheck, Heart, ArrowRight, Minus, Plus, ShoppingBag, Eye } from "lucide-react";
import { CartItem, Product } from "../types";

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
  onViewProduct: (product: Product) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
  onViewProduct
}: CartViewProps) {
  
  // Calculate price breakdowns
  const totalOriginalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.originalPrice * curr.quantity,
    0
  );
  
  const totalFinalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const discountAmount = totalOriginalPrice - totalFinalPrice;
  const platformFee = totalFinalPrice > 0 ? 49 : 0;
  const deliveryCharges = totalFinalPrice > 500 ? 0 : 40; 
  const grandTotal = totalFinalPrice + platformFee + deliveryCharges;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-12 text-center max-w-2xl mx-auto my-12 shadow-sm space-y-6" id="empty-cart-view">
        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-800">Your Flipkart Cart is empty!</h2>
          <p className="text-sm font-semibold text-gray-400 max-w-sm mx-auto">
            Explore our unbeatable offers, top brands, and high-fidelity electronics today. Add items to get started!
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          className="mx-auto px-8 py-3 bg-[#2874f0] text-white text-sm font-extrabold rounded-lg shadow-md hover:bg-blue-600 transition hover:scale-105 cursor-pointer flex items-center gap-2 justify-center"
          id="cart-shop-now-btn"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6" id="active-cart-view">
      {/* Left side: Cart List (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              Flipkart Cart ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
            </h2>
            <button
              onClick={onContinueShopping}
              className="text-xs font-bold text-[#2874f0] hover:underline"
            >
              Add more products
            </button>
          </div>

          {/* Cart List Items */}
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              const product = item.product;
              const hasDiscount = product.originalPrice > product.price;
              const itemDiscount = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              );

              return (
                <div 
                  key={product.id} 
                  className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-slate-50/40 transition-colors"
                  id={`cart-item-${product.id}`}
                >
                  {/* Left Column: Image Area */}
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <div 
                      className="w-24 h-24 aspect-square rounded-lg border border-gray-100 p-2 bg-white flex items-center justify-center cursor-pointer hover:shadow-md transition"
                      onClick={() => onViewProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded overflow-hidden shadow-sm" id={`qty-controls-${product.id}`}>
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="p-1 px-2.5 bg-gray-50 hover:bg-gray-150 transition focus:outline-none"
                        title="Reduce quantity"
                      >
                        <Minus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <span className="px-3.5 font-bold text-xs text-gray-800 min-w-[28px] text-center font-mono select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="p-1 px-2.5 bg-gray-50 hover:bg-gray-150 transition focus:outline-none"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Title and pricing */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 
                        className="text-sm font-bold text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2"
                        onClick={() => onViewProduct(product)}
                      >
                        {product.title}
                      </h3>
                      {product.isFAssured && (
                        <img
                          src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_627fb9.png"
                          alt="Flipkart Assured"
                          className="h-3.5 object-contain shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>

                    <p className="text-xs font-semibold text-gray-400">Seller: RetailNet India Ltd</p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2.5 py-1">
                      <span className="text-lg font-black text-gray-900">
                        ₹{(product.price * item.quantity).toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(product.originalPrice * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-xs font-extrabold text-green-600 uppercase">
                            {itemDiscount}% Off
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quick helper controls */}
                    <div className="flex items-center gap-6 pt-2 text-xs font-bold uppercase tracking-wider">
                      <button
                        onClick={() => onViewProduct(product)}
                        className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Product
                      </button>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                        id={`delete-cart-item-btn-${product.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Place order CTA bottom block */}
          <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
            <button
              onClick={onCheckout}
              className="bg-[#fb641b] hover:bg-[#f25a12] text-white px-8 py-3.5 rounded-md font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition hover:scale-[1.02] cursor-pointer"
              id="cart-place-order-btn"
            >
              PLACE ORDER <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Price Details (1 col) */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-105 shadow-sm sticky top-24 overflow-hidden" id="cart-price-breakdown">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-xs font-black uppercase text-gray-450 tracking-widest">Price Details</h3>
          </div>

          {/* Lines */}
          <div className="p-5 space-y-4 text-sm text-gray-700 font-semibold border-b border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Price ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
              <span>₹{totalOriginalPrice.toLocaleString()}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount Saved</span>
                <span>- ₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Charges</span>
              <span>
                {deliveryCharges === 0 ? (
                  <span className="text-green-650 font-bold">FREE Delivery</span>
                ) : (
                  `₹${deliveryCharges}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Platform Secure Fee</span>
              <span>₹{platformFee}</span>
            </div>
          </div>

          {/* Total */}
          <div className="p-5 bg-[#fafafa] flex flex-col space-y-3">
            <div className="flex justify-between text-base font-black text-gray-900">
              <span>Total Amount</span>
              <span className="text-xl font-black font-mono">₹{grandTotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="bg-green-50 text-green-750 p-2.5 rounded border border-green-100 text-xs text-center font-bold">
                You will save ₹{discountAmount.toLocaleString()} on this premium purchase! 🎉
              </div>
            )}
          </div>

          {/* Safe Purchase stamp */}
          <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
            <p className="text-[10px] text-gray-400 font-bold uppercase leading-snug">
              Safe and Secure Checkout. Genuine Original products. Easy Return rules apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
