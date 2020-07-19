import firebase from 'firebase/app';
import { firebaseApp } from './firebase';

export let user: User = {
  data: { displayName: '', watched: [] } as UserData,
  set: prompt('set'),
  update: prompt('update'),
} as any;

firebaseApp.auth().onAuthStateChanged((u) => {
  if (!u) return;
  user.data.displayName = u.displayName ?? '';
  signIn(u);
});

async function prompt(method: 'set' | 'update') {
  return async (...args: unknown[]) => {
    await auth();

    user[method](args);
  };
}

async function auth() {
  const result = await firebaseApp
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());

  if (result.user) await signIn(result.user);
}

export async function signIn({ displayName, uid }: firebase.User) {
  const users = firebaseApp.firestore().collection('users');
  user = users.doc(uid) as User;

  const doc = await user.get();
  if (!doc.exists) {
    user.set({ displayName, watched: [] } as UserData);
  }

  user.onSnapshot((u) => {
    user.data = u.data() as any;
  });
}

interface User extends firebase.firestore.DocumentReference {
  data: UserData;
}

interface UserData {
  displayName: string;
  watched: ReadonlyArray<number>;
}
