let currentStep = 1;

function getUsernameFromURL(url) {
    url = url.replace(/\/$/, "");            
    let username = url.split("/").pop();    

    if (username.startsWith("_u")) {
        username = username.replace("_u", "");
    }

    return username;
}

function parseHTML(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.target.result, "text/html");

            let usernames = [];

            const links = doc.querySelectorAll("a[href*='instagram.com']");
            if (links.length > 0) {
                usernames = Array.from(links).map(a =>
                    getUsernameFromURL(a.href)
                );
            }

            const h2s = doc.querySelectorAll("h2");
            if (h2s.length > 0 && usernames.length === 0) {
                usernames = Array.from(h2s).map(h2 => h2.textContent.trim());
            }

            resolve(usernames);
        };

        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function handleFiles() {
    const followersFile = document.getElementById("followers-file").files[0];
    const followingFile = document.getElementById("following-file").files[0];

    if (!followersFile || !followingFile) {
        alert("Please upload both followers and following HTML files.");
        return;
    }

    Promise.all([parseHTML(followersFile), parseHTML(followingFile)]).then(
        ([followers, following]) => {
            const notFollowingBack = following.filter(
                (u) => !followers.includes(u)
            );

            const notFollowedBack = followers.filter(
                (u) => !following.includes(u)
            );

            displayResults(notFollowingBack, notFollowedBack);
        }
    );
}

function displayResults(notFollowingBack, notFollowedBack) {
    const nfbList = document.getElementById("not-following-back");
    const nfbList2 = document.getElementById("not-followed-back");

    nfbList.innerHTML = `<h3>Not Following You Back:</h3>
                         <p>Count: ${notFollowingBack.length}</p>`;
    notFollowingBack.forEach(u => {
        const li = document.createElement("li");
        li.textContent = u;
        nfbList.appendChild(li);
    });

    nfbList2.innerHTML = `<h3>You Are Not Following Back:</h3>
                          <p>Count: ${notFollowedBack.length}</p>`;
    notFollowedBack.forEach(u => {
        const li = document.createElement("li");
        li.textContent = u;
        nfbList2.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("check-button")
        .addEventListener("click", handleFiles);
});
