/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShoppingCart, Eye, Tag } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isInCart: boolean;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isInCart
}: ProductCardProps) {
  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer relative"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Box */}
      <div className="relative w-full aspect-square bg-[#f9f9f9] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-sm flex items-center gap-0.5">
            <Tag className="w-2.5 h-2.5" />
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick buttons overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-2.5 bg-white text-gray-800 rounded-full hover:bg-[#2874f0] hover:text-white shadow-lg transition transform translate-y-3 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`p-2.5 rounded-full shadow-lg transition transform translate-y-3 group-hover:translate-y-0 duration-300 ${
              isInCart
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-yellow-400 hover:text-gray-900"
            }`}
            title={isInCart ? "Already in Cart" : "Add to Cart"}
            disabled={isInCart}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        {/* Brand & Assured Block */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
            {product.brand}
          </span>
          {product.isFAssured && (
            <img
              src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_627fb9.png"
              alt="Flipkart Assured"
              className="h-3.5 object-contain"
              referrerPolicy="no-referrer"
              id={`assured-badge-${product.id}`}
            />
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 hover:text-[#2874f0] transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Ratings block */}
        <div className="flex items-center gap-1.5 py-0.5">
          <div className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white stroke-none" />
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            ({product.ratingCount.toLocaleString()})
          </span>
        </div>

        {/* Highlights summary (First 2) */}
        <ul className="text-[11px] font-medium text-gray-500 space-y-0.5 list-disc pl-3">
          {product.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="line-clamp-1">{h}</li>
          ))}
        </ul>

        {/* Pricing Block */}
        <div className="flex items-baseline gap-2 pt-1 mt-auto">
          <span className="text-base font-black text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-green-600">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
