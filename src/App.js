import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './css/style.css';
// Components
import NavbarHeader from './components/layouts/NavbarHeader';
import SearchFilterBar from './components/layouts/SearchFilterBar'
import CountriesHomePage from './components/CountriesHomePage';
import CountryDetailPage from './components/CountryDetailPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    setLoading(true)
    const response = await axios.get('https://restcountries.com/v2/all')
    const responseData = await response.data
    setCountries(responseData)
    setLoading(false)
  };

  const changeTheme = () => {
    setDarkMode((prevState) => !prevState);
  };
  
  return (
    <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
      <NavbarHeader changeTheme={changeTheme} darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchFilterBar setCountries={setCountries} fetchData={fetchData} darkMode={darkMode}/>
              <CountriesHomePage countries={countries} darkMode={darkMode} loading={loading} />
            </>
          }
        />
        <Route
          path="/country/:code"
          element={<CountryDetailPage darkMode={darkMode} loading={loading} setLoading={setLoading} />}
        />
      </Routes>
    </div>
  );
}

export default App;
