/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, ShoppingCart, HelpCircle } from "lucide-react";
import { ChatMessage, Product } from "../types";

interface AssistantChatProps {
  products: Product[];
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onViewProduct: (product: Product) => void;
  cartCount: number;
}

const PRESET_PROMPTS = [
  "Compare Samsung S24 vs iPhone 15 Pro",
  "Recommend a great gaming laptop",
  "Best electronics under ₹30,000",
  "Show running shoes with great ratings",
  "What is the warranty on Dyson vacuum?"
];

export default function AssistantChat({
  products,
  onAddToCart,
  onViewProduct,
  cartCount
}: AssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hi there! I am your intelligent Flipkart Shopping Assistant powered by Gemini. Ask me about products, specifications, compares, or shipping offers!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle preset clicks
  const handlePresetClick = (promptText: string) => {
    if (isLoading) return;
    sendMessage(promptText);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Direct POST request to server-side Gemini processing API route
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, products: products })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error("API direct call response error");
      }
    } catch (e) {
      console.warn("Backend API route failed or not fully listening yet, using intelligent client fallback response engine:", e);
      
      // Intelligent Client Fallback Response Engine
      let fallbackText = "Sorry, I am having trouble connecting to my servers right now.";
      const query = text.toLowerCase();

      if (query.includes("compare") || (query.includes("s24") && query.includes("iphone"))) {
        fallbackText = `Here is a high-fidelity comparison of our two elite mobiles:
        
1. **SAMSUNG Galaxy S24 Ultra**: 
   - Price: ₹129,999 (Saved ₹15,000!)
   - Camera: 200MP + 50MP Rear Setup
   - Battery: 5000 mAh
   - Special: Snapdragon 8 Gen 3 with native Galaxy AI.

2. **Apple iPhone 15 Pro**:
   - Price: ₹119,900
   - Screen: 15.49 cm (6.1 inch) Super Retina XDR
   - Body: High-strength Titanium Design with customizable Action Button.

👉 S24 Ultra excels in screen real-estate and zoom optics; iPhone 15 Pro offers refined pocketability and ProRes recording!`;
      } else if (query.includes("laptop") || query.includes("hp") || query.includes("gaming")) {
        const hp = products.find(p => p.id === "elec-03");
        fallbackText = hp 
          ? `I highly recommend the **${hp.title}**!
          
• **Specs**: Intel Core i5 12th Gen, 16GB RAM, 512GB SSD.
• **GPU**: Dedicated NVIDIA GeForce RTX 3050.
• **Price**: ₹${hp.price.toLocaleString()} (Regularly ₹${hp.originalPrice.toLocaleString()}).
• **Rating**: 4.4 / 5 Stars.

Would you like me to open this laptop details page for you?`
          : "We have awesome HP laptops with Intel Core i5 and RTX graphics available in the Electronics section under ₹57,000.";
      } else if (query.includes("under") || query.includes("30000") || query.includes("30,000")) {
        fallbackText = `Here are the top products under ₹30,000:
        
• **SONY WH-1000XM5 Headphones**: Industry-leading ANC for **₹29,990**.
• **Puma Track Racer Sneakers**: Just **₹1,999** (save 50%).
• **Wipro Smart WiFi LED Bulb**: RGB colors for only **₹699**.
• **Solimo Microfiber Comforter**: Reversible design for **₹1,199**.`;
      } else if (query.includes("shoe") || query.includes("shoes") || query.includes("nike") || query.includes("puma")) {
        fallbackText = `We feature awesome original footwear in our catalog:
        
1. **Nike Air Max Running Shoes**: Visible Air Max heel cushioning, Volt Red color. Price: **₹6,499** (Rating: 4.5/5)
2. **Puma Track Racer Sneakers**: Super lightweight step-in comfort. Price: **₹1,999** (Rating: 4.3/5)

Check them out in the **Fashion** category!`;
      } else if (query.includes("dyson") || query.includes("vacuum") || query.includes("warranty")) {
        fallbackText = `The **Dyson V11 Absolute Cordless Vacuum Cleaner** is priced at **₹49,900** (saved ₹10,000) and comes with:
        
• **Warranty**: 2 Years Dyson India Manufacturer Warranty.
• **Highlights**: 60 Minutes run time on Eco mode, advanced whole-machine HEPA filtration, and auto floor adaptation.
• **Return Policy**: 7 Days Easy Replacements!`;
      } else {
        fallbackText = `I have received your question: "${text}". 
        
We have fantastic deals on Mobiles (Samsung S24, iPhone 15), Electronics (Sony XM5, HP Victus Laptop, iPad Air), Fashion (Roadster Cotton Shirts, Nike Air Max, Puma Sneakers), and Home/Appliances (LG Refrigerator, Dyson Vacuum, the Wipro Smart LED lights). 

Feel free to browse using the visual category filters at the top!`;
      }

      // Simulate a smart bot delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
      }, 700);

      return; // end fallback
    }

    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="assistant-floating-drawer">
      {/* Floating launcher trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-[#2874f0] hover:bg-blue-600 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 animate-bounce cursor-pointer transition transform hover:scale-105"
          id="assistant-open-btn"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-sm whitespace-nowrap">
            Ask Gemini Assistant
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ff6161] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono">
              !
            </span>
          )}
        </button>
      )}

      {/* Expanded Chat container */}
      {isOpen && (
        <div 
          className="bg-white rounded-xl shadow-2xl border border-gray-100 w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-[20px] duration-300"
          id="assistant-chat-window"
        >
          {/* Header */}
          <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Gemini Assistant</h4>
                <p className="text-[10px] text-blue-105 font-bold uppercase tracking-wider">Flipkart Smart Copilot</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded transition text-white/80 hover:text-white cursor-pointer"
              id="assistant-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div 
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
                >
                  <div 
                    className={`max-w-[85%] rounded-xl p-3.5 text-xs shadow-sm leading-relaxed ${
                      isUser
                        ? "bg-[#2874f0] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100 whitespace-pre-line"
                    }`}
                  >
                    {/* Message content */}
                    {m.text}
                    
                    {/* Timestamp */}
                    <div className={`text-[9px] mt-1.5 font-semibold text-right ${isUser ? "text-white/60" : "text-gray-400"}`}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white rounded-xl rounded-tl-none p-3 border border-gray-100 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#2874f0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-[#2874f0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-[#2874f0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Prompts Row if input is empty */}
          {inputValue === "" && (
            <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none shrink-0" id="chat-presets-list">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePresetClick(prompt)}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:border-blue-500 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 text-center shrink-0"
                >
                  <HelpCircle className="w-3 h-3 text-[#2874f0]" />
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about products, specs, deals..."
              disabled={isLoading}
              className="flex-1 bg-gray-50 text-xs text-gray-900 border border-gray-250 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] rounded px-3.5 py-2.5 focus:outline-none placeholder-gray-450"
              id="assistant-chat-input-field"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-[#2874f0] hover:bg-blue-600 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-lg transition shrink-0 cursor-pointer shadow"
              id="assistant-chat-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
