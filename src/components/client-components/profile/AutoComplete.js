// import React, { useState } from 'react';
// import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

// export default function AutoComplete({ Setstreetadress, Setadressto }) {
//     const [inputValue, setInputValue] = useState('');
//     const [fetchData, setFetchData] = useState([]);
//     console.log('fetchData', fetchData)

//     const handlePlaceChanged = () => {
//         setFetchData([]);
//         const place = fetchData[0];

//         if (place) {
//             Setstreetadress(place.vicinity);
//             setAllAddress(place.name);

//             const address = place.formatted_address;
//             const addressComponents = place.address_components || [];

//             const zipcode = findAddressComponent(addressComponents, "postal_code");
//             const city = findAddressComponent(addressComponents, "locality");
//             const neighborhood = findAddressComponent(addressComponents, "neighborhood");
//             const state = findAddressComponent(addressComponents, "administrative_area_level_1");
//             const route = findAddressComponent(addressComponents, "route");

//             const addressString = `${neighborhood} ${city} ${state} ${route}`;

//             Setadressto({ ...adressTo, zipcode, city, state, adressto: addressString });
//         }
//     };

//     const findAddressComponent = (addressComponents, type) => {
//         const component = addressComponents.find(obj => obj.types.includes(type));
//         return component ? component.long_name : "";
//     };

//     const handleInputChange = (e) => {
//         const input = e.target.value;
//         setInputValue(input);

//         if (!input) {
//             setFetchData([]);
//             return;
//         }

//         // Fetch predictions from Google Places API
//         const service = new window.google.maps.places.AutocompleteService();
//         service.getPlacePredictions({ input }, (predictions) => {
//             if (predictions) {
//                 setFetchData(predictions);
//             }
//         });
//     };

//     return (
//         <>
//             <LoadScript
//                 googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
//                 // libraries={["places"]} // Add this prop to load the "places" library
//             >
//                 <StandaloneSearchBox
//                     onPlacesChanged={handlePlaceChanged}
//                 >
//                     {/* <input
//                         type="text"
//                         id="exampleInputEmail7"
//                         value={inputValue}
//                         onChange={handleInputChange}
//                         placeholder="Street address"
//                         style={{ outlineColor: "#27ae60", padding: '15px' }}
//                     /> */}

//                     <input
//                         type="text"
//                         placeholder="Enter a location"
//                         style={{
//                             boxSizing: "border-box",
//                             border: "1px solid transparent",
//                             width: "240px",
//                             height: "32px",
//                             padding: "0 12px",
//                             borderRadius: "3px",
//                             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
//                             fontSize: "14px",
//                             outline: "none",
//                             textOverflow: "ellipsis",
//                             position: "absolute",
//                             // left: "50%",
//                             // marginLeft: "-120px"
//                         }}
//                         value={inputValue}
//                         onChange={handleInputChange}
//                     />
//                 </StandaloneSearchBox>
//             </LoadScript>
//             {/* Render the autocomplete suggestions */}
//             {/* <ul
//                 style={{
//                     backgroundColor: "#fff",
//                     position: "absolute",
//                     width: "90%", listStyleType: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", maxHeight: "400px", overflowY: "scroll",
//                 }}
//             >
//                 {fetchData.map((prediction) => (
//                     <li
//                         key={prediction.place_id}
//                         style={{ cursor: "pointer", color: "#000" }}
//                     >
//                         {prediction.description}
//                     </li>
//                 ))}
//             </ul> */}
//         </>
//     );
// }

import React, { useState, useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

export default function AutoComplete() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const standaloneSearchBoxRef = useRef(null);

    const handlePlaceChanged = () => {
        if (selectedPlace) {
            const place = selectedPlace.getPlace();

            // Rest of your code for extracting information from the place object
            const address = place.formatted_address;
            const addressComponents = place.address_components || [];
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            const city = findAddressComponent(addressComponents, "locality");
            const state = findAddressComponent(
                addressComponents,
                "administrative_area_level_1"
            );
            const postalCode = findAddressComponent(addressComponents, "postal_code");
        }
    };

    const findAddressComponent = (addressComponents, type) => {
        const component = addressComponents.find((obj) => obj.types.includes(type));
        return component ? component.long_name : "";
    };

    return (
        <div>
            {/ Your map and other components here /}
            <LoadScript
                googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
                libraries={["places"]} // Add "places" library
            >
                <StandaloneSearchBox
                    ref={standaloneSearchBoxRef}
                    onPlacesChanged={() => {
                        setSelectedPlace(standaloneSearchBoxRef.current.getPlaces()[0]);
                        handlePlaceChanged();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter a location"
                        style={{
                            boxSizing: "border-box",
                            border: "1px solid transparent",
                            width: "240px",
                            height: "32px",
                            padding: "0 12px",
                            borderRadius: "3px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            fontSize: "14px",
                            outline: "none",
                            textOverflow: "ellipsis",
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px",
                        }}
                    />
                </StandaloneSearchBox>
            </LoadScript>
        </div>
    );
}
