# 🍲 ShareBite | SDG 12 Capstone Project

> **Zero Waste. Zero Hunger.** A full-stack web application designed to redistribute surplus food from local businesses to communities in need, tackling the UN's Sustainable Development Goal 12 (Responsible Consumption and Production).

![ShareBite Banner](https://via.placeholder.com/1000x400?text=Insert+Your+Project+Screenshot+Here) *(Note: Replace this link with an actual screenshot of your app!)*

## 📖 About the Project

Every year, millions of tons of perfectly edible food are thrown into landfills while millions of people simultaneously suffer from hunger. **ShareBite** bridges the gap between food donors (restaurants, bakeries, grocery stores) and food redistributors (NGOs, shelters, community organizers). 

Instead of throwing food away, businesses can use ShareBite to list their surplus in seconds. Verified NGOs can view a live dashboard of available food in their area and claim it for immediate pickup, optimizing their routes and reducing local food waste.

## ✨ Key Features

- **Role-Based Authentication:** Secure login system differentiating between 'Donors' (who can post food) and 'Receivers' (who can claim food) using JWT and Bcrypt.
- **Live Donation Feed:** A dynamic real-time dashboard fetching available surplus food from the database.
- **Smart Claiming System:** Claimed food is instantly updated in the database and hidden from the public feed to prevent double-booking.
- **Dynamic Forms:** Auto-fills verified organization data to make the donation process frictionless.

## 🛠️ Technology Stack

**Frontend:**
- HTML5, CSS3
- Vanilla JavaScript
- Responsive UI/UX Design

**Backend:**
- Node.js
- Express.js
- RESTful API Architecture

**Database & Security:**
- MongoDB (with Mongoose ODM)
- JSON Web Tokens (JWT) for session management
- Bcrypt.js for password hashing

## 🚀 Installation and Setup

To run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally

