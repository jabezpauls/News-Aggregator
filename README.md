# 📰 News Aggregator

A modern, full-stack News Aggregator app built using **React (frontend)** and **FastAPI (backend)**. It lets users choose from different genres and fetches the latest news articles from the New York Times RSS feeds.

---

## 🌟 Features

- Genre-based news filtering (technology, sports, business, health, entertainment)
- Responsive UI with Tailwind CSS
- Beautiful card layout with images, titles, and article previews
- Fast loading via modern async API design
- Backend scrapes and parses NYT RSS feeds using BeautifulSoup

---

## 📦 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: FastAPI, BeautifulSoup4, Requests

---

## 🚀 How It Works

This project is a full-stack **News Aggregator** application that allows users to view the latest news articles across various genres such as technology, sports, business, health, and entertainment. Here's a step-by-step explanation of how it works:

### 1. **User Interface (Frontend - React)**
- When the user loads the app, a dropdown allows them to select a news genre.
- Based on the selected genre, the frontend sends a `GET` request to the backend endpoint:
  ```
  http://localhost:8000/news?genre=<selectedGenre>
  ```
- While fetching, a loading spinner/message is shown. If an error occurs (e.g. server unreachable or no articles found), a message is displayed.
- Once data is received:
  - A visually styled card is generated for each article.
  - Cards include:
    - Article image (or a placeholder if unavailable)
    - Title
    - Publication date
    - Short description
    - A "Read more" link that opens the full article in a new tab.

### 2. **Backend Service (FastAPI + BeautifulSoup)**
- The backend exposes a single endpoint:  
  ```
  GET /news?genre=<genre>
  ```
- When this endpoint is hit:
  - It maps the genre to a predefined RSS feed from the New York Times (via the `RSS_FEEDS` dictionary).
  - It makes an HTTP request to fetch the RSS XML.
  - Uses `BeautifulSoup` (`lxml-xml` parser) to parse the XML and extract key data:
    - `<title>`
    - `<link>`
    - `<description>`
    - `<pubDate>`
  - **Note**: NYT RSS feeds do not provide `<media:content>` or `<image>` tags consistently, so thumbnails are not extracted. A placeholder image is used instead (or this can be extended to scrape article pages for images).
- The endpoint returns the cleaned list of news articles as JSON:
  ```json
  {
    "articles": [
      {
        "title": "...",
        "link": "...",
        "description": "...",
        "pubDate": "..."
      },
      ...
    ]
  }
  ```

### 3. **Styling and Experience**
- Tailwind CSS is used in the React frontend for modern, responsive styling.
- Animations and transitions provide a smooth and polished user experience (e.g., hover scale, gradient background).
- The design is mobile-friendly and adapts well across screen sizes.

---

## 🛠️ Setup & Installation

### Backend (FastAPI)
```bash
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn beautifulsoup4 requests

# Run the server
uvicorn main:app --reload
```

### Frontend (React)
```bash
# Create React app if not already
npx create-react-app news-frontend
cd news-frontend

# Install Axios & Tailwind
npm install axios
npm install -D tailwindcss
npx tailwindcss init

# Add Tailwind to your CSS (e.g., index.css)
@tailwind base;
@tailwind components;
@tailwind utilities;


# Start frontend
npm start
```

---

## 💡 Future Improvements
- Add support for more news sources
- Scrape thumbnails using Open Graph meta tags
- Add user login and bookmarking
- Deploy on Vercel + Railway for public use

---

## 📄 License
MIT License. Use freely and modify as needed.