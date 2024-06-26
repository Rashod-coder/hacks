import { initializeAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/firebase"
import {useEffect} from "react";
const AuthContext = React.createContext();




export function useAuth({
    return useContext(AuthContext);
}


export function AuthProvider({children}){
    const[currentUser, setCurrentUser] = useState(null);
    const[userLoggedin, setUserLoggedin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user){
        if(user){
            setCurrentUser({ ...user});
            setUserLoggedin(true);
        }
        else{
            setCurrentUser(null);
            setUserLoggedin(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedin,
        loading,
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}