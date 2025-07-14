// import React from "react";
// import { toast } from "react-toastify";

// const ShareRewardCard = ({ userId, productId }) => {
//   const handleShare = async () => {
//     const shareUrl = `${window.location.origin}/product/${productId}`;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Check this product!",
//           text: "Found something amazing on Walmart Clone!",
//           url: shareUrl,
//         });

//         // OPTIONAL: Add bonus points on share
//         const response = await fetch("http://localhost:5000/api/user/share", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId }),
//         });

//         const data = await response.json();
//         toast.success(data.message || "Bonus points added!");
//       } catch (err) {
//         toast.error("Sharing cancelled or failed.");
//       }
//     } else {
//       toast.error("Sharing not supported on this device.");
//     }
//   };

//   return (
//     <div className="bg-purple-100 text-purple-800 p-4 rounded-xl text-center">
//       <p className="font-semibold">Share a product on social media</p>
//       <p className="text-sm">Bonus Points</p>
//       <button
//         onClick={handleShare}
//         className="mt-2 px-4 py-1 bg-purple-500 text-white rounded-full hover:bg-purple-600"
//       >
//         Share Now
//       </button>
//     </div>
//   );
// };

import React from "react";
import { toast } from "react-toastify";

const ShareRewardCard = ({ productId }) => {
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/product/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this product!",
          text: "Found something amazing on Walmart Clone!",
          url: shareUrl,
        });

        // ✅ Get JWT token
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("User not logged in.");
          return;
        }

        // ✅ Use correct reward route
        const response = await fetch("http://localhost:5000/api/challenges/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }), // optional
        });

        const data = await response.json();
        toast.success(data.message || "Bonus points added!");
      } catch (err) {
        toast.error("Sharing cancelled or failed.");
      }
    } else {
      toast.error("Sharing not supported on this device.");
    }
  };

  return (
    <div className="bg-purple-100 text-purple-800 p-4 rounded-xl text-center">
      <p className="font-semibold">Share a product on social media</p>
      <p className="text-sm">Bonus Points</p>
      <button
        onClick={handleShare}
        className="mt-2 px-4 py-1 bg-purple-500 text-white rounded-full hover:bg-purple-600"
      >
        Share Now
      </button>
    </div>
  );
};

export default ShareRewardCard;

