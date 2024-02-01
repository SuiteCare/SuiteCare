const logout = () => {
  localStorage.removeItem('login_info');
  localStorage.removeItem('access_token');
  localStorage.removeItem('expiration_time');
};

export default logout;
