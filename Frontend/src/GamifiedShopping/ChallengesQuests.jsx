 


 export default function ChallengesQuests() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-bold text-xl mb-4 text-black-600">Challenges & Quests</h2>
      <div className="space-y-4">
        <div className="bg-pink-100 hover:bg-pink-300 transition-all duration-300 p-3 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md">
          <p className="font-medium text-pink-800">Buy from three different categories</p>
          <p className="text-sm text-pink-700">Bonus Points</p>
         
        </div>
        <div className="bg-blue-100 hover:bg-blue-300 transition-all duration-300 p-4 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md">
          <p className="font-medium text-blue-800">Review five products</p>
          <p className="text-sm text-blue-700">Bonus Points</p>
          
        </div>
        <div className="bg-purple-100 hover:bg-purple-300 transition-all duration-300 p-4 rounded-lg text-center transform hover:scale-[1.02] hover:shadow-md">
          <p className="font-medium text-purple-800">Share a product on social media</p>
          <p className="text-sm text-purple-700">Bonus Points</p>
        </div>
      </div>
    </div>
  );
}
