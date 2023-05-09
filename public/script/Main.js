function myFunction(userId) {
  var regular = document.getElementById("regular" + userId)
  var solid = document.getElementById("solid" + userId)
  regular.style.visibility = 'hidden';
  solid.style.visibility = 'visible';
  try {
    fetch('/api/notification/create-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        created_for: userId,
        type_id: 2,
      })
    })
      .then(notification => {
        alert("You have successfully bookmarked this user. They will be notified of this action.");
      })
      .catch(error => {
        alert(error);
      });
  } catch {
    console.error(error);
  }
}

function myFunction2(userId) {
  var regular = document.getElementById("regular" + userId)
  var solid = document.getElementById("solid" + userId)
  solid.style.visibility = 'hidden';
  regular.style.visibility = 'visible';
}


function showPopUp(user) {
  const userId = user.id;
  fetch('/api/user/users/' + userId)
    .then(response => response.json())
    .then(user => {
      var popup = document.getElementById("popup");

      var thumb = popup.querySelector(".pop-thumb img");
      var heartIcon = popup.querySelector(".pop-heart i");
      var popRatingText = popup.querySelector(".pop-rating");
      var rating = user.averageRating;
      var names = popup.querySelector(".pop-names");
      var category = popup.querySelectorAll(".pop-information li")[0];
      var location = popup.querySelectorAll(".pop-information li")[1];
      var hireButton = popup.querySelector(".pop-buttons");

      if (rating == 0) {
        heartIcon.style.backgroundImage = "linear-gradient(white, white, white, white, white)";
      }
      else if (rating <= 1) {
        heartIcon.style.backgroundImage = "linear-gradient(white, white, white, white, red)";
      }
      else if (rating <= 2) {
        heartIcon.style.backgroundImage = "linear-gradient(white, white, white, red, red)";
      }
      else if (rating <= 3) {
        heartIcon.style.backgroundImage = "linear-gradient(white, white, red, red, red)";
      }
      else if (rating <= 4) {
        heartIcon.style.backgroundImage = "linear-gradient(white, red, red, red, red)";
      }
      else if (rating <= 5) {
        heartIcon.style.backgroundImage = "linear-gradient(red, red, red, red, red)";
      }

      hireButton.dataset.user = userId;
      thumb.src = (user.gender === "Male" ? "https://bootdey.com/img/Content/avatar/avatar2.png" : "https://bootdey.com/img/Content/avatar/avatar3.png");
      names.textContent = user.firstName + " " + user.lastName;
      popRatingText.textContent = user.averageRating.toFixed(1) + "/5";
      if (rating == 0) {
        popRatingText.textContent = "-/5";
      }
      heartIcon.setAttribute("id", "h" + user.id);
      // heartLink.setAttribute("href", "/Reviews/" + user.id);
      const experienceArr = user.experience;
      var experienceString = '';
      for (let i = 0; i < experienceArr.length; i++) {
        experienceString += experienceArr[i].charAt(0).toUpperCase() + experienceArr[i].substring(1) + ', ';
      }
      category.textContent = experienceString.substring(0, experienceString.length - 2);
      location.textContent = user.country;
      hireButton.setAttribute("id", "hire-" + user.id);

      if (popup.style.display === 'none') {
        popup.style.display = "block";
      }
    })
    .catch(error => console.error(error));
}

function closePopup() {
  var popup = document.getElementById("popup");

  popup.style.display = 'none';
  table.style.filter = 'none';
  layout.style.filter = 'none';
}

function fixhearts(heart, rating) {
  if (Math.parseInt(rating) == 0) {
    heart.style.backgroundImage = "linear-gradient(white, white, white, white, white)";
  }
  if (Math.parseInt(rating) == 1) {
    heart.style.backgroundImage = "linear-gradient(white, white, white, white, red)";
  }
  if (Math.parseInt(rating) == 2) {
    heart.style.backgroundImage = "linear-gradient(white, white, white, red, red)";
  }
  if (Math.parseInt(rating) == 3) {
    heart.style.backgroundImage = "linear-gradient(white, white, red, red, red)";
  }
  if (Math.parseInt(rating) == 4) {
    heart.style.backgroundImage = "linear-gradient(white, red, red, red, red)";
  }
  if (Math.parseInt(rating) == 5) {
    heart.style.backgroundImage = "linear-gradient(red, red, red, red, red)";
  }
}

function showPartial() {
  var bars = document.getElementById("mobile-demo")
  if (bars.style.display === "block") {
    bars.style.display = "none"
  } else {
    bars.style.display = "block"
  }
}


function hireUser(button) {
  const userId = button.dataset.user; // Replace `user.id` with the ID of the specific user
  try {
    fetch('/api/notification/hire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hired_id: userId
      })
    })
      .then(notification => {
        alert("You have successfully sent a request to hire the user. They will be notified and when they respond you will be notified as well.");
      })
      .catch(error => {
        alert(error);
      });
  } catch {
    console.error(error);
  }
}
