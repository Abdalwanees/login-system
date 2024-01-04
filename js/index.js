var UserNameInput = document.getElementById("UserName");
var EmailInput = document.getElementById("Email");
var PasswordInput = document.getElementById("Password");
var Login = document.getElementById("Login");
var SignUp = document.getElementById("SignUp");
var signUpLink = document.getElementById("signUpLink");
var signInLink = document.getElementById("signInLink");
var p1 = document.querySelector(".p1");
var p2 = document.querySelector(".p2");
// var logform = document.querySelector(".logform");
var navbar = document.querySelector(".navbar");
var logout = document.getElementById("logOut");
var InValid = document.getElementById("InVaid");
var InValidValue = document.getElementById("InVaildValue");
var content = document.querySelector(".content");
var logmessage = document.getElementById("logmessage");
var PersonsInfo;
if (localStorage.getItem("ClintInfo")) {
  PersonsInfo = JSON.parse(localStorage.getItem("ClintInfo"));
} else {
  PersonsInfo = [];
}
// localStorage.clear()

// --------------events-----------------
signUpLink.addEventListener("click", signUpForm);
signInLink.addEventListener("click", signInForm);
logout.addEventListener("click", function () {
  content.classList.toggle("d-none");
  navbar.classList.toggle("d-none");
  ClearForm();
  InValid.classList.add("d-none");
  logmessage.classList.toggle("d-none");
});
Login.addEventListener("click", function () {
  var found = false;
  for (var i = 0; i < PersonsInfo.length; i++) {
    if (PersonsInfo[i].Email == EmailInput.value) {
      found = true;
      if (PersonsInfo[i].Password == PasswordInput.value) {
        navbar.classList.toggle("d-none");
        content.classList.toggle("d-none");
        logmessage.classList.toggle("d-none");
        logmessage.innerHTML = `Welcome ${PersonsInfo[i].Name}`;
        break;
      } else {
        InValid.classList.toggle("d-none");
        InValidValue.innerHTML = " Password is incorrect";
        break;
      }
    }
  }
  if (!found) {
    InValid.classList.toggle("d-none");
    InValidValue.innerHTML =
      " Do you have an account? Please sign up or enter a valid email";
  }
});

SignUp.addEventListener("click", function () {
  if (ValidationName() == true && ValidationEmail() == true) {
    var emailExists = false;
    for (var i = 0; i < PersonsInfo.length; i++) {
      if (EmailInput.value == PersonsInfo[i].Email) {
        emailExists = true;
        break;
      }
    }
    if (emailExists) {
      InValid.classList.toggle("d-none");
      InValidValue.innerHTML = " Email already exists";
    } else {
      var ClintInfo = {
        Name: UserNameInput.value,
        Email: EmailInput.value,
        Password: PasswordInput.value,
      };
      PersonsInfo.push(ClintInfo);
      localStorage.setItem("ClintInfo", JSON.stringify(PersonsInfo));
      ClearForm();
      signInForm();
    }
  } else {
    InValid.classList.toggle("d-none");
    InValidValue.innerHTML = "Invalid inputs";
  }
});
//------------validation Event-------------------
UserNameInput.addEventListener("input", ValidationName);
EmailInput.addEventListener("input", ValidationEmail);

//-------------functions---------------
// function sayHellow() {
// }
function signUpForm() {
  UserNameInput.classList.toggle("d-none");
  Login.classList.toggle("d-none");
  SignUp.classList.toggle("d-none");
  p1.classList.toggle("d-none");
  p2.classList.toggle("d-none");
}
function signInForm() {
  UserNameInput.classList.toggle("d-none");
  Login.classList.toggle("d-none");
  SignUp.classList.toggle("d-none");
  p1.classList.toggle("d-none");
  p2.classList.toggle("d-none");
}

//-----------validation--------------
function ValidationName() {
  var name = UserNameInput.value;
  var regxName = /^([A-Z]{1}[a-z]{2,8}\s?){2}$/;
  if (name == "") {
    UserNameInput.classList.remove("is-invalid");
    UserNameInput.classList.remove("is-valid");
    return false;
  } else if (regxName.test(name)) {
    UserNameInput.classList.add("is-valid");
    UserNameInput.classList.remove("is-invalid");
    return true;
  } else {
    UserNameInput.classList.add("is-invalid");
    UserNameInput.classList.remove("is-valid");
    return false;
  }
}
function ValidationEmail() {
  var Email = EmailInput.value;
  var regxEmail = /^([A-Za-z]{3,8}\s?){1,2}\d{0,5}\@([a-z]{2,8}\.?)*$/;
  if (Email == "") {
    EmailInput.classList.remove("is-invalid");
    EmailInput.classList.remove("is-valid");
    return false;
  } else if (regxEmail.test(Email)) {
    EmailInput.classList.add("is-valid");
    EmailInput.classList.remove("is-invalid");
    return true;
  } else {
    EmailInput.classList.add("is-invalid");
    EmailInput.classList.remove("is-valid");
    return false;
  }
}
function ClearForm() {
  UserNameInput.value = "";
  EmailInput.value = "";
  PasswordInput.value = "";
  UserNameInput.classList.remove("is-invalid");
  EmailInput.classList.remove("is-invalid");
  UserNameInput.classList.remove("is-valid");
  EmailInput.classList.remove("is-valid");
}
