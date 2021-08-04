const token = {
  setToken: (token) => {
    localStorage.setItem("login", token);
  },
  removeToken: () => {
    localStorage.removeItem("login");
  },
  getToken: () => {
    if (localStorage.getItem("login")) {
      return localStorage.getItem("login");
    } else {
      return false;
    }
  },
};
export default token;
