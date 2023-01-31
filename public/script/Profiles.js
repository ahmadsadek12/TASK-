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