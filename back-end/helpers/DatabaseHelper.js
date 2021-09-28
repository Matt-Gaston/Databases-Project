const express = require("express");
const pool = require("../database");


const fetchPortfolioId = (username) => {
    try {
        const data = pool.query("SELECT P.portfolio_id FROM users AS U, portfolio AS P WHERE U.username = $1 AND P.user_id = U.id", [username]).then(res => res.rows[0]["portfolio_id"])
        return data
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    fetchPortfolioId
}
