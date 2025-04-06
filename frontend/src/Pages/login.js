import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [felhasznaloNev, setUsername] = useState('');
  const [hash, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const apiUrl = 'http://localhost:5297/Login';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      felhasznaloNev: felhasznaloNev,
      hash: hash,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Sikeres bejelentkezés!');
        console.log(data);

        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authJog', data.jog);
        localStorage.setItem('authUserId', data.id);
        localStorage.setItem('authName', data.name)

        navigate('/');
        window.location.reload();
      } else {
        setError('Hibás felhasználónév vagy jelszó');
      }
    } catch (err) {
      setError('Hiba történt a kapcsolatban');
      console.error('Bejelentkezési hiba:', err);
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
