function myFunction() {
    var other = document.getElementById("other-radio");
    var pronouns = document.getElementById("pronouns");
    var gender = document.getElementById("genderop");
    if (other.checked) {
        pronouns.type = "text";
        gender.type = "text";
    } else {
        pronouns.type = "hidden";
        gender.type = "hidden";
    }
}

function ExperienceButton() {
    var worker = document.getElementById("worker-radio");
    var customer = document.getElementById("customer-radio");
    var button = document.getElementById("experience-button");
    if (worker.checked) {
        button.style.display = "block";
    } else{
        button.style.display = "none";
    }
}

window.onload = function newFunction() {
    var worker = document.getElementById("worker-radio");
    var customer = document.getElementById("customer-radio");
    var button = document.getElementById("experience-button");
    if (worker.checked) {
        button.style.display = "block";
    } else{
        button.style.display = "none";
    }
}

