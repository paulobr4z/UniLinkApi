import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAV0S6rv5th3Iy_lx__uXf72vZxsMT418I",
  authDomain: "single-link-88071.firebaseapp.com",
  projectId: "single-link-88071",
  storageBucket: "single-link-88071.appspot.com",
  messagingSenderId: "860834027267",
  appId: "1:860834027267:web:09c2c21da01dd4948cfb36",
  measurementId: "G-FEW74WRQSL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);