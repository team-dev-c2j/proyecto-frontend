import { createContext, useState, useContext, useEffect  } from "react"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js"
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used whitin an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])


    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if (errors.length < 0) {
            const timer = setTimeout(() => {
                setErrors([])
            },5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookies.get()


            if (!cookies.token){
                setIsAuthenticated(false)
                console.log(cookies.token)
                return setUser(null)
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
               if (!res.data) {
                    setIsAuthenticated(false)
                    return 
                }
                    
                setIsAuthenticated(true)
                setUser(res.data)
            } catch(err) {
                setIsAuthenticated(false)
                setUser(null)
            }
            
        }
        checkLogin()
    },[])



    return (
        <AuthContext.Provider value= {{signup, signin,  user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>

    )
}

