

# 🛍️ UrbanEDGE Mart – Walmart Hackathon Project

UrbanEDGE Mart is a **next-gen smart e-commerce platform** designed to reimagine user experience. Powered by AI, AR, and Voice Assistance, it brings personalized and intuitive shopping to life. Built for the **Walmart Hackathon**, this project showcases innovation in user interaction, visual product detection, and voice-enabled search.

---

## 🚀 Features

### 🤖 AI-Powered Product Detection
- Real-time object detection using webcam via **TensorFlow COCO-SSD**
- Instantly suggests matching products based on detected items
- Smooth transition to product details

### 🧠 Voice Shopping Assistant
- Search products using **voice commands**
- Natural language understanding with AI backend (OpenRouter or Gemini)
- Instant product results based on user intent

### 🪄 Augmented Reality (AR)
- Visualize products in your space
- Seamless transition from object detection to AR try-on mode

### ❤️ Wishlist & Cart
- Add products to Wishlist with one click
- Move items from Wishlist to Cart
- Auth-protected routes using JWT

### 📝 Customer Testimonials
- Showcases real customer feedback
- Beautiful animated **carousel of reviews**
- Adds social proof and credibility

### 🧾 Smart Order Flow
- Select address
- Place orders
- Track previous orders

---

## 🧰 Tech Stack

| Frontend        | Backend         | AI / ML               | Other Tools        |
|-----------------|------------------|------------------------|--------------------|
| React.js        | Node.js + Express| TensorFlow.js (COCO-SSD)| Clerk/Auth (optional) |
| Tailwind CSS    | MongoDB + Mongoose | OpenRouter / Gemini API| React Router       |
| React Carousel  | JWT Auth         | Voice Recognition (Web Speech API) | Figma (UI Design) |

---

## 📸 Screenshots

| Assistants | Virtual Try-On | Gamified | Urban Edge |
|------------|----------------|----------|------------|
| ![Assistants](./frontend/public/screenshots/aiAssistants.png) | ![TryOn](./frontend/public/screenshots/virtualTryOn.png) | ![Gamified](./frontend/public/screenshots/gamified.png) | ![Urban Edge](./frontend/public/screenshots/urbanEdge.png) |

## 🛠️ Installation & Setup

```bash
git clone https://github.com/your-username/Walmart-Hackathon.git
cd Walmart-Hackathon

# Backend
cd server
npm install
npm run dev

# Frontend
cd ../client
npm install
npm start



💡 Future Enhancements
Product Try-on using 3D models
Real-time chat assistant
Enhanced search accuracy using embeddings
Admin dashboard for inventory control

👨‍💻
- Deployed link
- Video demo link
- Teammate credits 

