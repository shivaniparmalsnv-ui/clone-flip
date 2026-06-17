/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "../types";

export const PRODUCT_CATEGORIES = [
  "All",
  "Mobiles",
  "Electronics",
  "Fashion",
  "Home",
  "Appliances"
];

export const BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Realme",
  "Puma",
  "Nike",
  "Roadster",
  "HP",
  "Wipro",
  "Dyson",
  "LG"
];

export const PRODUCTS: Product[] = [
  {
    id: "mob-01",
    title: "SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)",
    category: "Mobiles",
    price: 129999,
    originalPrice: 144999,
    rating: 4.7,
    ratingCount: 12450,
    reviewCount: 1120,
    brand: "Samsung",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "12 GB RAM | 256 GB ROM",
      "17.27 cm (6.8 inch) Quad HD+ Display",
      "200MP + 50MP + 12MP + 10MP Camera",
      "5000 mAh Lithium Ion Battery",
      "Snapdragon 8 Gen 3 Processor"
    ],
    specifications: {
      "Model Name": "Galaxy S24 Ultra",
      "Color": "Titanium Gray",
      "Display Size": "17.27 cm (6.8 inch)",
      "Resolution": "3120 x 1440 Pixels",
      "Primary Camera": "200 MP + 50 MP + 12 MP + 10 MP",
      "Secondary Camera": "12 MP Front Camera",
      "Processor Type": "Snapdragon 8 Gen 3 Mobile Platform",
      "Battery Capacity": "5000 mAh",
      "Warranty": "1 Year Manufacturer Warranty for Phone"
    },
    offers: [
      "Bank Offer: 10% instant discount on Axis Bank Credit Cards, up to ₹1,500.",
      "Special Price: Get extra ₹15,000 off (price inclusive of cashback/coupon).",
      "No Cost EMI: Avail interest-free EMIs starting from ₹21,666/month."
    ],
    stock: 8
  },
  {
    id: "mob-02",
    title: "Apple iPhone 15 Pro (Natural Titanium, 128 GB)",
    category: "Mobiles",
    price: 119900,
    originalPrice: 134900,
    rating: 4.8,
    ratingCount: 8850,
    reviewCount: 940,
    brand: "Apple",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "128 GB ROM",
      "15.49 cm (6.1 inch) Super Retina XDR Display",
      "48MP + 12MP + 12MP Camera",
      "A17 Pro Chip with 6 Core GPU",
      "Titanium Design with Action Button"
    ],
    specifications: {
      "Model Name": "iPhone 15 Pro",
      "Color": "Natural Titanium",
      "Display Size": "15.49 cm (6.1 inch)",
      "Resolution": "2556 x 1179 Pixels",
      "Primary Camera": "48 MP + 12 MP + 12 MP",
      "Secondary Camera": "12 MP Front",
      "Processor Type": "A17 Pro Chip",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    offers: [
      "Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.",
      "Partner Offer: Sign up for Flipkart Pay Later & get dynamic flight coupon worth ₹1,000."
    ],
    stock: 5
  },
  {
    id: "elec-01",
    title: "SONY WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    category: "Electronics",
    price: 29990,
    originalPrice: 34990,
    rating: 4.6,
    ratingCount: 3410,
    reviewCount: 382,
    brand: "Sony",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Industry-leading Noise Cancellation with Auto NC Optimizer",
      "Up to 30 Hours Battery Life for All-day wireless play",
      "Crystal Clear Hands-free calling with 4 beamforming mics",
      "Multipoint Connection: Switch seamlessly between 2 devices"
    ],
    specifications: {
      "Model Name": "WH-1000XM5",
      "Color": "Black",
      "Headphone Type": "Over the Ear",
      "Connectivity": "Bluetooth v5.2",
      "Deep Bass": "Yes",
      "With Microphone": "Yes",
      "Battery Life": "30 hr",
      "Warranty": "1 Year Domestic Warranty"
    },
    offers: [
      "Bank Offer: Flat ₹3,000 Instant Discount on HDFC Bank Credit Cards.",
      "Freebie: 3 Months YouTube Premium Subscription Free with this purchase."
    ],
    stock: 12
  },
  {
    id: "elec-02",
    title: "Apple iPad Air (M2, Wi-Fi, 128 GB, Space Gray)",
    category: "Electronics",
    price: 54900,
    originalPrice: 59900,
    rating: 4.7,
    ratingCount: 1120,
    reviewCount: 98,
    brand: "Apple",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "8 GB RAM | 128 GB ROM",
      "27.94 cm (11 inch) Liquid Retina Display",
      "12 MP Rear Camera | 12 MP Ultra Wide Front",
      "Apple M2 Chip for powerful multi-tasking",
      "Supports Apple Pencil Pro and Magic Keyboard"
    ],
    specifications: {
      "Model Name": "iPad Air (M2)",
      "Color": "Space Gray",
      "Display Size": "27.94 cm (11 inch)",
      "Operating System": "iPadOS 17",
      "Connectivity": "Wi-Fi Only",
      "Processor": "Apple M2 Chip",
      "Warranty": "1 Year Warranty"
    },
    offers: [
      "Special Discount: Flat ₹5,000 off on Student ID proof submission.",
      "Bank Offer: Extra ₹1,500 off on select Credit Cards."
    ],
    stock: 7
  },
  {
    id: "elec-03",
    title: "HP Victus Intel Core i5 12th Gen (16GB RAM/512GB SSD) Gaming Laptop",
    category: "Electronics",
    price: 56990,
    originalPrice: 71500,
    rating: 4.4,
    ratingCount: 4320,
    reviewCount: 410,
    brand: "HP",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Intel Core i5-12450H 12th Gen Processor",
      "16 GB DDR4 RAM | 512 GB NVMe SSD",
      "4 GB Dedicated NVIDIA GeForce RTX 3050 GPU",
      "39.62 cm (15.6 inch) FHD 144Hz Refresh Rate Display",
      "Windows 11 Home & MS Office Pre-installed"
    ],
    specifications: {
      "Model Name": "Victus 15-faxxxx",
      "Color": "Performance Blue",
      "Processor Name": "Intel Core i5 (12th Gen)",
      "RAM": "16 GB DDR4",
      "SSD Capacity": "512 GB",
      "Graphic Processor": "NVIDIA GeForce RTX 3050",
      "Screen Size": "39.62 cm (15.6 inch)",
      "Operating System": "Windows 11 Home",
      "Warranty": "1 Year Onsite Warranty"
    },
    offers: [
      "No Cost EMI: Play later with up to 9 months No Cost EMI plans.",
      "Bundle Offer: Buy laptop & get Gaming Mouse at just ₹299."
    ],
    stock: 4
  },
  {
    id: "fash-01",
    title: "Roadster Men Solid Cotton Casual Shirt (Navy Blue)",
    category: "Fashion",
    price: 499,
    originalPrice: 1299,
    rating: 4.1,
    ratingCount: 22400,
    reviewCount: 2450,
    brand: "Roadster",
    isFAssured: false,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Fabric: 100% Breathable Combed Cotton",
      "Sleeve: Full Sleeve | Slim Fit Cut",
      "Pattern: Solid Deep Navy Minimalist Design",
      "Collar: Standard Spread Dress Collar"
    ],
    specifications: {
      "Type": "Casual Shirts",
      "Sleeve": "Full Sleeve",
      "Fit": "Slim Fit",
      "Fabric": "Pure Cotton",
      "Pattern": "Solid",
      "Reversible": "No",
      "Fabric Care": "Gentle Machine Wash with Like Colors"
    },
    offers: [
      "Buy 2 Get 10% Off | Buy 3 Get 15% Off across Roadster selected apparel.",
      "Special Promo: Extra ₹50 off for first-time apparel shoppers."
    ],
    stock: 50
  },
  {
    id: "fash-02",
    title: "Puma Track Racer Casual Sneakers (White & Black)",
    category: "Fashion",
    price: 1999,
    originalPrice: 3999,
    rating: 4.3,
    ratingCount: 15480,
    reviewCount: 1280,
    brand: "Puma",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Vibrant White Synthetic Upper with Signature Puma Stripes",
      "Cushioned SoftFoam+ Sockliner for instant step-in comfort",
      "Durable non-slip Rubber Outsole for firm road grip",
      "Lightweight construct suitable for sports or daily wear"
    ],
    specifications: {
      "Type": "Sneakers",
      "Color": "White / Puma Black",
      "Sole Material": "Rubber",
      "Insole Type": "SoftFoam+ Cushioned",
      "Weight": "280g (Single Shoe)",
      "Warranty": "3 Months Manufacturer Warranty"
    },
    offers: [
      "Flat 50% Off during our Flipkart Big Billion Days preview.",
      "Card Offer: Save ₹150 with Rupay Debit Cards."
    ],
    stock: 25
  },
  {
    id: "fash-03",
    title: "Nike Air Max Sports Running Shoes (Volt Red)",
    category: "Fashion",
    price: 6499,
    originalPrice: 9999,
    rating: 4.5,
    ratingCount: 2210,
    reviewCount: 184,
    brand: "Nike",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Max Air unit in the heel delivers incredible reactive cushioning",
      "Engineered mesh upper is light, airy and highly flexible",
      "Flywire cables integrate with laces for customizable lock-down fit",
      "Translucent rubber waffle sole for multi-surface traction"
    ],
    specifications: {
      "Type": "Running / Sports Shoes",
      "Color": "Volt Red / Metallic Silver",
      "Sole Material": "Waffle Rubber",
      "Cushioning Technology": "Visible Air Max unit",
      "Upper Material": "Engineered Breathable Mesh",
      "Warranty": "6 Months Manufacturer Warranty"
    },
    offers: [
      "Bank Offer: 10% instant discount on Axis Bank Card.",
      "Exchange Bonus: Get up to ₹500 off in exchange for old active shoes."
    ],
    stock: 15
  },
  {
    id: "home-01",
    title: "Solimo Reversible Microfiber Single Comforter (Aqua & Olive)",
    category: "Home",
    price: 1199,
    originalPrice: 2499,
    rating: 4.2,
    ratingCount: 38400,
    reviewCount: 4210,
    brand: "Wipro",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Single Comforter size: 150 cm x 230 cm (59 x 90 inches)",
      "200 GSM hollow siliconized polyester filling maintains warmth",
      "Made with 100% brushed microfiber shell for super soft feels",
      "Hypoallergenic material protects against allergens, dust mites"
    ],
    specifications: {
      "Size": "Single",
      "Material": "Brushed Microfiber Shell",
      "GSM": "200 GSM",
      "Fill Material": "Hollow Siliconized Polyester",
      "Machine Washable": "Yes, on gentle cycles",
      "Theme / Color": "Aqua Blue & Olive Green Reversible"
    },
    offers: [
      "Combo offer: Buy along with two pillows sheet set & get extra ₹200 off."
    ],
    stock: 45
  },
  {
    id: "home-02",
    title: "Wipro Nexxt 9W Smart WiFi Multipack LED Bulb (RGB + White)",
    category: "Home",
    price: 699,
    originalPrice: 1999,
    rating: 4.3,
    ratingCount: 15990,
    reviewCount: 1150,
    brand: "Wipro",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Control from anywhere using the Wipro Smart Home App",
      "16 Million Color options (RGB) + Warm White/Cool Day Light",
      "Compatible with Amazon Alexa and Google Assistant Voice Controls",
      "Schedules & Timers: Auto turn on/off based on routines",
      "No separate Hub required - directly connects to 2.4 GHz WiFi"
    ],
    specifications: {
      "Type": "Smart LED Bulb",
      "Base Type": "B22",
      "Wattage": "9 W",
      "Color Temperature": "2700K - 6500K Dual Mode",
      "Luminous Flux": "810 lm",
      "Dimmable": "Yes via App or Voice command",
      "Warranty": "2 Years Manufacturer Warranty"
    },
    offers: [
      "No cost EMI on purchases above ₹1,000 using select credit accounts.",
      "Combo discount: Buy pack of 2 for ₹1,199 (Save extra ₹199)."
    ],
    stock: 30
  },
  {
    id: "app-01",
    title: "Dyson V11 Absolute Cordless Vacuum Cleaner (Blue/Satin)",
    category: "Appliances",
    price: 49900,
    originalPrice: 59900,
    rating: 4.6,
    ratingCount: 940,
    reviewCount: 104,
    brand: "Dyson",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Twice the suction of any other cordless vacuum cleaner",
      "Intellectually senses & adapts to different floor surfaces automatically",
      "LCD Screen displays remaining run-time, filter maintenance alerts",
      "Up to 60 Minutes fade-free floor cleaning on Eco Mode",
      "Advanced whole-machine HEPA filtration traps 99.99% of dust particles"
    ],
    specifications: {
      "Type": "Stick/Handheld Cordless Vacuum",
      "Suction Power": "185 Air Watts",
      "Dust Container Capacity": "0.76 Liters",
      "Weight": "2.97 kg",
      "Charging Time": "4.5 hours",
      "Filter Type": "Washable Lifetime HEPA Filter",
      "Warranty": "2 Years Dyson India Warranty"
    },
    offers: [
      "Virtual Demo: Request a free in-home live demo on successful order.",
      "Card Offer: Direct ₹4,000 off using any Premium Credit Card."
    ],
    stock: 6
  },
  {
    id: "app-02",
    title: "LG 322 L Smart Inverter Frost Free Double Door Refrigerator",
    category: "Appliances",
    price: 36490,
    originalPrice: 45990,
    rating: 4.4,
    ratingCount: 6150,
    reviewCount: 540,
    brand: "LG",
    isFAssured: true,
    image: "https://images.unsplash.com/photo-1571175480796-49932ad923b5?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Capacity: 322 Liters, suitable for progressive families of 3-5 members",
      "Smart Inverter Compressor: Energy efficient, less noise & highly durable",
      "3-Star BEE Rating: Consume up to 35% less power",
      "Door Cooling+ delivers faster cooling to door storage pockets",
      "Smart Diagnosis: Troubleshoot any minor issues via app connection"
    ],
    specifications: {
      "Model Name": "GL-T382VESP",
      "Capacity": "322 Liters",
      "Defrosting Type": "Frost Free Frost Control",
      "Compressor Type": "Smart Inverter Compressor",
      "Number of Doors": "2 Door",
      "BEE Star Rating": "3 Star",
      "Stabilizer Required": "No, runs on built-in stabilizer range (100V-310V)",
      "Warranty": "1 Year on Product, 10 Years on Smart Compressor"
    },
    offers: [
      "Special Deal: Free Standard Unboxing and Installation within 24 Hours.",
      "Exchange Value: Up to ₹4,500 off on returning your old refrigerator."
    ],
    stock: 3
  }
];
