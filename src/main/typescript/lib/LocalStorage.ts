const loggedIn = "logged-in"
const loggedInTrue = "true"

const isLoggedIn: () => boolean = () => localStorage.getItem(loggedIn) == loggedInTrue
const setLogin = () => localStorage.setItem(loggedIn, loggedInTrue)
const setLogout = () => localStorage.removeItem(loggedIn)

export default ({
    isLoggedIn: isLoggedIn,
    setLogin: setLogin,
    setLogout: setLogout,
})
