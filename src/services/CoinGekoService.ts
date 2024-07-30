import axios from "axios";

import { ICryptoCurrency } from "@/models/ICrypto";
import { ICoinChartData, ICoinData } from "@/models/ICoin";

export const getCryptoCurrencies = async () => {
  try {
    const response = await axios.get<ICryptoCurrency[]>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10`
    );
    return response;
  } catch {
    throw new Error("Could not fetch cryptocurrencies");
  }
};

export const getCoinDataById = async (id: string) => {
  try {
    const response = await axios.get<ICoinData>(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch {
    throw new Error("Could not fetch coin");
  }
};

export const getCoinHistoricalChartById = async (id: string) => {
  try {
    const response = await axios.get<ICoinChartData>(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
    );
    return response;
  } catch {
    throw new Error("Could not fetch coin");
  }
};
