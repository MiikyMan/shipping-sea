import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

// Register a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error; // Re-throw the error so it can be caught in the calling function
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
    // You can add the user to Firestore here if needed
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
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
