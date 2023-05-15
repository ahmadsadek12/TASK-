function replyToRequest(event, status) {
  const div = event.target.parentNode;
  const notificationId = div.dataset.notif;
  const userId = div.dataset.user;
  let answer = '';
  if (status === 1) {
    answer = 'Hire request accepted.';
  } else {
    answer = 'Hire request rejected.';
  }

  fetch('/api/notification/respond/' + notificationId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      created_for: userId,
      is_pending: false,
      is_approved: status === 1 ? true : false,
      is_rejected: status === 0 ? true : false,
      type_id: 4,
      extra_data: {
        response: answer
      }
    })
  })
    .then(notification => {
      location.reload();
    })
    .catch(error => {
      alert(error);
    });
}

function deleteNotif(event) {
  const div = event.target.parentNode;
  const notificationId = div.dataset.notif;

  fetch('/api/notification/delete-notification/' + notificationId, {
    method: 'DELETE'
  })
    .then(notification => {
      location.reload();
      alert("You have successfully deleted Notification")
    })
    .catch(error => {
      alert(error);
      alert("Unable to delete Notification")
    });
}

function notifs() {
  var hireButton = document.getElementById("hire")
  var bookmarkButton = document.getElementById("bookmarks")
  var reviewsButton = document.getElementById("reviews")
  var hire = document.getElementById("hire-notifs")
  var bookmark = document.getElementById("bookmark-notifs")
  var reviews = document.getElementById("reviews-notifs")

  if (hireButton.checked) {
    bookmark.style.display = "none"
    reviews.style.display = "none"
    hire.style.display = "block"
  }

  if (bookmarkButton.checked) {
    bookmark.style.display = "block"
    reviews.style.display = "none"
    hire.style.display = "none"
  }

  if (reviewsButton.checked) {
    bookmark.style.display = "none"
    reviews.style.display = "block"
    hire.style.display = "none"
  }
}

window.onload = function noNotif() {
  var hireButton = document.getElementById("hire")
  var bookmarkButton = document.getElementById("bookmarks")
  var reviewsButton = document.getElementById("reviews")
  var hire = document.getElementById("hire-notifs")
  var bookmark = document.getElementById("bookmark-notifs")
  var reviews = document.getElementById("reviews-notifs")

  if (hireButton.checked && hire.innerText === "")
    hire.innerHTML = "<div>No one has hired you yet yet.</div>"
  if (bookmarkButton.checked && bookmark.innerText === "")
    bookmark.innerHTML = "<div>No one has bookmarked you yet yet.</div>"
  if (reviewsButton.checked && reviews.innerText === "")
    reviews.innerHTML = "<div>No one has reviewed you yet yet.</div>"

}

function noNotifClick() {
  var hire = document.getElementById("hire-notifs")
  var bookmark = document.getElementById("bookmark-notifs")
  var reviews = document.getElementById("reviews-notifs")

  if (hire.innerText === "")
    hire.innerHTML = "<div>No one has hired you yet yet.</div>"
  if (bookmark.innerText === "")
    bookmark.innerHTML = "<div>No one has bookmarked you yet yet.</div>"
  if (reviews.innerText === "")
    reviews.innerHTML = "<div>No one has reviewed you yet yet.</div>"
}

