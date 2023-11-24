import { initializeApp } from "firebase/app";
import { getFirestore , collection } from "firebase/firestore";
const firebaseConfig ={

    apiKey: "AIzaSyArxAGcJAMt6CPC9IO-Dk47yA1Ieek-1BU",
    authDomain: "agribix-c1cd1.firebaseapp.com",
    projectId: "agribix-c1cd1",
    storageBucket: "agribix-c1cd1.appspot.com",
    messagingSenderId: "72598448047",
    appId: "1:72598448047:web:c646549501911d9cb1715a",
    measurementId: "G-HF5NSG3W3Z"
};
  
// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'Agriculturalproducts')


// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})


// fetching a single document (& realtime)
const docRef = doc(db, 'Agriculturalproducts', 'gGu4P9x0ZHK9SspA1d9j')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, '/Agriculturalproducts', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})