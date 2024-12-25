function processFiles() {
    const followersFile = document.getElementById("followers-file").files[0];
    const followingFile = document.getElementById("following-file").files[0];
    const outputDiv = document.getElementById("output");

    if (!followersFile || !followingFile) {
        outputDiv.textContent = "Please upload both files.";
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e) {
        const followersHtml = e.target.result;
        const followers = extractUsernames(followersHtml);
        
        reader2.onload = function (e) {
            const followingHtml = e.target.result;
            const following = extractUsernames(followingHtml);

            const notFollowingBack = [...following].filter(user => !followers.has(user));
            
            if (notFollowingBack.length > 0) {
                outputDiv.innerHTML = `<strong>Users not following you back:</strong><ul>${notFollowingBack.map(user => `<li>${user}</li>`).join('')}</ul>`;
            } else {
                outputDiv.textContent = "Everyone is following you back!";
            }
        };

        reader2.readAsText(followingFile);
    };

    reader1.readAsText(followersFile);
}

function extractUsernames(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = doc.querySelectorAll('a[href*="instagram.com"]');
    const usernames = new Set();

    links.forEach(link => {
        usernames.add(link.textContent.trim());
    });

    return usernames;
}
