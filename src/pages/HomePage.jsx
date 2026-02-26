import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>WikiCountries: Your Guide to the World</h1>
      <div className="list-group">
        {countries.map((country) => (
          <Link
            key={country.alpha3Code}
            to={`/${country.alpha3Code}`}
            className="list-group-item list-group-item-action"
          >
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              alt={country.name.common}
              style={{ width: "30px", marginRight: "10px" }}
            />
            {country.name.common}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
