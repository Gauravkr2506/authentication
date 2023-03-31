import { hideElement, showFlexElement, showBlockElement } from "./common.js";
import {
  isUserLogin,
  loginUser,
  registerUser,
  setData,
  getData,
} from "./auth/index.js";
import { authType } from "./constant.js";

const buttonContainer = document.querySelector(".buttonContainer");
const activityContainer = document.querySelector(".activityContainer");
const loginFormContainer = document.querySelector("#loginFormContainer");
const userName = document.querySelector("#userName");
const registrationFormContainer = document.querySelector(
  "#registrationFormContainer"
);
const textAreaContainer = document.querySelector("#textAreaContainer");
const myNotes = document.querySelector("#myNotes");

const basicButton = document.querySelector("#basicButton");
const loginButton = document.querySelector("#loginButton");
const logoutBtn = document.querySelector("#logoutBtn");
const loginSubmitButton = document.querySelector("#loginSubmitButton");
const saveNotesButton = document.querySelector("#saveNotesButton");

const registrationButton = document.querySelector("#registrationButton");
const registrationSubmitButton = document.querySelector(
  "#registrationSubmitButton"
);

const emailLogin = document.querySelector("#emailLogin");
const passwordLogin = document.querySelector("#passwordLogin");

const nameRegistration = document.querySelector("#nameRegistration");
const emailRegistration = document.querySelector("#emailRegistration");
const passwordRegistration = document.querySelector("#passwordRegistration");

let currentFlow = "";

basicButton.addEventListener("click", () => StartFlow(authType.BASIC_AUTH));

loginButton.addEventListener("click", onLoginBtnClick);
logoutBtn.addEventListener("click", onLogoutBtnClick);
loginSubmitButton.addEventListener("click", onLoginSubmitBtnClick);

registrationButton.addEventListener("click", onRegistrationButtonClick);
registrationSubmitButton.addEventListener(
  "click",
  onRegistrationSubmitButtonClick
);

saveNotesButton.addEventListener("click", onSaveNotesButtonClick);

function onRegistrationButtonClick() {
  hideElement(activityContainer);
  showFlexElement(registrationFormContainer);
}

function StartFlow(flow) {
  currentFlow = flow;
  hideElement(buttonContainer);
  getData(currentFlow)
    .then((data) => {
      showFlexElement(textAreaContainer);
      myNotes.value = data.data;
      userName.textContent = data.name;
      showBlockElement(userName);
      showBlockElement(logoutBtn);
    })
    .catch((err) => {
      console.log(err);
      showFlexElement(activityContainer);
    });
}

async function onLoginBtnClick() {
  hideElement(activityContainer);
  const isLogin = await isUserLogin(currentFlow);

  if (isLogin) {
    // handle login user;
    return;
  }
  showFlexElement(loginFormContainer);
}

async function onLoginSubmitBtnClick() {
  const email = emailLogin.value.trim();
  const password = passwordLogin.value.trim();
  if (email.length < 2 || password.length < 3) {
    alert("EMAIL or PASSWORD too short");
    return;
  }
  loginUser(currentFlow, email, password)
    .then((data) => {
      hideElement(loginFormContainer);
      alert("Login Success");
      showFlexElement(textAreaContainer);
      myNotes.value = data.data;
      showBlockElement(logoutBtn);
      userName.textContent = data.name;
      showBlockElement(userName);
    })
    .catch((err) => {
      alert(err);
    });
}

async function onRegistrationSubmitButtonClick() {
  const name = nameRegistration.value.trim();
  const email = emailRegistration.value.trim();
  const password = passwordRegistration.value.trim();
  if (email.length < 2 || password.length < 3 || name.length < 2) {
    alert(
      "Oops! Name or EMAIL or PASSWORD too short, please fill valid details"
    );
    return;
  }

  registerUser(currentFlow, name, email, password)
    .then((data) => {
      hideElement(registrationFormContainer);
      alert("Login Success");
      showFlexElement(textAreaContainer);
      showBlockElement(logoutBtn);
      userName.textContent = data.name;
      showBlockElement(userName);
    })
    .catch((err) => {
      alert(err);
    });
}

async function onSaveNotesButtonClick() {
  const data = myNotes.value;
  setData(currentFlow, data)
    .then((data) => {
      alert("data save successfully");
    })
    .catch((err) => {
      alert(err);
    });
}

function onLogoutBtnClick() {
  localStorage.clear();
  window.location.reload();
}

function showTextEditor() {}
