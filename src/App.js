import { useState, useEffect } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import axios from "axios";

function App() {
  /* const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-info')));
 */
  //dodałem ternary bo pojawiał się błąd przy pierwszym ładowaniu stronu w związku z JSON.parse i brakiem argumentu (pusty localStorage), zastanawiam się, czy da się to lepiej obejść.

  const [user, setUser] = useState(localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : '');

  axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");

  const [showPopup, setShowPopup] = useState(false);


  useEffect(
    () => {
      const timer = setTimeout(
        () => {
          /* Uruchamiam wyświetlanie pop-upa tylko jeśli nikt nie jest akurat zalogowany*/
          if (!user) { setShowPopup(true) }
        },
        5000
      );

      return (() => {
        clearTimeout(timer)
      })
    }, []);


  return (
    <div className="App">
      <AppNav setUser={setUser} user={user} />
      <AppRoutes setUser={setUser} user={user} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
}

export default App;
