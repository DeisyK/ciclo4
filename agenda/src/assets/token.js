const token = {
  setToken: (token) => {
    localStorage.setItem("login", token);
  },
  getToken: () => {
    return localStorage.getItem("login");
  },
};
export default token;
