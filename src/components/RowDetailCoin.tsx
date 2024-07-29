"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import React, { useEffect, useState } from "react";

interface RowDetailCoinProps {
  changePercentage?: number | null;
  value: number;
  name: string;
  currency: string;
}

const RowDetailCoin: React.FC<RowDetailCoinProps> = ({
  changePercentage,
  value,
  name,
  currency,
}) => {
  const [isNegative, setIsNegative] = useState(false);
  useEffect(() => {
    if (changePercentage) {
      const negative = changePercentage < 0;
      setIsNegative(negative);
    }
  }, [changePercentage]);

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center">
        <span className="font-semibold text-sm">{name}</span>
        <span className="ml-2 text-xs">
          <i className="fas fa-info-circle"></i>
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        {changePercentage && (
          <div
            className={`text-sm ${
              isNegative ? "text-red-500" : "text-green-500"
            }`}
          >
            {isNegative ? "▼" : "▲"} {Math.abs(changePercentage).toFixed(2)}%
          </div>
        )}
        <div className="text-sm font-semibold">
          {formatCurrency(value, currency)}
        </div>
      </div>
    </div>
  );
};

export default RowDetailCoin;
