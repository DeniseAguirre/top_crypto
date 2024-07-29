"use client";
import React, { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol + "USD",
        width: "100%",
        height: 220,
        locale: "en",
        dateRange: "12M",
        //colorTheme: {isDarkMode ? "dark" : "light"},
        isTransparent: true,
        autosize: true,
        largeChartUrl: "",
      });
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;