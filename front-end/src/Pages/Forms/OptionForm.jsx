import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import API from "../../../api/";
import "./StockForm.scss";
const OptionForm = () => {
  let history = useHistory();
  const [company, setCompany] = useState();
  const [ticker, setTicker] = useState();
  const [buyInPrice, setBuyInPrice] = useState();
  const [strikePrice, setStrikePrice] = useState();
  const [expiration, setExpiration] = useState();
  const [optionType, setOptionType] = useState();
  const [errorMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await API.Option.UploadForm.post(
      company,
      ticker,
      optionType,
      buyInPrice,
      strikePrice,
      expiration,
      window.localStorage.getItem('username')
    );
    // eslint-disable-next-line eqeqeq
    if (res["data"] == "Success") {
      history.push("/home");
    } else {
      console.log(res["data"]);
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
      <p>Enter Buy-In Price:</p>
      <input
        type="text"
        value={buyInPrice}
        onChange={(e) => setBuyInPrice(e.target.value)}
      />
      <p>Enter Strike price:</p>
      <input
        type="text"
        value={strikePrice}
        onChange={(e) => setStrikePrice(e.target.value)}
      />
      <p>Enter Expiration Date:</p>
      <input
        type="text"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      />
      <p>Enter Option Type:</p>
      {/* <select value={optionType} onChange={(e) => setOptionType(e.target.value)}>
        <option value="Put">Put</option>
        <option  value="Call">Call</option>
      </select> */}
        <input
          type="text"
          value={optionType}
          onChange={(e) => setOptionType(e.target.value)}
      />
      <div className="mt-3">
        <input type="submit" value="Submit" />
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default OptionForm;
