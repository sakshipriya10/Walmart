 import augmentedReality from "../assets/augmentedReality.jpg"

  export default function AugmentedReality() {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md h-150 w-200">
      <h2 className="font-bold text-xl mb-4">Augmented Reality</h2>
      <div className="border rounded overflow-hidden">
        <img src={augmentedReality} alt="AR Setup" className="w-full h-32 object-cover " />
        <div className="flex justify-around p-2 text-gray-600 ">
          <button className="hover:scale-[1.02] hover:shadow-md bg-gray-100">👍</button>
          <button className="hover:scale-[1.02] hover:shadow-md bg-gray-100">↪️</button>
        </div>
      </div>
    </div>
  );
}
