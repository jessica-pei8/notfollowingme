from bs4 import BeautifulSoup

def extract_username(url):
    url = url.rstrip("/")   
    username = url.split("/")[-1]

    if username.startswith("_u"):
        username = username.replace("_u", "", 1)

    return username

def extract_followers(html):
    soup = BeautifulSoup(html, "html.parser")

    usernames = [
        extract_username(a["href"])
        for a in soup.find_all("a", href=True)
        if "instagram.com" in a["href"]
    ]
    return set(usernames)

def extract_following(html):
    soup = BeautifulSoup(html, "html.parser")

    h2_tags = soup.find_all("h2")
    if h2_tags:
        return set(h2.get_text(strip=True) for h2 in h2_tags)

    return extract_followers(html)

with open("followers_1.html", "r", encoding="utf-8") as f:
    followers_html = f.read()

with open("following.html", "r", encoding="utf-8") as f:
    following_html = f.read()

followers = extract_followers(followers_html)
following = extract_following(following_html)

not_following_back = following - followers
you_not_following = followers - following

print("Not Following You Back:")
for u in sorted(not_following_back):
    print(u)

print("\nYou Are Not Following Back:")
for u in sorted(you_not_following):
    print(u)
