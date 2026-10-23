import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTruck, FaShieldAlt, FaCreditCard } from 'react-icons/fa';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Cart Totals</h3>
            
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="font-medium">{currency}{delivery_fee}.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-orange-500">{currency}{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-gray-50">
                        <div className="flex justify-center text-orange-500 mb-2">
                            <FaTruck size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Free Shipping</p>
                        <p className="text-xs text-gray-500">On orders over $50</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                        <div className="flex justify-center text-orange-500 mb-2">
                            <FaShieldAlt size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Secure Payment</p>
                        <p className="text-xs text-gray-500">100% protected</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                        <div className="flex justify-center text-orange-500 mb-2">
                            <FaCreditCard size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Easy Returns</p>
                        <p className="text-xs text-gray-500">Within 30 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;