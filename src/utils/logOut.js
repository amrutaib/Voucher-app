export const logOut = (navigate) => {
    localStorage.clear();
    navigate('/login');
}

export const getDecodedToken = (token) =>{
    try{
        const base64Url = token.split('.')[1];
        console.log(base64Url)
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        console.log(base64)
        const jsonPayload = atob(base64);
        console.log(jsonPayload)
        return JSON.parse(jsonPayload);
    }catch(err){
        return null;
    }
}

export const isTokenExpired = (token) => {
    const decodedToken = getDecodedToken(token);
    if (!decodedToken || !decodedToken.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime);
    return decodedToken.exp < currentTime;
}
