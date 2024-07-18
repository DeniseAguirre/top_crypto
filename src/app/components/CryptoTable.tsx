"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCryptoCurrencies } from "@/services/CoinGekoService";
import { ICryptoCurrency } from "@/models/ICrypto";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPercentage } from "@/utils/formatPercentage";

import Image from "next/image";
import { formatDate } from "@/utils/formatDate";

const REFRESH_INTERVAL = 60000;

export default function CryptoTable() {
  const [data, setData] = useState<ICryptoCurrency[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCryptoCurrencies = async () => {
    try {
      const response = await getCryptoCurrencies();
      setData(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    }
  };

  useEffect(() => {
    fetchCryptoCurrencies();
    const interval = setInterval(() => {
      fetchCryptoCurrencies();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: 16, color: "#fff" }}>
      {lastUpdated
        ? `Last update time: ${formatDate(lastUpdated)}`
        : "Loading..."}

      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
          className="bg-[#000] text-white"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Assets</TableCell>
              <TableCell style={{ color: "#fff" }} align="right">
                Price
              </TableCell>
              <TableCell style={{ color: "#fff" }} align="right">
                24H
              </TableCell>
              <TableCell style={{ color: "#fff" }} align="right">
                Market cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <Image
                      src={row.image}
                      alt={row.name}
                      width={24}
                      height={24}
                      style={{ marginRight: 8 }}
                    />
                    <div>
                      <div>{row.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "gray" }}>
                        {row.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right" style={{ color: "#fff" }}>
                  {formatCurrency(row.current_price)}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: row.price_change_percentage_24h
                      .toString()
                      .includes("-")
                      ? "red"
                      : "green",
                  }}
                >
                  {formatPercentage(row.price_change_percentage_24h)}
                </TableCell>
                <TableCell align="right" style={{ color: "#fff" }}>
                  {formatCurrency(row.market_cap)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
