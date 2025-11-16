from bs4 import BeautifulSoup

def extract_usernames(html, is_following=False):
    soup = BeautifulSoup(html, "html.parser")

    links = soup.find_all("a", href=True)
    usernames_from_links = [
        link.get_text(strip=True)
        for link in links
        if "instagram.com" in link["href"]
    ]

    if not is_following:
        return set(usernames_from_links)

    h2_tags = soup.find_all("h2")
    usernames_from_h2 = [h2.get_text(strip=True) for h2 in h2_tags]

    return set(usernames_from_h2 if usernames_from_h2 else usernames_from_links)


with open("followers_1.html", "r", encoding="utf-8") as f:
    followers_html = f.read()

with open("following.html", "r", encoding="utf-8") as f:
    following_html = f.read()

followers = extract_usernames(followers_html, is_following=False)
following = extract_usernames(following_html, is_following=True)

not_following_back = following - followers

print("Usernames of those who are not following you back:")
for user in sorted(not_following_back):
    print(user)
