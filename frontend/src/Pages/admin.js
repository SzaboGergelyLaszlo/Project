import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [felhasznaloNev, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setSex] = useState('');
  const [role, setRole] = useState('');
  const [kep, setKep] = useState(null); // fájl típus
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const salt = '';

  const apiUrl = 'http://localhost:5297/Registry';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hash !== confirmPassword) {
      setError('A két jelszó nem egyezik');
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('FelhasznaloNev', felhasznaloNev);
    formData.append('Salt', salt);
    formData.append('Hash', hash);
    formData.append('Email', email);
    formData.append('Sex', sex);
    formData.append('Role', 2);
    formData.append('Joined', new Date().toISOString());
    formData.append('Kep', kep || ''); // ha nincs kép, üres string

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        },
        body: formData
      });

      if (response.ok) {
        alert('Sikeres regisztráció!');
        setSuccessMessage('Sikeres regisztráció!');
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSex('');
        setRole('');
        setKep(null);
        setError('');
      } else {
        setError('A regisztráció során hiba történt');
      }
    } catch (err) {
      console.error(err);
      setError('Hiba történt a kapcsolatban');
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
          <label htmlFor="sex">Nem:</label>
          <input
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kep">Profilkép (opcionális):</label>
          <input
            type="file"
            id="kep"
            accept="image/*"
            onChange={(e) => setKep(e.target.files[0])}
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
