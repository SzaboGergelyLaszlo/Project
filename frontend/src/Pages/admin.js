import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [felhasznaloNev, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setSex] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const salt ="";

  // API URL
  const apiUrl = 'http://localhost:5297/Registry'; // Cseréld ki a saját API URL-edre!

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ellenőrizd, hogy a jelszavak egyeznek-e
    if (hash !== confirmPassword) {
      setError('A két jelszó nem egyezik');
      return;
    }

    // Az adatokat JSON-ban küldjük
    const userCredentials = {
      name,
      felhasznaloNev,
      salt,
      hash,
      email,
      sex,
      role:2
    };
    console.log(userCredentials);

    try {
      // POST kérés az API felé
      const response = await axios.post(apiUrl, userCredentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Ha sikeres a regisztráció
        alert('Sikeres regisztráció!');
        setSuccessMessage('Sikeres regisztráció!');
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSex('');
        setError('');
        setRole('');
      }
    } catch (error) {
      // Ha hiba történik
      if (error.response) {
        // Ha van válasz az API-tól
        setError('A regisztráció során hiba történt');
      } else {
        // Ha nem érkezett válasz (pl. hálózati hiba)
        setError('Hiba történt a kapcsolatban');
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Jelszó megerősítése</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Sex">Nem:</label>
          <input
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit">Regisztrálás</button>
      </form>
    </div>
  );
};

export default Register;