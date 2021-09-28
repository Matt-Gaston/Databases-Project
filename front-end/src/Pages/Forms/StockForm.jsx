import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import API from '../../../api/'
import "./StockForm.scss";
const StockForm = () => {
  let history = useHistory();
  const [company, setCompany] = useState();
  const [ticker, setTicker] = useState();
  const [quantity, setQuantity] = useState();
  const [averagePrice, setAveragePrice] = useState();
  const [dividendYield, setDividendYield] = useState();
  const [errorMessage, setErrorMessage] = useState()

  const submitHandler = async(e) => {
    e.preventDefault();
    const res = await API.Stock.UploadForm.post(company,ticker,quantity,averagePrice,dividendYield,window.localStorage.getItem('username')
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
      <p>Enter Company:</p>
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
      />
      <p>Enter ticker:</p>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <p>Enter quantity:</p>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <p>Enter average price:</p>
      <input
        type="text"
        value={averagePrice}
        onChange={(e) => setAveragePrice(e.target.value)}
      />
      <p>Enter dividend yield(.05 = 5%):</p>
      <input
        type="text"
        value={dividendYield}
        onChange={(e) => setDividendYield(e.target.value)}
      />
      <div className="mt-3">
      <input type="submit" value="Submit"/>
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default StockForm;
