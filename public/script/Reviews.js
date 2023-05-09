function showPopUp(button) {

  var popup = document.getElementById("popup");
  var table = document.querySelector('.grid-container');
  if (popup.style.display === 'none') {
    popup.style.display = "block";
    table.style.filter = "blur(5px)";
  }
}

function closePopup(button) {
  var popup = document.getElementById("popup");
  var table = document.querySelector('.grid-container');
  popup.style.display = 'none';
  table.style.filter = 'none';
}

function createReview(userId) {
  try {
    const ratingInput = document.getElementById('rating-input');
    const reviewInput = document.getElementById('review-input');

    const rate = ratingInput.value;
    const review_txt = reviewInput.value;
    fetch('/api/reviews/create-review/' + userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: rate,
        review_text: review_txt,
      })
    })
      .then(review => {
        location.reload()
      })
      .catch(error => {
        alert(error);
      });

  } catch {
    console.error(error);
  }
}