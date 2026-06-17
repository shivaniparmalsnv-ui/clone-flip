/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Percent, Tag, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  subTitle: string;
  bgColor: string;
  accentColor: string;
  image: string;
  badge: string;
  coupon: string;
}

const CAROUSEL_SLIDES: Slide[] = [
  {
    id: 1,
    title: "BIG BILLION DAYS PREVIEW",
    tagline: "Unbeatable Deals on Finest Electronics",
    subTitle: "Up to 60% OFF on Laptops, ANC Headphones & iPads",
    bgColor: "from-blue-900 via-indigo-900 to-slate-900",
    accentColor: "text-yellow-400",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=650",
    badge: "Limited Period Only",
    coupon: "USE CODE: ELEC10"
  },
  {
    id: 2,
    title: "PREMIUM MOBILE FESTIVAL",
    tagline: "Upgrade to Titanium Elite Performance",
    subTitle: "Samsung Galaxy S24 Ultra & iPhone 15 Pro | Instant Exchange Deals Up to ₹25,000",
    bgColor: "from-slate-950 via-gray-900 to-blue-950",
    accentColor: "text-amber-400",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=650",
    badge: "Exciting Exchange Bonus",
    coupon: "USE CODE: MOBILITY"
  },
  {
    id: 3,
    title: "FASHION WARDROBE SENSATION",
    tagline: "Curate Your Ultimate Summer Vibe",
    subTitle: "Flawless Sneakers, Trackers and Cotton Shirts under ₹999 on Puma, Roadster, Nike",
    bgColor: "from-pink-950 via-purple-900 to-indigo-950",
    accentColor: "text-teal-300",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=650",
    badge: "Buy 2 Get 1 Free",
    coupon: "USE CODE: STYLE20"
  }
];

export default function HeroCarousel({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const current = CAROUSEL_SLIDES[activeSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 md:rounded-xl shadow-lg mt-4" id="deal-carousel">
      {/* Slide body */}
      <div className={`w-full py-10 md:py-16 px-6 md:px-16 bg-gradient-to-r ${current.bgColor} text-white flex flex-col md:flex-row items-center justify-between gap-8 min-h-[340px] md:min-h-[400px] transition-all duration-700 ease-in-out`}>
        {/* Banner Text description */}
        <div className="flex-1 space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#ffe500]" id={`carousel-badge-${current.id}`}>
            <Sparkles className="w-3.5 h-3.5" />
            {current.badge}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
            {current.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className={current.accentColor}>{current.title.split(" ").slice(-1)[0]}</span>
          </h2>
          
          <p className="text-lg md:text-xl font-bold opacity-90 text-gray-100">
            {current.tagline}
          </p>
          
          <p className="text-sm md:text-base opacity-75 text-gray-300">
            {current.subTitle}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <span className="flex items-center gap-1.5 bg-[#df3333] px-3 py-1.5 rounded text-xs font-bold text-white uppercase font-mono tracking-wider shadow">
              <Tag className="w-3.5 h-3.5" />
              {current.coupon}
            </span>
            <button 
              onClick={() => {
                if (current.id === 1) onSelectCategory("Electronics");
                else if (current.id === 2) onSelectCategory("Mobiles");
                else onSelectCategory("Fashion");
              }}
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-5 py-2.5 rounded text-sm hover:bg-yellow-300 transition shadow hover:scale-105 cursor-pointer"
              id={`shop-now-banner-btn-${current.id}`}
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Banner Image representation */}
        <div className="w-full md:w-auto flex justify-center shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 w-[280px] md:w-[380px] aspect-[4/3] focus-within:ring-2">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-[#2874f0] text-white font-bold py-1.5 px-3 rounded-full text-xs flex items-center gap-1 shadow-md">
              <Percent className="w-3.5 h-3.5" />
              SUPER SALE
            </div>
          </div>
        </div>
      </div>

      {/* Nav Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
        aria-label="Previous Slide"
        id="carousel-prev-btn"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
        aria-label="Next Slide"
        id="carousel-next-btn"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              activeSlide === idx ? "bg-white w-6" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            id={`carousel-indicator-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
