export default function ProductBadges() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Product Badges</h2>
      <div className="flex justify-around items-center space-x-2">
        <div className="text-center">
          <div className="text-5xl mb-1">🔒</div>
          <p className="text-sm">First Purchase</p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-1 ">❤️</div>
          <p className="text-sm">Loyal Customer</p>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-1">✏️</div>
          <p className="text-sm">Decorator Extraordinaire</p>
        </div>
      </div>
    </div>
  );
}
