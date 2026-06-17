/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "./data/products";
import { Product, CartItem, FilterState, Address, PaymentDetails, Order } from "./types";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import OrdersView from "./components/OrdersView";
import AssistantChat from "./components/AssistantChat";
import { CheckCircle2, ChevronRight, X, ArrowLeft, Percent, Filter, SlidersHorizontal, ShoppingBag } from "lucide-react";

const INITIAL_FILTER: FilterState = {
  searchQuery: "",
  category: "All",
  brand: "",
  minPrice: 0,
  maxPrice: 150000,
  minRating: 0,
  isFAssured: false,
  sortBy: "popularity"
};

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<"catalog" | "cart" | "checkout" | "orders">("catalog");
  
  // App primary States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-signed in as Shivani for rich e-commerce demo experience
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Maximum price in existing product definitions for dynamic range limiting
  const maxCatalogPrice = useMemo(() => {
    return Math.max(...PRODUCTS.map((p) => p.price));
  }, []);

  // Sync category selection with filters
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setFilters((prev) => ({
      ...prev,
      category: cat
    }));
    setCurrentView("catalog");
  };

  // Sync search state with filters
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({
      ...prev,
      searchQuery: query
    }));
    setCurrentView("catalog");
  };

  // Toast Helper
  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Quantity updated for ${product.brand} product!`);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`Successfully added ${product.title.slice(0, 20)}... to Cart! 🛒`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        });
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Product removed from Shopping Cart.");
  };

  // Custom multi-variant order checkout
  const handlePlaceOrder = (address: Address, payment: PaymentDetails) => {
    const totalOriginalPrice = cart.reduce(
      (acc, curr) => acc + curr.product.originalPrice * curr.quantity,
      0
    );
    const totalFinalPrice = cart.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );
    const discountAmount = totalOriginalPrice - totalFinalPrice;
    const platformFee = 49;
    const deliveryCharges = totalFinalPrice > 500 ? 0 : 40;
    const grandTotal = totalFinalPrice + platformFee + deliveryCharges;

    const newOrder: Order = {
      id: `OD${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      items: [...cart],
      shippingAddress: address,
      paymentDetails: payment,
      totalAmount: grandTotal,
      discountSaved: discountAmount,
      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      status: "Order Confirmed",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]); // Reset Cart
    setCurrentView("orders");
    showToast(`Order Placed Securely! order ID: ${newOrder.id} 🎉`);
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // 2. Search Query Search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCat) {
          return false;
        }
      }

      // 3. Brand Filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // 4. Price Limits
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 5. Rating Selection
      if (product.rating < filters.minRating) {
        return false;
      }

      // 6. FAssured Toggle Checks
      if (filters.isFAssured && !product.isFAssured) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort configurations
      switch (filters.sortBy) {
        case "price_low_high":
          return a.price - b.price;
        case "price_high_low":
          return b.price - a.price;
        case "discount_high_low":
          const d1 = a.originalPrice - a.price;
          const d2 = b.originalPrice - b.price;
          return d2 - d1;
        case "popularity":
        default:
          return b.rating - a.rating;
      }
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      ...INITIAL_FILTER,
      category: selectedCategory, // keep current primary tab
      searchQuery: searchQuery
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex flex-col font-sans" id="applet-root-container">
      {/* Top sticky Navigation */}
      <Navbar
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNavigateToCart={() => setCurrentView("cart")}
        onNavigateToHome={() => setCurrentView("catalog")}
        onNavigateToOrders={() => setCurrentView("orders")}
        currentView={currentView}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => {
          setIsLoggedIn(!isLoggedIn);
          showToast(isLoggedIn ? "Log out successful." : "Welcome back, Shivani! Signed in securely.");
        }}
        orderCount={orders.length}
      />

      {/* Main Container Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6" id="applet-main-body">
        {/* Success Alert Toast Notification */}
        {successToast && (
          <div 
            className="fixed top-24 right-6 z-50 bg-[#1d1d1f] text-white py-3 px-5 rounded-lg shadow-xl flex items-center gap-3 border border-neutral-700 animate-in fade-in slide-in-from-top-4 duration-300"
            id="applet-success-toast"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-xs font-bold font-sans">{successToast}</span>
            <button 
              onClick={() => setSuccessToast(null)}
              className="text-white/50 hover:text-white pb-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 1. CATALOGUE VIEW */}
        {currentView === "catalog" && (
          <div className="space-y-6">
            {/* Carousel section inside catalogue */}
            {!searchQuery && selectedCategory === "All" && (
              <HeroCarousel onSelectCategory={handleSelectCategory} />
            )}

            {/* Quick stats or promo bar */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm" id="catalog-header-bar">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400">
                  Showing {filteredProducts.length} of {PRODUCTS.length} Premium Products
                </span>
                {filters.category !== "All" && (
                  <span className="px-2.5 py-1 bg-blue-100/70 text-[#2874f0] text-xs font-bold rounded-full">
                    {filters.category}
                  </span>
                )}
              </div>

              {/* Sorting tools */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Sort By:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })}
                  className="bg-gray-50 border border-gray-200 text-xs font-bold rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2874f0] text-gray-700 cursor-pointer"
                  id="sort-select-dropdown"
                >
                  <option value="popularity">Popularity / Top Rated</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="discount_high_low">Biggest Discounts</option>
                </select>
              </div>
            </div>

            {/* Two-Column Master Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              {/* Sidebar filter controls (1 col on large screen) */}
              <div className="md:col-span-1">
                <Filters
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  maxCatalogPrice={maxCatalogPrice}
                />
              </div>

              {/* Main Catalog grid list (3 cols) */}
              <div className="md:col-span-3">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
                    {filteredProducts.map((product) => {
                      const isInCart = cart.some((item) => item.product.id === product.id);
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewDetails={(prod) => setSelectedProduct(prod)}
                          onAddToCart={handleAddToCart}
                          isInCart={isInCart}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-16 border border-gray-100 text-center max-w-lg mx-auto shadow-sm space-y-4">
                    <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-800">No matching items found</h3>
                      <p className="text-xs text-gray-400 font-semibold">
                        Try adjusting your price parameters, clearing optional brand filters, or trying a different category tab.
                      </p>
                    </div>
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-2.5 bg-[#2874f0] text-white text-xs font-bold rounded shadow hover:bg-blue-600 transition cursor-pointer"
                    >
                      Clear Active Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. SHOPPING CART VIEW */}
        {currentView === "cart" && (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("catalog")}
              className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-1 cursor-pointer"
              id="back-to-catalog-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
            <CartView
              cartItems={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onContinueShopping={() => setCurrentView("catalog")}
              onCheckout={() => {
                if (!isLoggedIn) {
                  showToast("Please sign in or select login in Navbar to carry out secure checkout checkout!");
                }
                setCurrentView("checkout");
              }}
              onViewProduct={(prod) => setSelectedProduct(prod)}
            />
          </div>
        )}

        {/* 3. MULTI-STEP CHECKOUT VIEW */}
        {currentView === "checkout" && (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("cart")}
              className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-1 cursor-pointer"
              id="back-to-cart-btn-chkot"
            >
              <ArrowLeft className="w-4 h-4" />
              Adjust Cart Items
            </button>
            <CheckoutView
              cartItems={cart}
              onPlaceOrder={handlePlaceOrder}
              onCancelCheckout={() => setCurrentView("cart")}
            />
          </div>
        )}

        {/* 4. ORDERS VIEW */}
        {currentView === "orders" && (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("catalog")}
              className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </button>
            
            {/* Last placed order receipt banner if just checkout completed */}
            {lastPlacedOrder && (
              <div 
                className="bg-green-55 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-500/20 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in zoom-in-95 duration-300"
                id="receipt-celebratory-banner"
              >
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-emerald-500 rounded-full text-white shrink-0 shadow">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-left space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase">Congratulations! Order Placed Successfully</h3>
                    <p className="text-xs text-slate-500 font-semibold">Your delivery is registered under Secure Tracking ID: <span className="font-extrabold font-mono text-slate-800">{lastPlacedOrder.id}</span></p>
                    <p className="text-[11px] text-green-700 font-bold">Estimated dispatch within 12 hours. Confirmation message sent to +91 9876543210.</p>
                  </div>
                </div>
                <button
                  onClick={() => setLastPlacedOrder(null)}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded cursor-pointer transition shadow"
                >
                  Got It
                </button>
              </div>
            )}

            <OrdersView
              orders={orders}
              onContinueShopping={() => setCurrentView("catalog")}
              onViewProduct={(prod) => setSelectedProduct(prod)}
            />
          </div>
        )}
      </main>

      {/* Floating Gemini Copilot assistant drawer */}
      <AssistantChat
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onViewProduct={(prod) => setSelectedProduct(prod)}
        cartCount={cart.length}
      />

      {/* Detail overlay Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isInCart={cart.some((item) => item.product.id === selectedProduct.id)}
        />
      )}

      {/* Classic Footing branding */}
      <footer className="bg-[#172337] text-white py-12 mt-16 text-center border-t border-gray-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs text-gray-300">
          <div className="space-y-2">
            <h5 className="font-bold text-gray-400 capitalize tracking-wider text-sm mb-2">ABOUT</h5>
            <p className="hover:underline cursor-pointer">Contact Us</p>
            <p className="hover:underline cursor-pointer">About Us</p>
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">Flipkart Stories</p>
            <p className="hover:underline cursor-pointer">Press</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-gray-400 capitalize tracking-wider text-sm mb-2">HELP</h5>
            <p className="hover:underline cursor-pointer">Payments</p>
            <p className="hover:underline cursor-pointer">Shipping</p>
            <p className="hover:underline cursor-pointer">Cancellation & Returns</p>
            <p className="hover:underline cursor-pointer">FAQ</p>
          </div>
          <div className="space-y-2 col-span-1 md:col-span-2">
            <h5 className="font-bold text-gray-400 capitalize tracking-wider text-sm mb-3">FLIPKART CLONE ASSISTANCE</h5>
            <p className="leading-relaxed">This application is a high fidelity, responsive Flipkart Clone featuring full product catalogues, categorizations, smart search queries, active multi-step checkouts, secure shopping indicators, and virtual delivery item tracking logs.</p>
            <p className="text-[10px] text-gray-500 font-bold pt-2 uppercase">Developed in 2026. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
