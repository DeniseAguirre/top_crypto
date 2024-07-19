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

const REFRESH_INTERVAL = 60000;

interface CryptoTableProps {
  lastUpdated: Date | null;
  setLastUpdated: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function CryptoTable({
  lastUpdated,
  setLastUpdated,
}: CryptoTableProps) {
  const [data, setData] = useState<ICryptoCurrency[]>([]);

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
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,

          "& .MuiTableCell-root": {
            borderBottom: "1px solid #090909",
          },
        }}
        aria-label="simple table"
        className="dark:bg-gray-900 bg-slate-200 dark:text-white text-black"
      >
        <TableHead>
          <TableRow>
            <TableCell className="dark:text-white font-bold">Assets</TableCell>
            <TableCell className="dark:text-white font-bold" align="right">
              Price
            </TableCell>
            <TableCell className="dark:text-white font-bold" align="right">
              Price change 24H
            </TableCell>
            <TableCell className="dark:text-white font-bold" align="right">
              Market cap
            </TableCell>
            <TableCell className="dark:text-white font-bold" align="right">
              Market cap change 24H
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
                    <div className="dark:text-white">{row.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "gray" }}>
                      {row.symbol.toUpperCase()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right" className="dark:text-white">
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
              <TableCell align="right" className="dark:text-white">
                {formatCurrency(row.market_cap)}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  color: row.market_cap_change_percentage_24h
                    .toString()
                    .includes("-")
                    ? "red"
                    : "green",
                }}
              >
                {formatPercentage(row.market_cap_change_percentage_24h)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
