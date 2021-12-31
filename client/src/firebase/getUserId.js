import {
    getAuth
} from "firebase/auth";

const auth = getAuth();

const getUserId = async () => {

    return auth.currentUser.getIdToken();
}

export default getUserId;