const loginForm = document.querySelector(".login-form");
const loginFormEmail = document.querySelector(".login-form__text-input_email");
const loginFormPassword = document.querySelector(".login-form__text-input_password");
const loginFormError = document.querySelector(".login-form__error");
const loginFormSubmitButton = document.querySelector(".button__submit");

async function login({ email, password }) {
  return new Promise((resolve, reject) => {
    if (email === "user@example.com" && password === "mercdev") {
      resolve({
        name: "React Bootcamp",
        photoUrl: "https://picsum.photos/200"
      })
    } else {
      reject(new Error("Incorrect email or password"))
    }
  })
}

async function tryLogin() {
  const email = loginFormEmail.value;
  const password = loginFormPassword.value;

  disableLoginForm();
  hideLoginError();

  try {
    const user = await login({ email, password });
    showUserProfile(user);
  } catch (error) {
    showLoginError(error.message);
  } finally {
    enableLoginForm();
  }
}

function showLoginValidationError() {
  loginFormEmail.classList.add("login-form__text-input_invalid");
  loginFormPassword.classList.add("login-form__text-input_invalid");
}

function hideLoginValidationError() {
  loginFormEmail.classList.remove("login-form__text-input_invalid");
  loginFormPassword.classList.remove("login-form__text-input_invalid");
}

function showLoginError(message) {
  loginFormError.innerText = message;
  loginFormError.removeAttribute("hidden");
  showLoginValidationError();
}

function hideLoginError() {
  loginFormError.setAttribute("hidden", "true");
  hideLoginValidationError();
}

function disableLoginForm() {
  loginFormEmail.setAttribute("disabled", "true");
  loginFormPassword.setAttribute("disabled", "true");
  loginFormSubmitButton.setAttribute("disabled", "true");
}

function enableLoginForm() {
  loginFormEmail.removeAttribute("disabled");
  loginFormPassword.removeAttribute("disabled");
  loginFormSubmitButton.removeAttribute("disabled");
}

loginFormSubmitButton.addEventListener("click", tryLogin);
loginFormEmail.addEventListener("input", hideLoginValidationError);
loginFormPassword.addEventListener("input", hideLoginValidationError);

const userProfile = document.querySelector(".user-profile");
const userProfileName = document.querySelector(".user-profile__name");
const userProfileAvatar = document.querySelector(".user-profile__avatar");
const userProfileLogoutButton = document.querySelector(".button__logout");

function showUserProfile(user) {
  loginForm.setAttribute("hidden", "true");

  userProfileName.innerText = user.name;
  userProfileAvatar.setAttribute("src", user.photoUrl);
  userProfile.removeAttribute("hidden");
}

function logout() {
  window.location.reload();
}

userProfileLogoutButton.addEventListener("click", logout);
