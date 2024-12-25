# notfollowingme
Simple web scraper for instagram followers and following list. This project identifies Instagram accounts that you follow but do not follow you back. It processes two HTML files exported from your Instagram account: one containing your followers and the other containing the accounts you follow.

## Features
- Parses Instagram follower and following lists from HTML files.
- Compares the two lists to identify users who are not following you back.
- Outputs the list of usernames in the terminal.

## Prerequisites
- Python 3.7+
- HTML files for followers and following lists downloaded from Instagram.

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
