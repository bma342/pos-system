const axios = require 'axios';

const API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = 'https://api.exchangeratesapi.io/latest';

const convertCurrency = async (amount, from, to) => {
  const response = await axios.get(`${BASE_URL}?base=${from}&symbols=${to}&access_key=${API_KEY}`);
  const rate = response.data.rates[to];
  return amount * rate;
};