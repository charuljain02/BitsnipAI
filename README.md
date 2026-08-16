# ⚡ BitsnipAI — AI-Powered React UI Library & Component Generator

**BitsnipAI** is a modern, full-stack AI SaaS platform designed to revolutionize React development. Users can explore a library of pre-built React components, install the published UI library via NPM, or dynamically generate custom production-ready UI components using natural language prompts.

---

## ✨ Features

- 📦 **NPM Package Integration:** Easily install and use pre-built components directly into any React project (`virtual-ui-library`).
- 🤖 **AI Component Studio:** Describe desired React UI components in plain English and let AI (via OpenRouter API) construct clean JSX code instantly.
- ⚡ **Live Preview & Code Viewer:** Inspect interactive component previews, view clean source code, and copy usage guides seamlessly.
- 🎨 **Personal Component Storage:** Save generated components to your personal dashboard under "My Components".
- 💳 **Credit-Based Sandbox System:** Built-in AI credit system for component generation with seamless credit top-ups.
- 🔐 **Authentication:** Google OAuth & Firebase Authentication with JWT session security.
- 🛡️ **Admin Dashboard:** Role-based access control for monitoring users and managing global component offerings.

---

##Live Demo

🔗 **Live Website:** [https://bitsnipai-4.onrender.com](https://bitsnipai-4.onrender.com)

## 🧠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Framer Motion, Redux Toolkit, React Router, Lucide / React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **AI Engine:** OpenRouter API
- **Auth:** Firebase Auth, Google OAuth, JWT, Cookie-Parser
- **Package Management:** NPM (`bitsnip-ui-library`)

---

## 🚀 Quick Start & Installation

### 1. Install the Library via NPM
2. Usage Example
JavaScript
import React from "react";
import { Button, Card } from "bitsnip-ui-library";

export default function App() {
  return (
    <Card title="Dashboard">
      <Button text="Hello BitsnipAI!"/>
    </Card>
  );
}
🛠️ Local Project Setup
Prerequisites
Node.js (v18 or higher)

MongoDB running locally or a MongoDB Atlas URI

---

1. Clone the Repository
```
git clone [https://github.com/charuljain02/BitsnipAI.git](https://github.com/charuljain02/BitsnipAI.git)
cd BitsnipAI
```

2. Setup Server (virtualui-server)
```
cd virtualui-server
npm install
```
Create a .env file in virtualui-server:

Code snippet
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
CLIENT_URL=http://localhost:5173
```
Start the server:
```
npm run dev
```
3. Setup Client (virtualui-client)
```
cd ../virtualui-client
npm install
```
Create a .env file in virtualui-client:

Code snippet
```
VITE_SERVER_URL=http://localhost:8000
VITE_ADMIN_EMAIL=your_admin_email@gmail.com
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```
Start the client:
```
npm run dev
```
---
### 📂 Project Architecture

BitsnipAI/
├── virtualui-client/    # React + Vite Frontend App
├── virtualui-server/    # Node.js + Express Backend API
└── virtualui-lib/       # Published React UI Library Source

---
### Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3a5fedf8-26b8-4601-9823-e76b7075a907" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/202a3b3d-522c-40ff-8a9a-da2651345a85" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/29850c48-e497-4083-86e5-b2ca4b6f4404" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c88b2d4f-5100-45ce-bd3b-acf78a2544b6" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/543e09a0-366e-4687-b923-6f4d8e2f1b2f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/248ff485-9bbb-46c1-8158-ca395eb88c3b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fbda739d-f0d8-4b9c-a881-1a8db48bf76c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6d3edb30-027e-49fd-9281-6c9afe69929b" />



---

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

📜 License
Distributed under the MIT License. See LICENSE for more information.


