import {
    onAuthStateChanged as onAuthStateChangedFirebase,
    getAuth,
    // onIdTokenChanged 
    
} from "firebase/auth";

const auth = getAuth();

//example use in App.js
// const App = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(isLoading, setIsLoading, currentUser, onCurrentUserSuccess);
//         // cleanup
//         return () => unsubscribe();
//     }, [dispatch]);

//     if (isLoading) {
//         return <LoadingPage />
//     }
//     return (<></>)
// }

//https://pretagteam.com/question/firebase-authentication-with-angular-how-to-keep-user-session-active-when-tabs-are-closed-onidtokenchanged-vs-onauthstatechanged
let onAuthStateChanged = (isLoading, setIsLoading, getUserFromServer, onSuccessUserFromServer, onFirebaseLogout) => {

    return onAuthStateChangedFirebase(auth, async (user) => {

        // console.log(user);

        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const getToken = async () => user.getIdToken();
            // console.log("id token");
            // console.log(idTokenResult.token)
            // console.log("user", user);

            getUserFromServer(idTokenResult.token)
                .then((res) => {
                    onSuccessUserFromServer(res, getToken);
                    if (isLoading) {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    alert(err)
                    if (isLoading) {
                        setIsLoading(false);
                    }
                });
        }else{
            onFirebaseLogout();
            if (isLoading) {
                setIsLoading(false);
            }
        }

    });
}


export default onAuthStateChanged;