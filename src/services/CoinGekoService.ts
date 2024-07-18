import axios from "axios";

import { ICryptoCurrency } from "@/models/ICrypto";

export const getCryptoCurrencies = async () => {
  try {
    const response = await axios.get<ICryptoCurrency[]>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10`
    );
    return response;
  } catch {
    console.log("Could not fetch cryptocurrencies");
    throw new Error("Could not fetch cryptocurrencies");
  }
};
