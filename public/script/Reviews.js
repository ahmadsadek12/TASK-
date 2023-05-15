function showPopUp(button) {

  var popup = document.getElementById("popup");
  var body = document.getElementById("body");
  if (popup.style.display === 'none') {
    popup.style.display = "block";
    body.style.filter = "blur(5px)";
  }
}

function closePopup(button) {
  var popup = document.getElementById("popup");
  var body = document.getElementById("body");
  popup.style.display = 'none';
  body.style.filter = 'none';
}

function createReview(userId) {
  try {
    const ratingInput = document.getElementById('rating-input');
    const reviewInput = document.getElementById('review-input');
    const fieldsInput = document.getElementById('fields-input');

    const rate = ratingInput.value;
    const review_txt = reviewInput.value;
    const fields_txt = fieldsInput.value;
    fetch('/api/reviews/create-review/' + userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: rate,
        review_text: review_txt,
        fields_text: fields_txt,
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