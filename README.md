# 🍴 Share Bite - Food Sharing Web Application

**Live Demo:** [Visit via Netlify](https://share-bite-pranoy.netlify.app/)

---

## Overview

Share Bite is a **responsive food-sharing web application** built with modern web technologies. Users can share food, browse available foods, make donations, interact with posts, and manage their own profile through a dashboard. The application emphasizes usability, responsiveness, and social interaction.

---

## 🛠 Technologies Used

### Frontend
- **React.js** – UI library for building interactive interfaces
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **Framer Motion** – Smooth animations and transitions
- **React Router** – Client-side routing
- **React Hot Toast** – User-friendly toast notifications
- **Social Share Integration** – Share posts on social platforms

### Backend
- **Node.js & Express.js** – REST API server
- **MongoDB** – Database for storing users, foods, and donations
- **Firebase Admin SDK** – Authentication and role management
- **dotenv** – Environment variable management
- **CORS** – Cross-origin request handling
- **SSLCommerz** – Payment gateway for donations

---

## 🚀 Features

- **Dashboard**
  - View personal profile and shared foods
  - Manage own posts and requests
- **Donation via SSLCommerz**
  - Secure online payment integration
  - Track donation status (success / fail)
- **Food Details**
  - Comment on food items
  - Edit and delete own comments
- **Social Interaction**
  - Like and dislike posts
  - Share food posts on social media
- **Responsive Design**
  - Optimized for desktop, tablet, and mobile screens
- **Authentication**
  - Firebase authentication with user roles
  - Secure login and signup

---

## 📂 Folder Structure (Frontend & Backend)

frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ └── App.jsx
│ └── package.json
backend/
│ ├── routes/
│ │ ├── donations.js
│ │ ├── foods.js
│ │ ├── comments.js
│ │ └── users.js
│ ├── server.js
│ └── package.json