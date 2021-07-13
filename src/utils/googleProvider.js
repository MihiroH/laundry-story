import firebase from 'firebase/app';
import 'firebase/auth';

class GoogleProvider {
  constructor() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    // this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      login_hint: 'user@example.com'
    });
  }

  async signIn() {
    try {
      const result = await firebase.auth().signInWithRedirect(this.provider);
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      this.token = credential.accessToken;
      // The signed-in user info.
      this.user = result.user;
    } catch (error) {
      // Handle Errors here.
      this.errorCode = error.code;
      this.errorMessage = error.message;
      // The email of the user's account used.
      this.email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
    }
  }

  async signInRedirectResult() {
    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.token = credential.accessToken;
      }
      // The signed-in user info.
      this.user = result.user;
    } catch (error) {
      // Handle Errors here.
      this.errorCode = error.code;
      this.errorMessage = error.message;
      // The email of the user's account used.
      this.email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // this.credential = error.credential;
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      this.errorCode = error.code;
      this.errorMessage = error.message;
    }
  }

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(user => {
      return callback(user || null);
    });
  }
}

export default GoogleProvider;