import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4XRzr1zGh74NvH6JtTwiqgc8jFYE9rkk',
  authDomain: 'yttodoapp-e0680.firebaseapp.com',
  databaseURL: 'https://yttodoapp-e0680.firebaseio.com',
  projectId: 'yttodoapp-e0680',
  storageBucket: 'yttodoapp-e0680.appspot.com',
  messagingSenderId: '253720490949',
  appId: '1:253720490949:web:0afd664a9a7826f64a11ac',
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback){
      let ref = firebase.firestore().collection('users').doc(this.userId).collection('lists')

      this.unsubscribe = ref.onSnapshot(snapshot => {
          lists = []

          snapshot.forEach(doc => {
              lists.push({id: doc.id, ...doc.data()})
          })

          callback(lists)
      })
  }

  get userId(){
      return firebase.auth().currentUser.uid
  }

  detach() {
      this.unsubscribe()
  }
}

export default Fire;
