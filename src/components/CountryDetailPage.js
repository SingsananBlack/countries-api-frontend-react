import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './loading/Loading';

const CountryDetailPage = ({darkMode, loading, setLoading}) => {
  const [country, setCountry] = useState([]);
  const { code } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true)
      const response = await axios.get(`https://restcountries.com/v2/alpha/${code}`)
      const responseData = await response.data
      setCountry(responseData)
      setLoading(false)
    };
    fetchData()
  }, [code, setLoading]);
  // console.log(country);
  
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = country;

  return (
    <>
      <div className="country_container">
        <Link to={`/`} className={`btn ${darkMode ? 'dark-theme' : ''}`}>
          <i className="fas fa-arrow-left"></i>Back
        </Link>
        {loading 
        ? 
          <Loading />
        :
          <article>
            <div className="flag">
              <img src={flag} alt={name} />
            </div>
            <div className="country_details_container">
              <h2>{name}</h2>
              <div className="country_details">
                <div className="details_box_1">
                  <h5>
                    Native Name: <span>{nativeName}</span>
                  </h5>
                  <h5>
                    Population: <span>{new Intl.NumberFormat().format(population)}</span>
                  </h5>
                  <h5>
                    Region: <span>{region}</span>
                  </h5>
                  <h5>
                    Sub Region: <span>{subregion}</span>
                  </h5>
                  {capital 
                  ? 
                  <>
                    <h5>
                      Capital: <span>{capital}</span>
                    </h5>
                  </> 
                  :
                  <>
                    <h5>
                      Capital: <span>-</span>
                    </h5>
                  </>
                  }
                </div>
                <div className="details_box_2">
                  <h5>
                    Top Level Domain: <span>{topLevelDomain}</span>
                  </h5>
                  {currencies 
                  ?
                  <>
                    <h5>
                      Currencies: {currencies?.map((value,index) => <span key={index}>{value.name} </span>)}
                    </h5>
                  </> 
                  :
                  <>
                    <h5>
                      Currencies: <span>-</span>
                    </h5>
                  </>
                  }
                  <h5>
                    Languages: {languages?.map((value, index) => <span key={index}>{value.name} </span>)}
                  </h5>
                </div>
              </div>
              <div className="details_box_3">
                {borders 
                ? <h4>Border Countries: {borders?.map((value,index)=> <Link to={`/country/${value}`} key={index} className={`btn ${darkMode ? 'dark-theme' : ''}`}>
                    {value}
                </Link>)}</h4> 
                : <h4>Border Countries: <span>No border country</span></h4>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </>
  );
};

export default CountryDetailPage;
