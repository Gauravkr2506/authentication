import {
  getBasicAuthToken,
  setBasicAuthToken,
  setUserDetail,
} from "./../storage.js";
import { BASE_URL } from "./../constant.js";

export async function isUserLoginBasicAuth() {
  return false;
}

export async function registerUserBasicAuth(name, email, password) {
  return fetch(BASE_URL + "registerUserBasicAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((resData) => {
      console.log(resData);
      const { name, email, token, data } = resData;
      setBasicAuthToken(token);
      setUserDetail({ name, email, data });
      return resData;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

export async function loginUserBasicAuth(email, password) {
  return fetch(BASE_URL + "loginBasicAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((resData) => {
      const { name, email, token, data } = resData;
      setBasicAuthToken(token);
      setUserDetail({ name, email, data });
      return resData;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

export async function setDataBasicAuth(data) {
  const token = getBasicAuthToken();
  return fetch(BASE_URL + "setDataBasicAuth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

export async function getDataBasicAuth() {
  const token = getBasicAuthToken();
  return fetch(BASE_URL + "getDataBasicAuth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}
