from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RSS_FEEDS = {
    "technology": "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "sports": "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
    "business": "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
    "health": "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml",
    "entertainment": "https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml",
}

@app.get("/news")
def get_news(genre: str):
    url = RSS_FEEDS.get(genre, RSS_FEEDS["technology"])
    try:    
        res = requests.get(url)
        soup = BeautifulSoup(res.content, "lxml-xml")
        items = soup.find_all("item")

        articles = []
        for item in items[:10]:  # Limit to 10 articles
            # Attempt to get image from media:content or img tag inside description
            media = item.find("media:content")
            image_url = media["url"] if media and media.get("url") else None

            if not image_url:
                desc_soup = BeautifulSoup(item.description.text, "html.parser")
                img_tag = desc_soup.find("img")
                image_url = img_tag["src"] if img_tag else None

            article = {
                "title": item.title.text if item.title else "No title",
                "link": item.link.text if item.link else "#",
                "description": item.description.text if item.description else "No description",
                "pubDate": item.pubDate.text if item.pubDate else "No date",
                "urlToImage": image_url or ""  # fallback to empty string if no image
            }
            articles.append(article)

        return {"articles": articles}
    except Exception as e:
        return {"error": str(e), "articles": []}
