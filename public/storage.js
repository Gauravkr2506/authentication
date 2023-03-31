let basicAuthToken;
let userDetails;

export function getBasicAuthToken() {
  if (basicAuthToken) {
    return basicAuthToken;
  }

  basicAuthToken = localStorage.getItem("basicAuthToken");
  return basicAuthToken;
}
export function setBasicAuthToken(token) {
  basicAuthToken = token;
  localStorage.setItem("basicAuthToken", basicAuthToken);
}

export function getUserDetail() {
  if (userDetails) {
    return userDetails;
  }
  userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    return JSON.parse(userDetails);
  }

  return false;
}

export function setUserDetail(data) {
  userDetails = data;
  localStorage.setItem("authString", JSON.stringify(userDetails));
}
