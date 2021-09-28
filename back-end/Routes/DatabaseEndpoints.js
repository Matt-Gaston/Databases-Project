const express = require("express");
const pool = require("../database");
var router = express.Router();
const helper = require("../helpers/DatabaseHelper")

router.post(`/api/stock/uploadForm`, async (req, res) => {
  const company = req.body.company;
  const ticker = req.body.ticker;
  const quantity = req.body.quantity;
  const averagePrice = req.body.averagePrice;
  const dividends = req.body.dividends;
  const username = req.body.username;

  try {
    const portfolioId = await helper.fetchPortfolioId(username)
    await pool.query(
      `INSERT INTO stock(ticker, quantity, average_price, dividends, company, portfolio_id) VALUES($1, $2, $3, $4, $5, $6)`,
      [ticker, quantity, averagePrice, dividends, company, portfolioId]
    ).then(() => {
      return res.send("Success")
    }
    ).catch((result) => {return res.send(result)});
  } catch (error) {
    console.log(error);
  }
});

router.post('/api/option/uploadForm', async (req, res) => {
  const company = req.body.company;
  const ticker = req.body.ticker;
  const buyInPrice = req.body.buyInPrice;
  const strikePrice = req.body.strikePrice;
  const expiration = req.body.expiration;
  const optionType = req.body.optionType;
  const username = req.body.username;

  try {
    const portfolioId = await helper.fetchPortfolioId(username)
    await pool.query(
      `INSERT INTO contracts(ticker, option_type, buy_in_price, strike_price, expiration, company, portfolio_id) VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [ticker, optionType, buyInPrice, strikePrice, expiration, company, portfolioId ]
    ).then(() => {
      return res.send("Success")
    }
    ).catch((result) => {
      console.log(result)
      return res.send(result)});
  } catch (error) {
    console.log(error);
  }
});

router.post('/api/realEstate/uploadForm', async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const value = req.body.value;
  const street = req.body.street;
  const zip = req.body.zip;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const username = req.body.username;

  try {
    const portfolioId = await helper.fetchPortfolioId(username)
    await pool.query(
      `INSERT INTO property(name, type, value, street, zip, city, state, country, portfolio_id) VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9)`,
      [name, type, value, street, zip,city,state,country,portfolioId]
    ).then(() => {
      return res.send("Success")
    }
    ).catch((result) => {
      console.log(result)
      return res.send(result)});
  } catch (error) {
    console.log(error);
  }
});

router.get(`/api/stock/getForm/:username`, async (req, res) => {
  const username = req.params.username;
  try {
    await pool.query(
      "SELECT S.* FROM users AS U, portfolio AS P, stock AS S WHERE U.username = $1 AND P.user_id = U.id AND S.portfolio_id = P.portfolio_id",[username]
    ).then(result => {res.send(result.rows)}) 
  } catch (error) {
    console.log(error);
  }
});

router.get(`/api/option/getForm/:username`, async (req, res) => {
  const username = req.params.username;
  try {
    await pool.query(
      "SELECT C.* FROM users AS U, portfolio AS P, contracts AS C WHERE U.username = $1 AND P.user_id = U.id AND C.portfolio_id = P.portfolio_id",[username]
    ).then(result => {res.send(result.rows)}) 
  } catch (error) {
    console.log(error);
  }
});

router.get(`/api/realEstate/getForm/:username`, async (req, res) => {
  const username = req.params.username;
  try {
    await pool.query(
      "SELECT PR.* FROM users AS U, portfolio AS P, property AS PR WHERE U.username = $1 AND P.user_id = U.id AND PR.portfolio_id = P.portfolio_id",[username]
    ).then(result => {res.send(result.rows)}) 
  } catch (error) {
    console.log(error);
  }
});

router.get(`/api/portfolio/getData/:username`, async(req, res) => {
  const username = req.params.username;
  try {
    await pool.query(
      "SELECT net_worth,stock_worth, contracts_worth, property_worth FROM portfolio WHERE user_id = (SELECT id FROM users WHERE username = $1)",[username]
    ).then(result => {res.send(result.rows)}) 
  } catch (error) {
    console.log(error);
  }
})

router.post(`/api/portfolio/clearTable`, async(req,res) => {
  const table = req.body.table;
  const username = req.body.username;
  try {
    const portfolioId = await helper.fetchPortfolioId(username)
    if(table == 'stock'){
      await pool.query(
        "DELETE FROM stock WHERE portfolio_id = $1",[portfolioId]
      ).then(() => res.send("Table Cleared"))
    }
    else if(table == 'contracts'){
      await pool.query(
        "DELETE FROM contracts WHERE portfolio_id = $1",[portfolioId]
      ).then(() => res.send("Table Cleared"))
    }
    else if(table == 'property'){
      await pool.query(
        "DELETE FROM property WHERE portfolio_id = $1",[portfolioId]
      ).then(() => res.send("Table Cleared"))
    }
    else{
      return res.send("no table name associated")
    }
     
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
