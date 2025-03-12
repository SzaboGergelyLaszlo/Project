import { useState } from 'react';
import './App.css';
import GetAllFilm from './Components/GetAllFilm';

function App() {
  const [count, setCount] = useState(0)

  const handleCount = () =>
  {
    setCount(count + 1)
  }

  console.log(count)

    return (
      <div className='container'>
        <GetAllFilm count={count} handleCount={handleCount} />
      </div>
    );
}

export default App;
