/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, ShoppingCart, User, Store, ChevronDown, Smartphone, Tv, Shirt, Home as HomeIcon, Monitor, Sparkles, LogOut, Package } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/products";

interface NavbarProps {
  cartCount: number;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateToCart: () => void;
  onNavigateToHome: () => void;
  onNavigateToOrders: () => void;
  currentView: "catalog" | "cart" | "checkout" | "orders";
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  orderCount: number;
}

export default function Navbar({
  cartCount,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateToCart,
  onNavigateToHome,
  onNavigateToOrders,
  currentView,
  isLoggedIn,
  onToggleLogin,
  orderCount
}: NavbarProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Map category to a visual icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobiles":
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case "Electronics":
        return <Monitor className="w-5 h-5 text-amber-500" />;
      case "Fashion":
        return <Shirt className="w-5 h-5 text-pink-500" />;
      case "Home":
        return <HomeIcon className="w-5 h-5 text-green-600" />;
      case "Appliances":
        return <Tv className="w-5 h-5 text-teal-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2874f0] text-white shadow-md">
      {/* Top primary blue bar */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo and Explore Plus */}
        <div 
          className="flex flex-col cursor-pointer select-none shrink-0"
          onClick={onNavigateToHome}
          id="flipkart-logo-container"
        >
          <span className="text-xl font-bold italic tracking-wide leading-none select-none">
            Flipkart
          </span>
          <span className="text-[10px] italic flex items-center hover:underline text-[#f0f0f0]">
            Explore&nbsp;
            <span className="text-[#ffe500] font-bold flex items-center">
              Plus
              <Sparkles className="w-2.5 h-2.5 fill-[#ffe500] ml-0.5" />
            </span>
          </span>
        </div>

        {/* Search Input bar */}
        <div className="flex-1 max-w-2xl relative" id="navbar-search-bar">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-500 rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans shadow-inner"
          />
          <div className="absolute right-3 top-2.5 text-blue-600">
            <Search className="w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          {/* User Account dropdown */}
          <div className="relative">
            <button
              onClick={() => onToggleLogin()}
              className="flex items-center gap-1.5 px-4 py-1 bg-white text-[#2874f0] hover:bg-neutral-100 rounded transition font-bold"
              id="login-btn"
            >
              <User className="w-4 h-4" />
              {isLoggedIn ? "Hi, Shivani" : "Login"}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div 
            onClick={onNavigateToOrders}
            className={`cursor-pointer hover:text-yellow-300 flex items-center gap-1.5 transition ${
              currentView === "orders" ? "text-yellow-300" : ""
            }`}
            id="order-nav-link"
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">My Orders</span>
            {orderCount > 0 && (
              <span className="px-1.5 py-0.5 bg-yellow-400 text-gray-950 rounded-full text-xs font-bold font-mono">
                {orderCount}
              </span>
            )}
          </div>

          <div className="cursor-pointer hover:text-[#ffe500] flex items-center gap-1.5 transition">
            <Store className="w-4 h-4" />
            <span className="hidden md:inline">Become a Seller</span>
          </div>

          {/* Cart click */}
          <div
            onClick={onNavigateToCart}
            className={`relative flex items-center gap-1.5 cursor-pointer hover:text-[#ffe500] select-none transition py-1 px-2 rounded ${
              currentView === "cart" ? "text-yellow-300" : ""
            }`}
            id="cart-nav-link"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <div 
                  className="absolute -top-2.5 -right-2.5 bg-[#ff6161] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#2874f0] min-w-[18px] text-center font-mono"
                  id="checkout-cart-count"
                >
                  {cartCount}
                </div>
              )}
            </div>
            <span className="font-bold">Cart</span>
          </div>
        </div>
      </div>

      {/* Sub-bar carrying categories list - yellow and white highlight */}
      <nav className="bg-white text-gray-800 border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-start md:justify-center gap-8 overflow-x-auto scrollbar-none" id="categories-bar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#2874f0] text-white shadow-sm scale-105"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                id={`category-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
