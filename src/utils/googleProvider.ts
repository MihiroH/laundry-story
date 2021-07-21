import { UserType } from '../plugins/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

class GoogleProvider {
  provider;
  errorCode: string = '';
  errorMessage: string = '';
  user: UserType = null;
  email: string = '';
  token: string | undefined = '';

  constructor() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    // this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      login_hint: 'user@example.com'
    });
  }

  async signIn() {
    try {
      await firebase.auth().signInWithRedirect(this.provider);
    } catch (error) {
      this.errorCode = error.code;
      this.errorMessage = error.message;
      this.email = error.email;
    }
  }

  async signInRedirectResult() {
    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.credential) {
        const credential: firebase.auth.OAuthCredential = result.credential;
        this.token = credential.accessToken;
      }
      this.user = result.user;
    } catch (error) {
      this.errorCode = error.code;
      this.errorMessage = error.message;
      this.email = error.email;
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
      window.location.pathname = '/';
    } catch (error) {
      this.errorCode = error.code;
      this.errorMessage = error.message;
    }
  }

  isEqualCurrentUserUid(user: UserType, uid: string) {
    if (!uid) {
      return false;
    }
    if (!user) {
      return false;
    }
    return user.uid === uid;
  }

  onAuthStateChanged(callback: (user: firebase.User | null) => void) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      callback(user || null);
    });
  }
}

export default GoogleProvider;
