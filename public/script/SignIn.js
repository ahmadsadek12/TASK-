
function myFunction() {
  var x = document.getElementById("password_id");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}