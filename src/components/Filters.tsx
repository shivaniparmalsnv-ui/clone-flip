/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Filter, RotateCcw, Star, Check, Sparkles } from "lucide-react";
import { FilterState } from "../types";
import { BRANDS } from "../data/products";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  maxCatalogPrice: number;
}

export default function Filters({
  filters,
  onFilterChange,
  onResetFilters,
  maxCatalogPrice
}: FiltersProps) {
  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleRatingSelect = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleBrandSelect = (brand: string) => {
    onFilterChange({
      ...filters,
      brand: filters.brand === brand ? "" : brand,
    });
  };

  const toggleFAssured = () => {
    onFilterChange({
      ...filters,
      isFAssured: !filters.isFAssured,
    });
  };

  const hasActiveFilters = 
    filters.brand !== "" || 
    filters.minPrice > 0 || 
    filters.maxPrice < maxCatalogPrice || 
    filters.minRating > 0 || 
    filters.isFAssured;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm space-y-6 h-fit sticky top-24" id="sidebar-filters">
      {/* Header section with Reset */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <Filter className="w-4 h-4 text-[#2874f0]" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-[#2874f0] hover:text-blue-700 hover:underline transition cursor-pointer"
            id="reset-filters-btn"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* FAssured Toggle */}
      <div className="flex items-center justify-between bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <img
            src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_627fb9.png"
            alt="Flipkart Assured"
            className="h-4 object-contain"
            referrerPolicy="no-referrer"
          />
        </label>
        <button
          onClick={toggleFAssured}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filters.isFAssured ? "bg-[#2874f0]" : "bg-gray-250"
          }`}
          role="switch"
          aria-checked={filters.isFAssured}
          id="f-assured-toggle"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              filters.isFAssured ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Price</h4>
        
        {/* Preset limits */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => handlePriceChange(0, 1000)}
            className={`px-2 py-1.5 rounded border text-center transition cursor-pointer ${
              filters.minPrice === 0 && filters.maxPrice === 1000
                ? "bg-[#2874f0]/10 border-[#2874f0] text-[#2874f0] font-bold"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            id="price-range-under-1000"
          >
            Under ₹1,000
          </button>
          <button
            onClick={() => handlePriceChange(1000, 10000)}
            className={`px-2 py-1.5 rounded border text-center transition cursor-pointer ${
              filters.minPrice === 1000 && filters.maxPrice === 10000
                ? "bg-[#2874f0]/10 border-[#2874f0] text-[#2874f0] font-bold"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            id="price-range-1k-10k"
          >
            ₹1K - ₹10K
          </button>
          <button
            onClick={() => handlePriceChange(10000, 50000)}
            className={`px-2 py-1.5 rounded border text-center transition cursor-pointer ${
              filters.minPrice === 10000 && filters.maxPrice === 50000
                ? "bg-[#2874f0]/10 border-[#2874f0] text-[#2874f0] font-bold"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            id="price-range-10k-50k"
          >
            ₹10K - ₹50K
          </button>
          <button
            onClick={() => handlePriceChange(50000, maxCatalogPrice)}
            className={`px-2 py-1.5 rounded border text-center transition cursor-pointer ${
              filters.minPrice === 50000 && filters.maxPrice === maxCatalogPrice
                ? "bg-[#2874f0]/10 border-[#2874f0] text-[#2874f0] font-bold"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            id="price-range-above-50k"
          >
            ₹50K+
          </button>
        </div>

        {/* Custom Price Sliders or inputs */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <div className="w-1/2">
            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Min Price</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value) || 0, filters.maxPrice)}
              className="w-full text-xs font-semibold px-2 py-1.5 border border-gray-200 rounded text-gray-800 focus:outline-[#2874f0]"
              min={0}
              id="min-price-input"
            />
          </div>
          <div className="w-1/2">
            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Max Price</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value) || maxCatalogPrice)}
              className="w-full text-xs font-semibold px-2 py-1.5 border border-gray-200 rounded text-gray-800 focus:outline-[#2874f0]"
              min={filters.minPrice}
              id="max-price-input"
            />
          </div>
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Brand</h4>
        <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {BRANDS.map((brand) => {
            const isChecked = filters.brand === brand;
            return (
              <div
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-900 cursor-pointer select-none py-0.5"
                id={`brand-filter-${brand.toLowerCase()}`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  isChecked ? "bg-[#2874f0] border-[#2874f0] text-white" : "border-gray-300 hover:border-[#2874f0]"
                }`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{brand}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Ratings */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Customer Ratings</h4>
        <div className="space-y-2 text-xs font-semibold">
          {[4, 3, 2].map((num) => {
            const isSelected = filters.minRating === num;
            return (
              <button
                key={num}
                onClick={() => handleRatingSelect(num)}
                className={`w-full flex items-center justify-between text-left px-3 py-1.5 rounded transition cursor-pointer border ${
                  isSelected 
                    ? "bg-[#2874f0]/10 border-[#2874f0] text-blue-700 font-bold" 
                    : "border-transparent hover:bg-gray-50 text-gray-700"
                }`}
                id={`ratings-filter-${num}-star`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-0.5 font-bold">
                    {num} <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  </span>
                  <span>& above</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#2874f0] stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
