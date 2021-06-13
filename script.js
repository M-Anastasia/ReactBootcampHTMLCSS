const loginForm = document.querySelector(".login-form");
const loginFormEmail = document.querySelector(".text-input-email");
const loginFormPassword = document.querySelector(".text-input-password");
const loginFormError = document.querySelector(".login-form__error");
const loginFormSubmitButton = document.querySelector(".login-form__submit");

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
  loginFormEmail.classList.add("text-input--invalid");
  loginFormPassword.classList.add("text-input--invalid");
}

function hideLoginValidationError() {
  loginFormEmail.classList.remove("text-input--invalid");
  loginFormPassword.classList.remove("text-input--invalid");
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
const userProfileLogoutButton = document.querySelector(".user-profile__logout");

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
