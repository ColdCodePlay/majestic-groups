# 🏛️ Majestic Group | Business & Legal Services Platform

A comprehensive digital platform simplifying business registration, legal compliance, and tax filings for Indian entrepreneurs. This application bridges the gap between complex legal frameworks and user-friendly digital experiences.

![Project Banner](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

### 🚀 **Startup Launchpad**
- **Entity Selector Quiz**: An interactive algorithm that recommends the perfect legal structure (Pvt Ltd vs. LLP vs. OPC) based on liability, funding needs, and ownership.
- **Roadmap Generator**: Personalized step-by-step guides for new founders based on their industry and location.

### 📅 **Compliance Hub**
- **Interactive Calendar**: Tracks statutory deadlines for GST, Income Tax, and ROC filings.
_ **Smart Alerts**: Visual indicators for Critical, High, and Normal priority events to ensure users never miss a due date.
- **Filtering**: Segment events by category (Tax, Labor, Legal) for focused tracking.

### 🔐 **Secure Document Vault**
- **Client Portal**: A secure, encrypted digital locker for storing vital company documents (Certificate of Incorporation, PAN, GST Certificates).
- **Status Tracking**: Visual indicators for document verification status (Verified vs. Pending).
- **Category Management**: Organize files by Corporate, Tax, and KYC categories.

### 🤖 **AI Legal Assistant**
- **Smart Consultation**: Integrated AI chatbot (Powered by Google Gemini) to answer common queries regarding business laws and registration processes instantly.
- **Context Awareness**: Provides tailored advice based on Indian corporate law context.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 (TypeScript) + Vite
- **Styling**: Tailwind CSS + Pure CSS Modules
- **Animations**: Framer Motion (for complex transitions and interactive UI)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **AI Integration**: Google Gemini API

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone & Install
```bash
git clone https://github.com/ColdCodePlay/majestic-groups.git
cd majestic-groups
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory and add your API credentials:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AIAssistant    # AI Chatbot widget
│   ├── Compliance/    # Calendar and tracking components
│   └── Vault/         # Document security components
├── pages/             # Main route pages
│   ├── Home           # Landing page with hero slider
│   ├── EntitySelector # Quiz logic page
│   └── Services       # Service listing and search
├── context/           # React Context providers (Data handling)
└── assets/            # Static images and icons
```

## 📜 License

© 2026 Majestic Group. All rights reserved.
