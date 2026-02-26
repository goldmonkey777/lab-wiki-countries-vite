import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CountryDetails() {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((err) => console.log(err));
  }, [countryId]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!country) {
    return <p>Loading</p>;
  }

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
      <h1>{country.name.common}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>Capital</td>
            <td>{country.capital && country.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country.borders && country.borders.length > 0 ? (
                  country.borders.map((borderCode) => {
                    const borderCountry = allCountries.find(
                      (c) => c.alpha3Code === borderCode
                    );
                    return (
                      <li key={borderCode}>
                        <Link to={`/${borderCode}`}>
                          {borderCountry ? borderCountry.name.common : borderCode}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>No borders</li>
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
