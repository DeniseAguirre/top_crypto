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
import { useRouter } from "next/router";
import Image from "next/image";

const REFRESH_INTERVAL = 60000;

interface CryptoTableProps {
  lastUpdated: Date | null;
  setLastUpdated: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function CryptoTable({
  lastUpdated,
  setLastUpdated,
}: Readonly<CryptoTableProps>) {
  const [data, setData] = useState<ICryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchCryptoCurrencies = async () => {
    try {
      const response = await getCryptoCurrencies();
      setData(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoCurrencies();
    const interval = setInterval(() => {
      fetchCryptoCurrencies();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (id: string) => {
    if (router) {
      router.push(`/details/${id}`);
    } else {
      console.error("Router is not available");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Table
        sx={{
          minWidth: 450,
          tableLayout: "auto",
          "& .MuiTableCell-root": {
            borderBottom: "none",
          },
        }}
        aria-label="simple table"
        className="bg-transparent dark:text-white text-black text-sm"
      >
        <TableHead>
          <TableRow>
            <TableCell
              className="dark:text-white font-semibold"
              sx={{ minWidth: 150 }}
            >
              Assets
            </TableCell>
            <TableCell className="dark:text-white font-semibold" align="right">
              Price
            </TableCell>
            <TableCell className="dark:text-white font-semibold" align="right">
              24H
            </TableCell>
            <TableCell
              className="hidden sm:table-cell dark:text-white font-semibold"
              align="right"
            >
              Market cap
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              hover
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              sx={{
                cursor: "pointer",
              }}
            >
              <TableCell component="th" scope="row" sx={{ minWidth: 150 }}>
                <div className="flex flex-row items-center">
                  <Image
                    src={row.image}
                    alt={row.name}
                    width={24}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  <div>
                    <div className="dark:text-white font-thin">{row.name}</div>
                    <div style={{ color: "gray" }}>
                      {row.symbol.toUpperCase()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right" className="dark:text-white font-thin">
                {formatCurrency(row.current_price, "USD")}
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
                className="font-thin"
              >
                {row.market_cap_change_percentage_24h.toString().includes("-")
                  ? "▼"
                  : "▲"}
                {formatPercentage(row.market_cap_change_percentage_24h)}
              </TableCell>
              <TableCell
                align="right"
                className="hidden sm:table-cell dark:text-white font-thin"
              >
                {formatCurrency(row.market_cap, "USD")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
