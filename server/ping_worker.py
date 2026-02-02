import requests
import json
import time
import os

URLS_FILE = os.path.join(os.path.dirname(__file__), "urls.json")

def load_urls():
    if os.path.exists(URLS_FILE):
        with open(URLS_FILE, "r") as f:
            return json.load(f)
    return []

def ping_urls():
    urls = load_urls()
    if not urls:
        print("No URLs to ping.")
        return
    
    for url in urls:
        try:
            start = time.time()
            response = requests.get(url, timeout=10)
            duration = round(time.time() - start, 2)
            print(f"✅ {url} -> {response.status_code} ({duration}s)")
        except Exception as e:
            print(f"❌ {url} -> Error: {e}")

if __name__ == "__main__":
    while True:
        print("⏳ Pinging URLs...")
        ping_urls()
        print("Sleeping for 1 hour...")
        time.sleep(3600)  # 1 hour
