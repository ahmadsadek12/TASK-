window.onload = function workerFunction(){
    var user = document.getElementById("user-type");
    var experience = document.getElementById("experience");
    var button = document.getElementById("button");

    if(user.textContent == "Worker"){
        experience.style.display = "block";
        button.style.display = "block";

    }
    else{
        experience.style.display = "none";
        button.style.display = "none";
    }
}


function hireUser(userId) {
  
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
  }