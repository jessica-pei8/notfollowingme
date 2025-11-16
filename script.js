let currentStep = 1;

function handleFiles() {
    const followersFile = document.getElementById("followers-file").files[0];
    const followingFile = document.getElementById("following-file").files[0];
  
    if (followersFile && followingFile) {
      Promise.all([parseHTML(followersFile), parseHTML(followingFile)]).then(
        ([followers, following]) => {
          const notFollowingBack = following.filter(
            (user) => !followers.includes(user)
          );
  
          const notFollowedBack = followers.filter(
            (user) => !following.includes(user)
          );
  
          displayResults(notFollowingBack, notFollowedBack);
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

      let users = [];

      // Case 1: followers file (usernames inside <a>)
      let followerLinks = doc.querySelectorAll("a[href*='instagram.com']");
      if (followerLinks.length > 0) {
        users = Array.from(followerLinks).map(link =>
          link.textContent.trim()
        );
      }

      // Case 2: following file (usernames inside <h2>)
      let h2s = doc.querySelectorAll("h2");
      if (h2s.length > 0 && users.length === 0) {
        users = Array.from(h2s).map(h2 => h2.textContent.trim());
      }

      resolve(users);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function displayResults(notFollowingBack, notFollowedBack) {
    const notFollowingBackList = document.getElementById("not-following-back");
    const notFollowedBackList = document.getElementById("not-followed-back");
  
    notFollowingBackList.innerHTML = "<h3>Not Following You Back:</h3>";
    const notFollowingBackCount = notFollowingBack.length;
    const notFollowingBackCountElem = document.createElement("p");
    notFollowingBackCountElem.textContent = `Count: ${notFollowingBackCount}`;
    notFollowingBackList.appendChild(notFollowingBackCountElem);
    notFollowingBack.forEach((username) => {
      const listItem = document.createElement("li");
      listItem.textContent = username;
      notFollowingBackList.appendChild(listItem);
    });
  
    notFollowedBackList.innerHTML = "<h3>You Are Not Following Back:</h3>";
    const notFollowedBackCount = notFollowedBack.length;
    const notFollowedBackCountElem = document.createElement("p");
    notFollowedBackCountElem.textContent = `Count: ${notFollowedBackCount}`;
    notFollowedBackList.appendChild(notFollowedBackCountElem);
    notFollowedBack.forEach((username) => {
      const listItem = document.createElement("li");
      listItem.textContent = username;
      notFollowedBackList.appendChild(listItem);
    });
}

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

document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", handleFiles);
});