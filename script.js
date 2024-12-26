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
        const users = Array.from(doc.querySelectorAll("a[href*='instagram.com']")).map(
          (link) => link.textContent.trim()
        );
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
    currentStep += direction;
    
    if (currentStep < 1) {
        currentStep = 6;
    } else if (currentStep > 6) {
        currentStep = 1;
    }

    const galleryImage = document.getElementById("gallery-image");
    galleryImage.src = `assets/step${currentStep}.png`;
    galleryImage.alt = `Step ${currentStep}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", handleFiles);
});
