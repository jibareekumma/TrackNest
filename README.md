TrackNest 🗂️

Organize every project. Track every task. Watch progress grow.

TrackNest is a full-stack productivity and project tracking web application built with React and Firebase. It lets you create projects, break them down into tasks, and watch your completion percentage update in real time as you work through them across all your devices.

🌐 Live Demo
🔗 https://track-nest-2gsb.vercel.app/

✨ Features
🔐 Authentication

Email and password sign up / sign in
Google OAuth sign in
GitHub OAuth sign in
Protected routes — dashboard is only accessible when logged in
Persistent auth state via Firebase Auth

📁 Project Management

Create projects with a name and category
Delete individual projects or clear all at once
Inline project name editing directly from the dashboard card
Projects are sorted by creation date (newest first)
Categories include: Work, Health, Personal, Learning, Finance, Creative, Home, Event, Development, Research, and Other

✅ Task Tracking

Add tasks to any project
Mark tasks as complete, they move to a "Completed Tasks" section
Delete individual tasks from both active and completed lists
All task data is stored in Database and syncs across devices in real time

📊 Progress Calculation

Every project card displays a live circular progress bar
Progress percentage is calculated as:

  (completed tasks / total tasks) × 100

Updates instantly across the dashboard, "See All" page, and project detail view whenever a task is completed or deleted

🔍 Search

Real-time project search with live suggestions as you type
Click a suggestion to navigate directly to that project

🌙 Dark Mode

Toggle between light and dark mode from the dashboard header
Preference is saved to localStorage and persists across sessions


📱 Responsive Design

Fully responsive across mobile, tablet, and desktop
Mobile: hamburger menu navigation, single-card carousel
Desktop: full nav bar, side-by-side card layout
Carousel on the dashboard auto-rotates between slides every 5 seconds with manual dot navigation

🔔 Toast Notifications

Toast messages confirm successful actions (project created, project name edited)
Auto-dismiss after a set duration with an animated progress loader

📄 See All Page

Dedicated page listing all projects sorted by date
Each card shows project name, category, progress bar, and quick-access icons

☁️ Deployment (Vercel)
This project is deployed on Vercel via GitHub integration. Every push to the main branch triggers an automatic redeploy.

👤 Author
Jibare

GitHub: @jibareekumma
Twitter/X: @devjibare
Instagram: @dev_jibare01
Threads: @dev_jibare01

LESSONS LEARNT:
Built with and a lot of debugging. 
Deployment actually teaches you more than tutorials ever will.
