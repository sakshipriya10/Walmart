 import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();
await connectDB();

const sampleProducts = [
  {
    name: "Men's Black Jacket",
    category: "jackets",
    color: "black",
    price: 120,
    image: "https://media.istockphoto.com/id/2167277741/photo/portrait-of-a-young-stylish-man-in-white-background-with-black-jeans-jacket-full-height-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=DLL7tN_9hL3QvC-8VXm_gedoSgd2vdz8pViC78zRbgU=",
  },
  {
    name: "Women's purple Jacket",
    category: "jackets",
    color: "purple",
    price: 110,
    image: "https://images.unsplash.com/photo-1695685317104-fe17410d81b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBwdXJwbGUlMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Men's Running Shoes",
    category: "shoes",
    color: "black",
    price: 90,
    image: "https://media.istockphoto.com/id/1258111640/photo/indian-made-mens-sports-shoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=5Mzy6eij-iZL9Y9xkIZIiIkZZNcNToIkMij2YbnBftQ=",
  },
  {
    name: "Women's White Sneakers",
    category: "shoes",
    color: "white",
    price: 95,
    image: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Gold Necklace",
    category: "jewelery",
    color: "gold",
    price: 200,
    image: "https://images.unsplash.com/photo-1641290748359-1d944fc8359a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdvbGQlMjBuZWNrbGFjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Silver Earrings",
    category: "jewelery",
    color: "silver",
    price: 85,
    image: "https://images.unsplash.com/photo-1714733831162-0a6e849141be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2lsdmVyJTIwZWFyaW5nfGVufDB8fDB8fHww",
  },
  {
    name: "Smart Watch",
    category: "electronics",
    color: "black",
    price: 150,
    image: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Bluetooth Headphones",
    category: "electronics",
    color: "blue",
    price: 75,
    image: "https://images.unsplash.com/photo-1631281637573-14de1a1968fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZXRvb3RoJTIwaGVhZHBob25lfGVufDB8fDB8fHww",
  },
  {
    name: "Pink Lipstick",
    category: "makeup",
    color: "pink",
    price: 30,
    image: "https://images.unsplash.com/photo-1695634543240-882c7ee2c88a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBpbmslMjBsaXBzdGlja3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Mascara Set",
    category: "makeup",
    color: "black",
    price: 45,
    image: "https://media.istockphoto.com/id/1397036353/photo/opened-mascara-and-brush-white-background-isolated-close-up-black-tube-eye-mascara-container.webp?a=1&b=1&s=612x612&w=0&k=20&c=sXgSRpgRIYoNKzI6uRHM8Eis_ElOcHelnEqRohYv1Cw=",
  },
  {
    name: "Men's Blue Shirt",
    category: "men's clothing",
    color: "blue",
    price: 60,
    image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwYmx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww",
  },
  {
    name: "Women's Floral Dress",
    category: "women's clothing",
    color: "multi",
    price: 75,
    image: "https://images.unsplash.com/photo-1511130558090-00af810c21b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWVuJTIwJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Men's Leather Wallet",
    category: "accessories",
    color: "brown",
    price: 35,
    image: "https://images.unsplash.com/photo-1620109176813-e91290f6c795?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Women's Handbag",
    category: "accessories",
    color: "black",
    price: 95,
    image: "https://images.unsplash.com/photo-1691480288782-142b953cf664?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWVuJTIwaGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Nail Polish Set",
    category: "makeup",
    color: "multi",
    price: 25,
    image: "https://media.istockphoto.com/id/937279640/photo/nail-polish-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=b7NfcjFDHNl0psboXD8CbcIGgpfmxXzEJKjJDypKH88=",
  },
  {
    name: "Men's Casual Trousers",
    category: "men's clothing",
    color: "grey",
    price: 70,
    image: "https://images.unsplash.com/photo-1742310134130-3709910c4728?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhc3VhbCUyMHRyb3VzZXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Women's Jeans",
    category: "women's clothing",
    color: "blue",
    price: 80,
    image: "https://plus.unsplash.com/premium_photo-1689371953420-b6981e43fa38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29tZW4lMjBqZWFufGVufDB8fDB8fHww",
  },
  {
    name: "Makeup Brush Set",
    category: "makeup",
    color: "pink",
    price: 40,
    image: "https://media.istockphoto.com/id/178078253/photo/set-of-various-types-of-makeup-brushes-lined-up-in-a-row.webp?a=1&b=1&s=612x612&w=0&k=20&c=TrufFIgFqlRkNToz9BQKgxcli9yNtiZiTgZ0fM9kV14=",
  },
  {
    name: "Men's Formal Shoes",
    category: "shoes",
    color: "brown",
    price: 105,
    image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Women's Heels",
    category: "shoes",
    color: "red",
    price: 115,
    image: "https://plus.unsplash.com/premium_photo-1673977134574-95689f812241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VtZW4lMjBoZWVscyUyMHJlZHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products seeded");
    process.exit();
  } catch (e) {
    console.error("❌ Failed to seed products:", e);
    process.exit(1);
  }
};

seedProducts();
