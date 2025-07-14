 import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ✅ Correct
import ScratchModal from "../components/ScratchModal";



const ChallengesQuests = ({ userId }) => {
  const [challengeData, setChallengeData] = useState(null);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [rewarded, setRewarded] = useState(false);
  const navigate = useNavigate();

  const fetchChallengeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/challenges/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChallengeData(data);
    } catch (error) {
      console.error("Error fetching challenge status:", error);
      toast.error("Unable to load challenge data.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChallengeStatus();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchChallengeStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId]);

  const catCount = challengeData?.challenges?.categoriesPurchased ?? 0;
  const reviewCnt = challengeData?.challenges?.productsReviewed ?? 0;
  const sharedDone = challengeData?.challenges?.sharedOnSocial ?? false;
  const pointsEarned = challengeData?.pointsEarned ?? 0;

  // 🎯 Trigger Scratch Card when reviews = 5
  useEffect(() => {
    const alreadyRewarded = localStorage.getItem("scratchRewardGiven");

    if (reviewCnt >= 5 && !alreadyRewarded && !rewarded) {
      setShowScratchCard(true);
      localStorage.setItem("scratchRewardGiven", "true");
      setRewarded(true);
    }
  }, [reviewCnt, rewarded]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <ToastContainer />
      <h2 className="font-bold text-xl mb-4 text-black">Challenges & Quests</h2>

      <div className="space-y-4">
        {/* ✅ Category Purchase Challenge */}
        
        <Link to="/products?fromChallenge=category">
  <div className="cursor-pointer bg-pink-100 p-4 rounded-lg text-center shadow-3xl ring-0 hover:ring-0 hover:shadow-pink-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300">
    <p className="font-medium text-pink-800">
      Buy from three different categories {catCount}/3 {catCount >= 3 && "✅"}
    </p>
    <p className="text-sm text-pink-700">
      {catCount >= 3 ? "+50 Bonus Points" : "Bonus Points"}
    </p>
  </div>
</Link>


        {/* ✅ Review Products Challenge */}
        <div
          onClick={() => navigate("/products?fromChallenge=review")}
          className="cursor-pointer bg-blue-100  p-4 rounded-lg text-center shadow-3xl ring-0  hover:ring-0 hover:shadow-blue-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300 "
        >
          <p className="font-medium text-blue-800">
            Review five products {reviewCnt}/3 {reviewCnt >= 3 && "✅"}
          </p>
          <p className="text-sm text-blue-700">
            {reviewCnt >= 3 ? "+50 Bonus Points" : "Bonus Points"}
          </p>
        </div>

        {/* ✅ Share Product Challenge */}
        <div
          onClick={() => navigate("/products?fromChallenge=share")}
          className="cursor-pointer bg-purple-100 p-4 rounded-lg text-center shadow-3xl ring-0  hover:ring-0 hover:shadow-purple-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300 "
        >
          <p className="font-medium text-purple-800">
            Share a product on social media {sharedDone ? "✅ Done" : ""}
          </p>
          <p className="text-sm text-purple-700">
            {sharedDone ? "+50 Bonus Points" : "Bonus Points"}
          </p>
        </div>

        {/* ✅ Total Points Display */}
        <div className="text-right text-sm text-gray-600 italic pt-2">
          Total Earned: {pointsEarned} Points
        </div>
      </div>

      {/* 🎁 Scratch Card Reward Modal */}
      <ScratchModal
        isOpen={showScratchCard}
        onClose={() => setShowScratchCard(false)}
      />
    </div>
  );
};

export default ChallengesQuests;


// bg-blue-100 hover:bg-blue-300 transition-all duration-300 p-4 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md