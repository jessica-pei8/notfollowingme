let currentStep = 1;

function handleFiles() {
    const followersFile = document.getElementById("followers-file").files[0];
    const followingFile = document.getElementById("following-file").files[0];

    if (followersFile && followingFile) {
        Promise.all([parseHTML(followersFile), parseHTML(followingFile)]).then(
            ([followersData, followingData]) => {
                const followers = Object.keys(followersData);
                const following = Object.keys(followingData);

                const notFollowingBack = following.filter(user => !followers.includes(user));
                const notFollowedBack = followers.filter(user => !following.includes(user));

                displayResults(notFollowingBack, notFollowedBack, followersData, followingData);
            }
        );
    } else {
        alert("Please upload both followers and following HTML files.");
    }
}

function parseHTML(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(event.target.result, "text/html");
            const users = {};

            doc.querySelectorAll("a[href*='instagram.com']").forEach(link => {
                const username = link.textContent.trim();
                const parent = link.closest("div"); // Adjust based on Instagram's structure
                let countText = parent ? parent.textContent.match(/\d+/g) : null;
                let followerCount = countText ? parseInt(countText[0], 10) : 0;
                let followingCount = countText ? parseInt(countText[1], 10) : 0;

                users[username] = { followerCount, followingCount };
            });

            resolve(users);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function displayResults(notFollowingBack, notFollowedBack, followersData, followingData) {
    const notFollowingBackList = document.getElementById("not-following-back");
    const notFollowedBackList = document.getElementById("not-followed-back");

    notFollowingBackList.innerHTML = "<h3>Not Following You Back (Sorted by Followers):</h3>";
    notFollowedBackList.innerHTML = "<h3>You Are Not Following Back (Sorted by Followers):</h3>";

    // Sort users by follower count in descending order
    notFollowingBack.sort((a, b) => (followingData[b]?.followerCount || 0) - (followingData[a]?.followerCount || 0));
    notFollowedBack.sort((a, b) => (followersData[b]?.followerCount || 0) - (followersData[a]?.followerCount || 0));

    notFollowingBack.forEach(username => {
        const listItem = document.createElement("li");
        listItem.textContent = `${username} (Followers: ${followingData[username].followerCount}, Following: ${followingData[username].followingCount})`;
        notFollowingBackList.appendChild(listItem);
    });

    notFollowedBack.forEach(username => {
        const listItem = document.createElement("li");
        listItem.textContent = `${username} (Followers: ${followersData[username].followerCount}, Following: ${followersData[username].followingCount})`;
        notFollowedBackList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", handleFiles);
});

function changeStep(direction) {
    const galleryImage = document.getElementById("gallery-image");
    const stepNumberText = document.getElementById("step-number");
    const totalSteps = 6;
    currentStep += direction;

    if (currentStep < 1) {
        currentStep = totalSteps;
    } else if (currentStep > totalSteps) {
        currentStep = 1;
    }

    galleryImage.src = `assets/step${currentStep}.png`;
    galleryImage.alt = `Step ${currentStep}`;
    
    stepNumberText.textContent = `Step ${currentStep}`;  
}