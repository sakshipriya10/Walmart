 import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sakshi Priya",
    review: "Absolutely love the quality of the clothes!",
    rating: 5,
  },
  {
    name: "Komal",
    review: "Great customer service and the website is super easy to navigate.",
    rating: 4,
  },
  {
    name: "Anjali Rani",
    review: "My go-to platform for trendy fashion. Highly recommend!",
    rating: 5,
  },
  {
    name: "Artiii",
    review: "Affordable prices and cool designs!",
    rating: 4,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-10 mt-5">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 ">❤️ What Our Customers Say</h2>
      <div className="max-w-5xl mx-auto px-4">
        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between">
                <div>
                  <p className="text-gray-700 italic mb-4">"{t.review}"</p>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-semibold text-pink-700">- {t.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
