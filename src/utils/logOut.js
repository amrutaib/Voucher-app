const logOut = (navigate) => {
    localStorage.clear();
    navigate('/login');
};

export default logOut
