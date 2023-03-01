import { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import axios from "axios";

function App() {
  const [user, setUser] = useState(localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) : '');
  //dodałem ternary bo pojawiał się błąd przy pierwszym ładowaniu stronu w związku z JSON.parse i brakiem argumentu (pusty localStorage), zastanawiam się, czy da się to lepiej obejść.
  

  console.log(user);

  axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");




  return (
    <div className="App">
      <AppNav />
      <AppRoutes setUser={setUser}/>
    </div>
  );
}

export default App;
