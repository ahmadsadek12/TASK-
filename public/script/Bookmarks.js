  function removeBookmark(userId) {

    fetch(`/api/user/Bookmarks/${userId}`, {
        method: 'DELETE',
      })
      .then(notification => {
        location.reload()
      })
      .catch(error => {
        alert(error);
        alert("Unable to delete Bookmark")
      });
  }