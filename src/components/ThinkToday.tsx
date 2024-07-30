import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface ThinkTodayProps {
  name: string;
  symbol: string;
  votesUp: number;
  votesDown: number;
}

function ThinkToday({ name, symbol, votesUp, votesDown }: ThinkTodayProps) {
  const isBullish = votesUp > votesDown;
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">
        What do you think about {symbol.toUpperCase()} today?
      </h3>
      <p className="text-sm font-light text-gray-500 dark:text-gray-300">
        The community {isBullish ? "is bullish" : "is bearish"} on {name} (
        {symbol.toUpperCase()}) today.
      </p>
      <div className="flex gap-2 mt-4">
        <Button
          variant="contained"
          color="success"
          startIcon={<ThumbUp className="dark:text-white" />}
        >
          {votesUp.toFixed(0)}%
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<ThumbDown className="dark:text-white" />}
        >
          {votesDown.toFixed(0)}%
        </Button>
      </div>
    </div>
  );
}

export default ThinkToday;
