/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, ShieldCheck, CreditCard, ChevronRight, MapPin, Smartphone, CheckCircle, Info, Truck } from "lucide-react";
import { CartItem, Address, PaymentDetails } from "../types";

interface CheckoutViewProps {
  cartItems: CartItem[];
  onPlaceOrder: (address: Address, payment: PaymentDetails) => void;
  onCancelCheckout: () => void;
}

const DEFAULT_ADDRESS: Address = {
  fullName: "Shivani Parmar",
  phoneNumber: "9876543210",
  pincode: "400011",
  state: "Maharashtra",
  addressLines: "12, Grand View Residency, Worli",
  locality: "Near Royal Gardens",
  addressType: "home"
};

export default function CheckoutView({
  cartItems,
  onPlaceOrder,
  onCancelCheckout
}: CheckoutViewProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Delivery Address, 2: Payment options
  
  // Form states initialized with pre-populated values for seamless testing
  const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);
  const [payment, setPayment] = useState<PaymentDetails>({
    method: "upi",
    upiId: "shivaniparmar@okhdfcbank",
    cardNumber: "4532 7114 8820 9410",
    cardExpiry: "09/30",
    cardCVV: "123"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculations
  const totalOriginalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.originalPrice * curr.quantity,
    0
  );
  
  const totalFinalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const discountAmount = totalOriginalPrice - totalFinalPrice;
  const platformFee = 49;
  const deliveryCharges = totalFinalPrice > 500 ? 0 : 40;
  const grandTotal = totalFinalPrice + platformFee + deliveryCharges;

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = "Full Name is required";
    if (!address.phoneNumber.trim() || address.phoneNumber.length < 10) {
      errors.phoneNumber = "Valid 10-digit Phone Number is required";
    }
    if (!address.pincode.trim() || address.pincode.length !== 6) {
      errors.pincode = "Valid 6-digit pincode is required";
    }
    if (!address.state.trim()) errors.state = "State is required";
    if (!address.addressLines.trim()) errors.addressLines = "Building No., Street is required";
    if (!address.locality.trim()) errors.locality = "Locality is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateAddress()) {
      setStep(2);
    }
  };

  const handleSubmitOrder = () => {
    onPlaceOrder(address, payment);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6" id="checkout-view-box">
      {/* Left Columns - Steps (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        {/* Step progress indicators */}
        <div className="bg-white rounded-lg border border-gray-150 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs select-none ${
              step === 1 ? "bg-[#2874f0] text-white" : "bg-green-600 text-white"
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span className="text-sm font-bold text-gray-800">Delivery Address</span>
          </div>
          <div className="h-[2px] bg-gray-200 flex-1 mx-4 max-w-[200px]" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs select-none ${
              step === 2 ? "bg-[#2874f0] text-white" : "bg-gray-100 text-gray-400 border border-gray-200"
            }`}>
              2
            </div>
            <span className={`text-sm font-bold ${step === 2 ? "text-gray-800" : "text-gray-450"}`}>
              Secure Payment Method
            </span>
          </div>
        </div>

        {/* STEP 1: Address Details Form */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6" id="address-step-form">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-105 pb-3">
              Shipping & Delivery Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Shivani Parmar"
                  id="checkout-fullName-input"
                />
                {formErrors.fullName && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.fullName}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">Phone Number</label>
                <input
                  type="text"
                  maxLength={10}
                  value={address.phoneNumber}
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-mono"
                  placeholder="10-digit mobile number"
                  id="checkout-phoneNumber-input"
                />
                {formErrors.phoneNumber && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.phoneNumber}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">Pincode</label>
                <input
                  type="text"
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-mono"
                  placeholder="6-digit pincode"
                  id="checkout-pincode-input"
                />
                {formErrors.pincode && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.pincode}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">State</label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="e.g. Maharashtra"
                  id="checkout-state-input"
                />
                {formErrors.state && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.state}</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">Flat, House No., Building Name, Street</label>
                <textarea
                  rows={2}
                  value={address.addressLines}
                  onChange={(e) => setAddress({ ...address, addressLines: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Complete postal address Details"
                  id="checkout-addressLines-input"
                />
                {formErrors.addressLines && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.addressLines}</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase block mb-1">Locality / Landmark</label>
                <input
                  type="text"
                  value={address.locality}
                  onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Famous market, school or park nearby"
                  id="checkout-locality-input"
                />
                {formErrors.locality && (
                  <span className="text-xs text-red-500 font-bold block mt-1">{formErrors.locality}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-gray-400 uppercase block">Address Type</span>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAddress({ ...address, addressType: "home" })}
                  className={`px-4 py-2 text-xs font-bold rounded cursor-pointer border ${
                    address.addressType === "home"
                      ? "bg-[#2874f0]/10 border-[#2874f0] text-blue-700"
                      : "border-gray-250 text-gray-600 hover:bg-gray-50"
                  }`}
                  id="chk-addr-home"
                >
                  Home (All day delivery)
                </button>
                <button
                  type="button"
                  onClick={() => setAddress({ ...address, addressType: "work" })}
                  className={`px-4 py-2 text-xs font-bold rounded cursor-pointer border ${
                    address.addressType === "work"
                      ? "bg-[#2874f0]/10 border-[#2874f0] text-blue-700"
                      : "border-gray-250 text-gray-600 hover:bg-gray-50"
                  }`}
                  id="chk-addr-work"
                >
                  Work (Oft 9 AM - 5 PM)
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <button
                type="button"
                onClick={onCancelCheckout}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                id="cancel-chkot-btn-1"
              >
                Back to Cart
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#fb641b] hover:bg-[#f25a12] text-white px-8 py-3 rounded-md font-extrabold text-sm shadow flex items-center gap-1 cursor-pointer transition transform hover:scale-[1.01]"
                id="continue-to-payment-btn"
              >
                CONTINUE TO PAYMENT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Secure Payment Options */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6" id="payment-step-form">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-105 pb-3">
              Select Your Secure Payment Method
            </h3>

            <div className="space-y-4">
              {/* UPI option */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  payment.method === "upi" ? "border-[#2874f0] bg-[#2874f0]/5" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPayment({ ...payment, method: "upi" })}
                id="pm-upi-wrapper"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    payment.method === "upi" ? "border-[#2874f0]" : "border-gray-300"
                  }`}>
                    {payment.method === "upi" && <div className="w-2.5 h-2.5 rounded-full bg-[#2874f0]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Unified Payments Interface (UPI)</p>
                    <p className="text-xs text-gray-400 font-semibold">Pay instantly via secure bank networks</p>
                  </div>
                </div>

                {payment.method === "upi" && (
                  <div className="mt-4 pl-8 space-y-2 max-w-sm animate-in fade-in slide-in-from-top-1 duration-200">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Enter Virtual Payment Address (UPI ID)</label>
                    <input
                      type="text"
                      className="w-full text-sm font-bold px-3 py-2 border border-gray-300 rounded font-mono focus:outline-blue-500 text-gray-800"
                      value={payment.upiId}
                      onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                      placeholder="e.g. shivani@okhdfc"
                      id="upi-id-input"
                    />
                  </div>
                )}
              </div>

              {/* Credit/Debit Card Option */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  payment.method === "card" ? "border-[#2874f0] bg-[#2874f0]/5" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPayment({ ...payment, method: "card" })}
                id="pm-card-wrapper"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    payment.method === "card" ? "border-[#2874f0]" : "border-gray-300"
                  }`}>
                    {payment.method === "card" && <div className="w-2.5 h-2.5 rounded-full bg-[#2874f0]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                      Credit / Debit / ATM Card
                      <CreditCard className="w-4 h-4 text-gray-500" />
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">We accept RuPay, Visa, Mastercard & Maestro cards</p>
                  </div>
                </div>

                {payment.method === "card" && (
                  <div className="mt-4 pl-8 grid grid-cols-3 gap-3 max-w-md animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="col-span-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase">Card Number</label>
                      <input
                        type="text"
                        className="w-full text-sm font-bold px-3 py-2 border border-gray-300 rounded font-mono focus:outline-blue-500 text-gray-800"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                        placeholder="16-digit card number"
                        id="card-number-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase">Expiry Date</label>
                      <input
                        type="text"
                        maxLength={5}
                        className="w-full text-sm font-bold px-3 py-2 border border-gray-300 rounded font-mono focus:outline-blue-500 text-gray-800"
                        value={payment.cardExpiry}
                        onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                        placeholder="MM/YY"
                        id="card-expiry-input"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        className="w-full text-sm font-bold px-3 py-2 border border-gray-300 rounded font-mono focus:outline-blue-500 text-gray-800"
                        value={payment.cardCVV}
                        onChange={(e) => setPayment({ ...payment, cardCVV: e.target.value })}
                        placeholder="123"
                        id="card-cvv-input"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cash On Delivery option */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  payment.method === "cod" ? "border-[#2874f0] bg-[#2874f0]/5" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPayment({ ...payment, method: "cod" })}
                id="pm-cod-wrapper"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    payment.method === "cod" ? "border-[#2874f0]" : "border-gray-300"
                  }`}>
                    {payment.method === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#2874f0]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Cash on Delivery (COD)</p>
                    <p className="text-xs text-gray-400 font-semibold">Pay with cash or QR code when shipment arrives</p>
                  </div>
                </div>

                {payment.method === "cod" && (
                  <div className="mt-3 pl-8 text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded.5 border border-amber-200 flex items-start gap-1.5 max-w-lg">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Please ensure precise cash of ₹{grandTotal.toLocaleString()} ready on shipment day. A representative will ping prior to arrival.</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                id="back-to-address-btn"
              >
                Back to Address
              </button>
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="bg-[#fb641b] hover:bg-[#f25a12] text-white px-8 py-3.5 rounded-md font-black text-sm shadow-lg flex items-center gap-1.5 cursor-pointer transition transform hover:scale-[1.01]"
                id="submit-secured-order-btn"
              >
                <ShieldCheck className="w-5 h-5" />
                SECURELY CONFIRM ORDER
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Order brief summary details (1 col) */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-105 shadow-sm p-5 space-y-6">
          <h3 className="text-xs font-black uppercase text-gray-450 tracking-wider">Order Brief</h3>

          <div className="space-y-4">
            {/* Minimal Item recap */}
            <div className="space-y-2 border-b border-gray-100 pb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3 text-xs text-gray-600 font-bold">
                  <span className="text-gray-800 truncate flex-1">{item.product.title}</span>
                  <span className="text-gray-400 shrink-0">Qty: {item.quantity}</span>
                  <span className="text-gray-800 font-mono shrink-0">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Summary lines */}
            <div className="space-y-2 text-sm text-gray-600 font-semibold border-b border-gray-150 pb-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono">₹{totalOriginalPrice.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount Savings</span>
                  <span className="font-mono">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-green-650">
                  {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform Assurance</span>
                <span>₹{platformFee}</span>
              </div>
            </div>

            {/* Absolute total */}
            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1">
              <span>Grand Total</span>
              <span className="text-lg font-black font-mono text-blue-700">₹{grandTotal.toLocaleString()}</span>
            </div>

            {/* Address Preview */}
            {step === 2 && (
              <div className="bg-slate-50 p-3.5 rounded border border-gray-100 text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  Delivery Destination
                </p>
                <p className="font-semibold text-gray-700">{address.fullName} ({address.phoneNumber})</p>
                <p className="text-gray-500 leading-snug">{address.addressLines}, {address.locality}, {address.state} - {address.pincode}</p>
              </div>
            )}

            {/* Safe Seal */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-center text-[10px] text-gray-405 font-black uppercase">
              <ShieldCheck className="w-5 h-5 text-green-650 shrink-0" />
              <span>Full Flipkart Security Protected Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
