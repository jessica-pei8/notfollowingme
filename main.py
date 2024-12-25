from bs4 import BeautifulSoup

with open("followers_1.html", "r", encoding="utf-8") as f:
    followers_html = f.read()

with open("following.html", "r", encoding="utf-8") as f:
    following_html = f.read()

followers_soup = BeautifulSoup(followers_html, "html.parser")
following_soup = BeautifulSoup(following_html, "html.parser")

followers = set(
    link.get_text()
    for link in followers_soup.find_all("a", href=True)
    if "instagram.com" in link["href"]
)

following = set(
    link.get_text()
    for link in following_soup.find_all("a", href=True)
    if "instagram.com" in link["href"]
)

not_following_back = following - followers

print("Usernames of those who are not following you back:")
for username in not_following_back:
    print(username)
