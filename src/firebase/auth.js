import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

// Register a new user with email and password
export const doSignUpWithEmailAndPassword = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name: additionalData.name || "", // Include displayName if provided
      role: additionalData.role || "user",
      rank: additionalData.rank || "silver",
      Timestamp: serverTimestamp(),
    });

    await sendEmailVerification(user);
    
    return userCredential;
  } catch (error) {
    console.error("Error signing up with email and password:", error);
    throw error;
  }
};

// Sign in a user with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

// Sign in a user with Google
export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const token = await user.getIdToken();
    console.log("Google OAuth Token:", token);

    
    const credentialResponse = GoogleAuthProvider.credentialFromResult(result);
    console.log("Credential Response:", credentialResponse);

    console.log("User Name:", user.displayName);
    console.log("Profile Picture URL:", user.photoURL);
      
    // You can add the user to Firestore here if needed
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign in a user with Facebook
export const doSignInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // You can add the user to Firestore here if needed
    return user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

// Sign out the current user
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Send a password reset email
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Change the current user's password
export const doPasswordChange = async (password) => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }

  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Send email verification to the current user
export const doSendEmailVerification = async () => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }

  try {
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
};
