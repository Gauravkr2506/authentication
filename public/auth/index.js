import {
  isUserLoginBasicAuth,
  loginUserBasicAuth,
  registerUserBasicAuth,
  setDataBasicAuth,
  getDataBasicAuth,
} from "./basicAuth.js";
import { authType } from "./../constant.js";

export async function isUserLogin(type) {
  switch (type) {
    case authType.BASIC_AUTH:
      return isUserLoginBasicAuth();

    default:
      return false;
  }
}

export async function loginUser(type, email, password) {
  switch (type) {
    case authType.BASIC_AUTH:
      return loginUserBasicAuth(email, password);

    default:
      return false;
  }
}

export async function registerUser(type, name, email, password) {
  switch (type) {
    case authType.BASIC_AUTH:
      return registerUserBasicAuth(name, email, password);

    default:
      return false;
  }
}

export async function setData(type, data) {
  switch (type) {
    case authType.BASIC_AUTH:
      return setDataBasicAuth(data);

    default:
      return false;
  }
}

export async function getData(type) {
  switch (type) {
    case authType.BASIC_AUTH:
      return getDataBasicAuth();

    default:
      return false;
  }
}
