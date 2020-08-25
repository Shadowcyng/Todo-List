
  import firebase from 'firebase'

  const fireabseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7C1bwfxmjzrm3YTDqNXBpctibQKjrsr8",
    authDomain: "todo-app-7bf02.firebaseapp.com",
    databaseURL: "https://todo-app-7bf02.firebaseio.com",
    projectId: "todo-app-7bf02",
    storageBucket: "todo-app-7bf02.appspot.com",
    messagingSenderId: "561467767909",
    appId: "1:561467767909:web:6b0ee9ed689f003bad9a8c",
    measurementId: "G-9PQRX5XBZC"
  });

const db = fireabseApp.firestore()

export default db;
  