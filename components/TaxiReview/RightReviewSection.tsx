import React from 'react'
import { Taxiinterface } from './LeftReviewSection'

interface RightReviewSectionProps {
  taxi: Taxiinterface
}
const RightReviewSection = ({ taxi }: RightReviewSectionProps) => {
    return (
      /* On mobile: normal flow card. On lg+: sticky sidebar */
      <div className="lg:sticky lg:top-28 h-fit">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 border border-amber-100">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Fare Summary
          </h2>

          {/* Fare rows */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base Fare</span>
              <span className="font-medium text-gray-800">
                ₹{taxi.basePrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span className="font-medium text-green-600">Included</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Extra km charge</span>
              <span className="font-medium text-gray-800">As applicable</span>
            </div>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="flex justify-between font-semibold text-base sm:text-lg">
            <span>Total</span>
            <span className="text-amber-600">
              Dist × ₹{taxi.basePrice.toLocaleString("en-IN")}
            </span>
          </div>

          {/* CTA */}
          <button
            type="submit"
            form="taxi-booking-form"
            className="mt-5 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:brightness-105 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            Confirm Booking
          </button>

          <p className="text-xs text-center text-gray-400 mt-3">
            Safe &amp; Secure Payments
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 mt-5 text-[11px] sm:text-xs text-center text-gray-600">
            <div className="bg-amber-50 rounded-lg sm:rounded-xl p-2 leading-tight">
              🔒
              <br />
              Secure
            </div>
            <div className="bg-amber-50 rounded-lg sm:rounded-xl p-2 leading-tight">
              💸
              <br />
              No Hidden Charges
            </div>
            <div className="bg-amber-50 rounded-lg sm:rounded-xl p-2 leading-tight">
              📞
              <br />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    );
}

export default RightReviewSection