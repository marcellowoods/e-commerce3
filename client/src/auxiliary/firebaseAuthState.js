import {
    onAuthStateChanged as onAuthStateChangedFirebase,
    getAuth
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


let onAuthStateChanged = (isLoading, setIsLoading, getUserFromServer, onSuccessUserFromServer, onFirebaseLogout) => {

    return onAuthStateChangedFirebase(auth, async (user) => {

        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            console.log("user", user);

            getUserFromServer(idTokenResult.token)
                .then((res) => {
                    onSuccessUserFromServer(res, idTokenResult);
                    if (isLoading) {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err)
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