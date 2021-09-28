import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import API from '../../../api/'
import "./StockForm.scss";
const RealEstateForm = () => {
  let history = useHistory();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [value, setValue] = useState();
  const [street, setStreet] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = async(e) => {
    e.preventDefault();
    const res = await API.RealEstate.UploadForm.post(name,type, value, street, zip, city, state, country, window.localStorage.getItem('username')
    )
    if(res["data"] == "Success"){
        history.push("/home");
    }
    else{
        console.log(res["data"])
    }
    
  };

  return (
    <form className="text-center mt-5" onSubmit={(e) => submitHandler(e)}>
      <p>Enter Name:</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <p>Enter Type:</p>
      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        type="text"
      />
      <p>Enter Value:</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Enter Street Name:</p>
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <p>Enter Zip:</p>
      <input
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <p>Enter City:</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <p>Enter State:</p>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <p>Enter Country:</p>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      
      <div className="mt-3">
      <input type="submit" value="Submit"/>
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>

    </form>
  );
};

export default RealEstateForm;