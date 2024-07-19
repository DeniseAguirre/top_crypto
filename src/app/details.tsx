import {
  getCoinDataById,
  getCoinHistoricalChartById,
} from "@/services/CoinGekoService";
import React from "react";

export default function CoinDetail() {
  const fetchCoinData = async (id: string) => {
    try {
      const response = await getCoinDataById(id);
      console.log(response.data);
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    }
  };

  const fetchCoinChartData = async (id: string) => {
    try {
      const response = await getCoinHistoricalChartById(id);
      console.log(response.data);
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    }
  };
  return <div>CoinDetail</div>;
}
