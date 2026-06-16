# 🌟 Moodlens

Moodlens is an AI-powered emotion recognition dashboard that analyzes facial expressions from uploaded images and identifies the dominant emotion. Users can upload an image, view emotion insights instantly, and revisit their recent analyses through a clean and responsive interface.

## 📸 Preview
<img width="1918" height="881" alt="Screenshot 2026-06-16 131842" src="https://github.com/user-attachments/assets/d06e7baf-fe5c-49db-96ac-8afee50d38a8" />

<img width="1567" height="856" alt="Screenshot 2026-06-16 132130" src="https://github.com/user-attachments/assets/042404bf-bc84-46c0-9936-495c3ce5c048" />


## ✨ Features

* 📤 Upload facial images for analysis
* 😊 Detect dominant emotions with confidence scores
* 📊 View emotion probability distribution
* 📚 Access recent analysis history
* ☁️ Store images securely using Cloudinary
* ⚠️ Friendly error handling for unsupported images
* 📱 Fully responsive dashboard

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Axios
**Backend:** Node.js, Express.js, Multer
**Database:** MongoDB Atlas
**Storage:** Cloudinary
**AI Service:** Face++ Emotion Detection API

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the backend:

```env
PORT=
MONGO_URI=

FACE_API_KEY=
FACE_API_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_FOLDER=
```

## 👩‍💻 Developed By

Built with curiosity and a passion for AI by:

* [Roshni](https://github.com/RoshniRautela)
* [Shweta](https://github.com/aryashweta114-cloud)
* [Tarana](https://github.com/TaranaKhanna)
