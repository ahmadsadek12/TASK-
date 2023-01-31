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

 