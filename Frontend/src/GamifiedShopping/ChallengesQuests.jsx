 import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChallengesQuests = ({ userId }) => {
  const [challengeData, setChallengeData] = useState(null);
  const navigate = useNavigate();

  const fetchChallengeStatus = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/challenges/get",
        { userId }
      );
      setChallengeData(data);
    } catch (error) {
      console.error("Error fetching challenge status:", error);
      toast.error("Unable to load challenge data.");
    }
  };

  useEffect(() => {
    if (userId) {
      console.log("📥 ChallengesQuests mounted with userId:", userId);
      fetchChallengeStatus();
    }
  }, [userId]);

  const handleReviewProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/challenges/review-product", {
        userId,
      });
      fetchChallengeStatus();
      toast.success("🎯 Review progress updated!");
    } catch {
      toast.error("Failed to update review progress.");
    }
  };

  // const handleShareProduct = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/challenges/share-product", {
  //       userId,
  //     });
  //     fetchChallengeStatus();
  //     toast.success("🚀 Product shared!");
  //   } catch {
  //     toast.error("Failed to share product.");
  //   }
  // };

 

const handleShare = async () => {
  try {
    // Step 1: Trigger native share
    await navigator.share({
      title: 'UrbanEDGE Mart',
      text: 'Found this on UrbanEDGE Mart, have a look!',
      url: 'https://your-homepage-url.com/',  // 🔁 PUT YOUR HOMEPAGE LINK HERE
      // Example: 'https://urbanedgemart.vercel.app/'
    });

    // Step 2: Get JWT token from localStorage
    const token = localStorage.getItem('token'); // Make sure this token is stored on login

    // Step 3: Call backend to reward points
    await axios.post(
      '/api/challenges/share',
      {}, // No body needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
        },
      }
    );

    console.log("✅ Reward granted for sharing!");

  } catch (err) {
    console.error('❌ Error in handleShare:', err.response?.data || err.message);
  }
};




  const catCount = challengeData?.challenges?.categoriesPurchased ?? 0;
  const reviewCnt = challengeData?.challenges?.productsReviewed ?? 0;
  const sharedDone = challengeData?.challenges?.sharedOnSocial ?? false;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <ToastContainer />
      <h2 className="font-bold text-xl mb-4 text-black-600">Challenges & Quests</h2>

      <div className="space-y-4">
        {/* ✅ Go to Shop Challenge */}
        <Link to="/products?fromChallenge=category">
  <div className="cursor-pointer bg-pink-100 hover:bg-pink-300 transition-all duration-300 p-3 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md">
    <p className="font-medium text-pink-800">
      Buy from three different categories {catCount}/3 {catCount >= 3 && "✅"}
    </p>
    <p className="text-sm text-pink-700">Bonus Points</p>
  </div>
</Link>


        {/* Review Challenge */}
        <div
          onClick={handleReviewProduct}
          className="cursor-pointer bg-blue-100 hover:bg-blue-300 transition-all duration-300 p-4 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md"
        >
          <p className="font-medium text-blue-800">
            Review five products {reviewCnt}/5 {reviewCnt >= 5 && "✅"}
          </p>
          <p className="text-sm text-blue-700">Bonus Points</p>
        </div>

        {/* Share Challenge */}
        <div
          onClick={handleShare}
          className="cursor-pointer bg-purple-100 hover:bg-purple-300 transition-all duration-300 p-4 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md"
        >
          <p className="font-medium text-purple-800">
            Share a product on social media {sharedDone ? "✅ Done" : ""}
          </p>
          <p className="text-sm text-purple-700">Bonus Points</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengesQuests;
