# notfollowingme
Simple web scraper for Instagram followers and following list. This project identifies Instagram accounts that you follow but do not follow you back. It processes two HTML files exported from your Instagram account: one containing your followers and the other containing the accounts you follow. There are two ways to use the app:

1. **GitHub Pages (Frontend-only)**: A web interface where you can upload your follower and following HTML files, and the app will display the users who are not following you back.
2. **Python Script (Backend Processing)**: A Python script that processes the same HTML files locally and outputs the results as a list in the terminal.

## Features
- Upload your followers and following HTML files on the web app to check who is not following you back.
- Alternatively, run the Python script to process the files locally and output the result in the terminal.

## How to Use the GitHub Pages App
1. Clone or visit the [GitHub Pages link](https://username.github.io/instagram-follower-checker/) of this project.
2. Upload your followers and following HTML files by clicking the respective "Choose File" buttons.
3. Click the "Check" button to see the users who are not following you back.
4. The result will be displayed on the page, listing the usernames of those who are not following you back.

### File Format for Web App:
- Upload two HTML files:
  - One for your **followers list**.
  - One for your **following list**.
- These files should contain links to Instagram profiles. The app extracts Instagram usernames from `a` tags containing `instagram.com` in the `href` attribute.

## How to Use the Python Script
If you'd prefer to process the follower and following lists locally, you can use the Python script provided in this repository.

## Prerequisites
- Python 3.7+
- HTML files for followers and following lists downloaded from Instagram. [Tutorial](https://help.instagram.com/181231772500920?helpref=about_content)

## Installation

1. Clone this repository or download the script.
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Files
- `followers_1.html`: Contains the list of your Instagram followers.
- `following.html`: Contains the list of Instagram accounts you are following.
- `requirements.txt`: Specifies the Python dependencies.
- `main.py`: Python script to perform the comparison.

## Usage

1. Place the `followers_1.html` and `following.html` files in the same directory as the script.
2. Run the script:

   ```bash
   python main.py
   ```

3. The script outputs:

   ```
   Usernames of those who are not following you back:
   username1
   username2
   ...
   ```

## Dependencies
- `beautifulsoup4==4.12.2`
