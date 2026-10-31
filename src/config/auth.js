

import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile,
    GoogleAuthProvider, signInWithEmailAndPassword, 
    signInWithPopup} 
from "firebase/auth";


export const docreateUserWithAndPassword = async (email, password, username) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: username })
    return result
};



export const doSignInWithEmailAndPassword = async (email, password) => {

    return signInWithEmailAndPassword(auth, email, password)
};

export const doSignInWithGoogle = async() => {

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    return result;
}

export const doSignOut = () => {

    return auth.signOut()
}