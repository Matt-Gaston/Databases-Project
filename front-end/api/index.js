import axios from "axios";
const http = axios.create({baseURL:"http://localhost:5000/api",});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    all: axios.all,
    spread: axios.spread,

    Users: {
        Login:{
            post(username, password){
                return http.post(`/user/login`, {
                    username: username,
                    password: password
                })
            }
        },
        Register:{
            post(username, password){
                return http.post(`/user/register`, {
                    username: username,
                    password: password
                })
            }
        },
    },

    Stock: {
        UploadForm: {
            post(company, ticker, quantity, averagePrice, dividends, username){
                return http.post(`/stock/uploadForm`, {
                    company: company,
                    ticker: ticker,
                    quantity: quantity,
                    averagePrice: averagePrice,
                    dividends: dividends,
                    username: username
                })
            }
        },
        GetForm: {
            get(username){
                return http.get(`/stock/getForm/${username}`).then((res) => res.data)
            }
        }
    },

    Option: {
        UploadForm: {
            post(company, ticker, optionType, buyInPrice, strikePrice, expiration, username) {
                return http.post('/option/uploadForm', {
                    company: company,
                    ticker: ticker,
                    optionType: optionType,
                    buyInPrice: buyInPrice,
                    strikePrice: strikePrice,
                    expiration:expiration,
                    username: username
                })
            }
        },
        GetForm: {
            get(username){
                return http.get(`/option/getForm/${username}`).then(res => res.data)
            }
        }
    },

    RealEstate: {
        UploadForm: {
            post(name, type, value, street, zip, city, state, country, username) {
                return http.post('/realEstate/uploadForm', {
                    name: name,
                    type: type,
                    value: value,
                    street: street,
                    zip: zip,
                    city: city,
                    state: state,
                    country:country,
                    username: username
                })
            }
        },
        GetForm: {
            get(username){
                return http.get(`/realEstate/getForm/${username}`).then((res) => res.data)
            }
        }
    },

    Portfolio:{
        GetData: {
            get(username){
                return http.get(`/portfolio/getData/${username}`).then((res) => res.data)
            }
        },
        ClearTable: {
            post(table, username){
                return http.post(`/portfolio/clearTable`, {
                    table: table,
                    username: username
                })
            }
        }
    }

    
}