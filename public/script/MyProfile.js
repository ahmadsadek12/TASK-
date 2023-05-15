function ExperienceButton() {
    var worker = document.getElementById("worker-radio");
    var customer = document.getElementById("customer-radio");
    var button = document.getElementById("experience-button");
    if (worker.checked) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

window.onload = function newFunction() {
    var worker = document.getElementById("worker-radio");
    var customer = document.getElementById("customer-radio");
    var button = document.getElementById("experience-button");
    if (worker.checked) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

var other = document.getElementById("other-radio");
    var pronouns = document.getElementById("pronouns");
    if (other.checked) {
        pronouns.type = "text";
    } else {
        pronouns.type = "hidden";
    }

function toggleOtherInput() {
    var pronouns = document.getElementById("pronouns");
    if (document.getElementById('other-radio').checked) {
        pronouns.style.display = 'block';
    } else {
        pronouns.style.display = 'none';
    }
}

flatpickr("#datepicker", {
    dateFormat: "d/m/Y", // specify your desired date format
    // additional options and configurations for Flatpickr can be added here
});



