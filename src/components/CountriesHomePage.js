import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading/Loading';

const CountriesHomePage = ({countries, darkMode, loading}) => {
  // console.log(countries);
  return (
    <>
      {loading 
      ? 
        <Loading /> 
      : 
        <section className={`container-homepage ${darkMode ? 'dark-theme' : ''}`}>
        {countries.map((values, index) => {
          const { alpha3Code,name, population, region, capital, flag } = values;
          return (
            <article key={index}>
              <div>
                <Link to={`/country/${alpha3Code}`}>
                  <img src={flag} alt={name} />
                </Link>
                <div className={`item_card_details ${darkMode ? 'dark-theme' : ''}`}>
                  <h3>{name}</h3>
                  <h4>
                    Population: <span>{new Intl.NumberFormat().format(population)}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital}</span>
                  </h4>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      }
    </>
  );
};

export default CountriesHomePage;
