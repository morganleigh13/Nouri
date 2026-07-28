# Bubbles – A Multi‑Channel Dev Chat App
Bubbles is a real‑time chat platform tailored for developers. Channels are grouped by tech stack (e.g., Front‑end, Back‑end, Data‑Science), a built‑in chatbot runs on Ollama, and the UI is a modern React 19 + Vite SPA with Tailwind, DaisyUI and more. 

![My Website Preview](./client/src/assets/bubbles.jpg "my-website-preview")

The app features include:

* A chatbot integrated with Ollama, which can help users with their queries and provide information on various topics related to development.
* Different channels for different types of developers, such as frontend, backend, fullstack, etc.
* A channel drawer with icons that show how many messages have been added since the last visit, and a toggle to change themes.
* Signup and ability to change password if forgotten.
* Shows whether users are currently online or not.
* Addition of reactions to each message.



## Feature	Description
* Channel Drawer A hidden side‑panel with icons for each dev‑type channel.
* Unread Badges	Icons show how many messages have arrived since you last opened the channel.
* Theme Switcher Use the toggle to change themes if you prefer a different look and feel. Theme choices stored in localStorage.
* Auth	Sign‑up, login, password reset via email (JWT + session).
* Online Presence	Shows real‑time “online/offline” status of all users.
* Message Reactions	Users can react (👍, 👎, 🎉, etc.) to any messageto show your support or to express your opinions.
* Use the chatbot integrated with Ollama to get help with your queries and learn more about various topics related to development.
* Responsive UI	Built with Tailwind + DaisyUI; mobile‑friendly.


## 🛠️ Tech Stack
React and Vite are implicit; the rest are noteworthy dependencies.

* State & Routing @reduxjs/toolkit, react-redux, react-router	Simplifies global state & navigation.
* UI / Styling	tailwindcss, @tailwindcss/vite, daisyui, styled-components	Rapid UI prototyping & theming.
* Icons	@fortawesome/react-fontawesome, react-icons	Rich icon set for channels & actions.
* Animations gsap	Smooth transitions for drawer, badges, etc.
* Networking axios, socket.io-client HTTP + real‑time websockets.
* Auth jwt-decode, passport, passport-jwt, passport-local, express-session	Secure auth with JWT + session persistence.
* Data mongoose, faker	MongoDB ODM + fake data generator.


# Project Structure

bubbles/
├─ client/          # React/Vite SPA
│  ├─ src/
│  │  ├─ api/          # axios + socket.io wrappers
│  │  ├─ components/   # UI components
│  │  ├─ features/     # Redux slices
│  │  ├─ hooks/        # custom hooks (useAuth, useSocket, etc.)
│  │  ├─ pages/        # React Router pages
│  │  ├─ styles/       # Tailwind + styled‑components
│  │  └─ App.jsx
│  ├─ public/
│  ├─ index.html
│  └─ vite.config.js
├─ server/          # Express + Socket.io backend
│  ├─ src/
│  │  ├─ config/      # env, db
│  │  ├─ middleware/  # passport strategies, auth
│  │  ├─ routes/      # REST & socket.io handlers
│  │  └─ models/      # Mongoose schemas
│  ├─ server.js
│  └─ package.json
├─ README.md
└─ .gitignore

# Installation 

# Clone repo
git clone https://github.com/your-org/bubbles.git
cd bubbles

## Install server deps
cd server
npm install

## Install client deps
cd ../client
npm install

# Create .env file

## examples in repo
PORT=4000
MONGO_URI=mongodb://localhost:27017/bubbles
SESSION_SECRET=super-secret
JWT_SECRET=jwt-secret

# Ollama (if needed)
OLLAMA_HOST=http://localhost:11434

# 🎯 Usage
## Channels & Badges
Click the hamburger icon → hidden drawer slides in.
Each channel icon shows a badge (react-hot-toast style) indicating new messages since you last visited.
Badge counts reset when you click the channel.
## Theme Toggle
Top‑right corner contains a theme button.
Clicking opens a dropdown and you can choose between numerous themes.
Preference stored in localStorage.
Home page picture changes dependent on theme.
## Authentication
/signup → Create an account.
/login → Sign in.
/reset-password → Request password reset link (JWT‑based email flow).
Password changes persisted via argon2 hashing.
Reactions & Presence
Hover over a message → reaction panel pops up.
Add reactions; they’re broadcasted via Socket.io.
Online status shown next to each user avatar in the channel list (socket.io rooms)
## Chatbot (Ollama)
Type /bot in the message input → the bot responds.
Uses axios to hit the Ollama API (/api/chat).
Supports multi‑turn conversations within any channel.

## 🤝 Contributing
Fork the repo.
Create a feature branch (git checkout -b feat/new-feature).
Run tests (npm test) and lint checks.
Open a Pull Request with a clear description.
We welcome issues, PRs, and suggestions!



## Optional

* On users nav, only show logged in users
* Show only last X number of messages in channel
* (Advanced) Infinite scrolling on message list to show additional messages
* Ability for a user to update their message
* Ability to "upload" an avatar for a user (will be covered in videos)
* User status message (DND, online, idle, etc). Should show on users list on right side nav
* User info page or modal when you click on a user
* Reactions (will be partially covered in videos)
* Direct messages to other users (advanced, will be partially covered in videos)
* Private channels that only users with permission can see
* Badge on channel icon of how many messages there have been since you were last there (advanced)
* Alert when you return to a channel of how many messages there have been since you were last there (advanced)
* Ability to browse channels
* Ability to ban a user. A banned user should not be able to see any of the app and instead be redirected to a banned user page.
* Banned user part 2
* * A banned user can still see DMs between users they have already interacted with
* * They are not able to see channels or channel info


## Notes

* MongoDB projection: https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/?interface=driver&language=nodejs
* Mongoose projection: https://www.geeksforgeeks.org/mongodb/how-to-use-mongodb-projection-in-mongoose/
* Message input: https://tailwindcss.com/docs/top-right-bottom-left
* Polling with interval: https://www.geeksforgeeks.org/reactjs/how-to-use-setinterval-method-inside-react-components/
* useInterval custom hook: https://medium.com/@sfcofc/implementing-polling-in-react-a-guide-for-efficient-real-time-data-fetching-47f0887c54a7
