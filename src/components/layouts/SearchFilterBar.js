import axios from 'axios';
import React, { useRef } from 'react';

const SearchFilterBar = ({ setCountries, fetchData, darkMode }) => {
  const countriesSearch = useRef();
  const regionFilter = useRef();

  /* SearchCountries */
  const searchCountries = () => {
    const searchValue = countriesSearch.current.value;

    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await axios.get(
          `https://restcountries.com/v2/name/${searchValue}`
        );
        const responeData = await response.data;
        setCountries(responeData);
      };
      fetchSearch();
    } else {
      fetchData();
    }
  };
  /* SearchCountries End */

  /* SelectRedion */
  const selectRegion = () => {
    const selectValue = regionFilter.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await axios.get(
          `https://restcountries.com/v2/region/${selectValue}`
        );
        const responeData = await response.data;
        setCountries(responeData);
      };

      if (selectValue === 'Filter by Region') {
        try {
          fetchData();
        } catch (error) {
          console.log(error);
        }
        return;
      }

      fetchSelect();
    }
  };
  /* SelectRedion End */

  return (
    <div className="filter_bar">
      <form className={`form_search ${darkMode ? 'dark-theme' : ''}`}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          name="search"
          className={`search ${darkMode ? 'dark-theme' : ''}`}
          placeholder="Search for a country..."
          ref={countriesSearch}
          onChange={searchCountries}
        />
      </form>
      <div className="filter-dropdown">
        <select
          name="select"
          className={`select ${darkMode ? 'dark-theme' : ''}`}
          ref={regionFilter}
          onChange={selectRegion}
        >
          <option value="Filter by Region">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
