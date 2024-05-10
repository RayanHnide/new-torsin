import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function CountryApp({ styles }) {

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <div className="App">
            <Select
                className={`${styles.formInput} py-2 `}
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                    return options["name"];
                }}
                placeholder='eg. South Dakota'
                getOptionValue={(options) => {
                    return options["name"];
                }}
                value={selectedCountry}
                onChange={(item) => {
                    setSelectedCountry(item);
                }}
            />
            {/* <Select
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                    return options["name"];
                }}
                getOptionValue={(options) => {
                    return options["name"];
                }}
                value={selectedState}
                onChange={(item) => {
                    setSelectedState(item);
                }}
            />
            <Select
                options={City.getCitiesOfState(
                    selectedState?.countryCode,
                    selectedState?.isoCode
                )}
                getOptionLabel={(options) => {
                    return options["name"];
                }}
                getOptionValue={(options) => {
                    return options["name"];
                }}
                value={selectedCity}
                onChange={(item) => {
                    setSelectedCity(item);
                }}
            /> */}
        </div>
    );
}
