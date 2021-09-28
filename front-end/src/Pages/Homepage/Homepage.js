import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import OptionTable from '../Tables/OptionTable'
import StockTable from '../Tables/StockTable'
import RealEstateTable from '../Tables/RealEstateTable'
import API from '../../../api'
import './Homepage.scss'
const Home = () => {
  const [username, setUsername]= useState(window.localStorage.getItem("username"));
  const [stockData, setStockData] = useState();
  const [optionData, setOptionData] = useState();
  const [realEstateData, setRealEstateData] = useState();
  const [portfolioData, setPortfolioData] = useState();

  let history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.setItem("username", "")
    history.push('/')
  }

  const addStock = (e) => {
    history.push('/stock')
  }

  const addOption = (e) => {
    e.preventDefault();
    history.push('/addOption')
  }

  const addRealEstate = (e) => {
    e.preventDefault();
    history.push('/addRealEstate')
  }

  const clearTable = (e, table) => {
    e.preventDefault();
    API.Portfolio.ClearTable.post(table, username)
    window.location.reload()
  }

  useEffect(() => {
    const OptionData = async () => {
      const result = await API.Option.GetForm.get(username)
      setOptionData(result)
    } 
    const StockData = async () => {
      const result = await API.Stock.GetForm.get(username)
      setStockData(result)
    } 
    const PropertyData = async () => {
      const result = await API.RealEstate.GetForm.get(username)
      setRealEstateData(result)
    } 
    const PortfolioData = async () => {
      const result = await API.Portfolio.GetData.get(username)
      setPortfolioData(result)
    }

    OptionData()
    StockData()
    PropertyData()
    PortfolioData()
  }, [])

  if(portfolioData == null) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div id="Home">
      <div className="row">
        <h2 className="text-center">Welcome back {username} !</h2>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <h4 className="text-center">Stocks({portfolioData[0].stock_worth != "$0.00" ? portfolioData[0].stock_worth : "$0.00"})</h4>
          <button className='text-center w-100' onClick={(e) => addStock(e)}>+</button>
          <StockTable data={stockData}/>
          <button className='text-center w-100' onClick={(e) => clearTable(e, 'stock')}>Clear Table</button>
        </div>
        <div className="col-4">
          <h4 className="text-center">Options({portfolioData[0].contracts_worth != "$0.00" ? portfolioData[0].contracts_worth : "$0.00"})</h4>
          <button className='text-center w-100' onClick={(e) => addOption(e)}>+</button>
          <OptionTable data={optionData}/>
          <button className='text-center w-100' onClick={(e) => clearTable(e, 'contracts')}>Clear Table</button>
        </div>
        <div className="col-4">
          <h4 className="text-center">Real Estate({portfolioData[0].property_worth != "$0.00" ? portfolioData[0].property_worth : "$0.00"})</h4>
          <button className='text-center w-100' onClick={(e) => addRealEstate(e)}>+</button>
          <RealEstateTable data={realEstateData}/>
          <button className='text-center w-100' onClick={(e) => clearTable(e, 'property')}>Clear Table</button>
        </div>
      </div>
      <div className='center'>
        <h4>Total Portfolio Value: {portfolioData[0].net_worth != "$0.00" ? portfolioData[0].net_worth : "$0.00"}</h4>
      </div>
      <div className='center'>
        <button className='button' onClick={(e) => logout(e)}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
