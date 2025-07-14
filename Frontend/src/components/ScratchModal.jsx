 import React from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const ScratchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    onClose(); // close the modal first
    navigate("/products"); // navigate to shopping page
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <Dialog.Title className="text-2xl font-bold text-center text-pink-600 mb-4">
            🎉 You've Earned a Reward!
          </Dialog.Title>

          <div className="text-center text-lg text-gray-800 mb-6">
            💰 Congratulations! You just unlocked a <span className="text-green-600 font-semibold">₹50 Coupon</span> on your next order.
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleShopNow}
              className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-700 transition duration-300"
            >
              🛍️ Shop Now & Use Reward
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ScratchModal;
