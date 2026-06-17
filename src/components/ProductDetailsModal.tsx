/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Star, ShieldCheck, Truck, RotateCcw, Clock, ShoppingCart, CreditCard, Tag } from "lucide-react";
import { Product } from "../types";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isInCart: boolean;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  isInCart
}: ProductDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"highlights" | "specs" | "offers">("highlights");

  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="product-details-modal-overlay">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-250"
        id={`product-modal-${product.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Product Details</span>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content box */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Product Image & Quick Actions */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-lg bg-gray-50 flex items-center justify-center p-6 border border-gray-100 shadow-inner">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              {product.isFAssured && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm border border-gray-100">
                  <img
                    src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_627fb9.png"
                    alt="Flipkart Assured"
                    className="h-4 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Actions button block */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={(e) => {
                  onAddToCart(product, e);
                  onClose();
                }}
                disabled={isInCart}
                className={`w-full py-3.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                  isInCart
                    ? "bg-green-600 hover:bg-green-700 text-white cursor-not-allowed"
                    : "bg-[#ff9f00] hover:bg-[#f39700] text-white"
                }`}
                id="modal-add-to-cart-btn"
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? "Already in Cart" : "ADD TO CART"}
              </button>
              <button
                onClick={(e) => {
                  if (!isInCart) {
                    onAddToCart(product, e);
                  }
                  onClose();
                  // Directly switches to cart/checkout view handled in parent
                }}
                className="w-full bg-[#fb641b] hover:bg-[#f25a12] text-white py-3.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                id="modal-buy-now-btn"
              >
                <CreditCard className="w-5 h-5" />
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Side: Descriptions, Tabs, details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.brand}
              </span>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h2>

              {/* Rating detail info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white stroke-none" />
                </div>
                <span className="text-sm font-semibold text-gray-500">
                  {product.ratingCount.toLocaleString()} Ratings & {product.reviewCount.toLocaleString()} Reviews
                </span>
              </div>
            </div>

            {/* Price detail block */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 space-y-1">
              <span className="text-xs font-semibold text-green-600">Special Price Offer</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm font-bold text-green-650">{discountPercent}% OFF</span>
                  </>
                )}
              </div>
              <p className="text-[11px] font-medium text-gray-400">Inclusive of all local Taxes & Shipping fees</p>
            </div>

            {/* Detail Navigation Tabs */}
            <div className="space-y-4">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("highlights")}
                  className={`flex-1 text-center py-2 text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "highlights" ? "border-[#2874f0] text-[#2874f0]" : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  id="tab-btn-highlights"
                >
                  Highlights
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`flex-1 text-center py-2 text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "specs" ? "border-[#2874f0] text-[#2874f0]" : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  id="tab-btn-specs"
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("offers")}
                  className={`flex-1 text-center py-2 text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === "offers" ? "border-[#2874f0] text-[#2874f0]" : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  id="tab-btn-offers"
                >
                  Bank Offers
                </button>
              </div>

              {/* Tab Outputs */}
              <div className="min-h-[160px] max-h-[250px] overflow-y-auto pr-2 text-sm text-gray-600 leading-relaxed scrollbar-thin">
                {activeTab === "highlights" && (
                  <ul className="space-y-2 list-disc pl-5 font-medium">
                    {product.highlights.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-1.5 border border-gray-100 rounded-lg overflow-hidden">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <div key={key} className={`grid grid-cols-3 p-2.5 text-xs font-semibold ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                        <span className="text-gray-400 col-span-1">{key}</span>
                        <span className="text-gray-800 col-span-2 font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "offers" && (
                  <ul className="space-y-3">
                    {product.offers.map((offer, index) => (
                      <li key={index} className="flex gap-2 items-start bg-green-50/40 p-2.5 rounded border border-green-100 text-xs">
                        <Tag className="w-4 h-4 text-green-650 shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-bold leading-snug">{offer}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Delivery/Warranty Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div className="p-2 bg-slate-50/70 rounded-lg flex flex-col items-center space-y-1">
                <Truck className="w-5 h-5 text-gray-650" />
                <span className="text-[10px] font-black uppercase text-gray-400">Free Shipping</span>
                <span className="text-[11px] font-bold text-gray-700">Delivered in 2-3 Days</span>
              </div>
              <div className="p-2 bg-slate-50/70 rounded-lg flex flex-col items-center space-y-1">
                <RotateCcw className="w-5 h-5 text-gray-650" />
                <span className="text-[10px] font-black uppercase text-gray-400">Replacements</span>
                <span className="text-[11px] font-bold text-gray-700">7 Days Easy Return</span>
              </div>
              <div className="p-2 bg-slate-50/70 rounded-lg flex flex-col items-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-gray-650" />
                <span className="text-[10px] font-black uppercase text-gray-400">Warranty Check</span>
                <span className="text-[11px] font-bold text-gray-700">100% Brand Original</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
