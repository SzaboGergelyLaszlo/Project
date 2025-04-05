import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [felhasznaloNev, setUsername] = useState('');
  const [hash, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // API URL
  const apiUrl = 'http://localhost:5297/Login'; // Cseréld ki a saját API URL-edre!

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Az adatok, amiket elküldünk a szervernek
    const userCredentials = {
      felhasznaloNev: felhasznaloNev,
      hash: hash,
    };
 
    try {
      // POST kérés az API felé
      const response = await axios.post(apiUrl, userCredentials, {
        headers: {
          'Content-Type': 'application/json', // JSON típusú tartalom
        },
      });
      if (response.status === 200) {
        // Ha sikeres a bejelentkezés
        alert('Sikeres bejelentkezés!');
        console.log(response);
        const token=response.data.token;
        const jog=response.data.jog;
        const userId=response.data.userId;

        localStorage.setItem('authToken', token);
        localStorage.setItem('authJog', jog);
        localStorage.setItem('authUserId',userId);
        // További logika itt (pl. irányíthatod a felhasználót egy másik oldalra)
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      // Ha hiba történik a kérés során
      if (error.response) {
        // Ha van válasz az API-tól
        setError('Hibás felhasználónév vagy jelszó');
      } else {
        // Ha nem érkezett válasz (pl. hálózati hiba)
        setError('Hiba történt a kapcsolatban');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Felhasználónév</label>
          <input
            type="text"
            id="username"
            value={felhasznaloNev}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            value={hash}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
};

export default Login;
