import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // API URL
  const apiUrl = 'http://localhost:5297/Login'; // Cseréld ki a saját API URL-edre!

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Az adatok, amiket elküldünk a szervernek
    const userCredentials = {
      username: username,
      password: password,
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
        // További logika itt (pl. irányíthatod a felhasználót egy másik oldalra)
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            value={password}
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