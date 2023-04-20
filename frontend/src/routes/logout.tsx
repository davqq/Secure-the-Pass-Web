const logout = () => {
  document.cookie = "";
  window.location.replace("/login");
  return null;
};

export default logout;
