import React, { useEffect, useRef, memo } from "react";

interface WidgetProps {
  symbol: string;
}

const CryptoChart: React.FC<WidgetProps> = ({ symbol }) => {
  const container = useRef<HTMLDivElement | null>(null);
  //       const script = document.createElement("script");
  //       script.src =
  //         "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
  //       script.type = "text/javascript";
  //       script.async = true;
  //       script.innerHTML = `
  //         {
  //           "symbols": [
  //             [
  //               "CRYPTO:${symbol}USD|1D"
  //             ]
  //           ],
  //           "chartOnly": false,
  //           "width": "100%",
  //           "height": "100%",
  //           "locale": "en",
  //           "colorTheme": "${theme}",
  //           "showVolume": false,
  //           "showMA": false,
  //           "hideDateRanges": false,
  //           "hideMarketStatus": false,
  //           "hideSymbolLogo": false,
  //           "scalePosition": "right",
  //           "scaleMode": "Normal",
  //           "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  //           "fontSize": "10",
  //           "noTimeScale": false,
  //           "valuesTracking": "1",
  //           "backgroundColor": "rgba(0, 0, 0, 0)",
  //           "changeMode": "price-and-percent",
  //           "chartType": "area",
  //           "maLineColor": "#6b21a8",
  //           "maLineWidth": 1,
  //           "maLength": 9,
  //           "headerFontSize": "medium",

  //           "lineWidth": 2,
  //           "lineType": 0,
  //           "dateRanges": [
  //             "1d|1",
  //             "1m|30",
  //             "3m|60",
  //             "12m|1D",
  //             "60m|1W",
  //             "all|1M"
  //           ],
  //         }`;
  //       container.current.appendChild(script);
  //     }
  //   }, [symbol, theme]);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;

      const config = {
        symbols: [["CRYPTO:" + symbol + "USD|1D"]],
        chartOnly: false,
        width: "100%",
        height: "100%",
        locale: "en",
        colorTheme: "dark",
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        backgroundColor: "rgba(0, 0, 0, 0)",
        changeMode: "price-and-percent",
        chartType: "area",
        maLineColor: "#6b21a8",
        maLineWidth: 1,
        maLength: 9,
        headerFontSize: "medium",
        widgetFontColor: "rgba(120,123,134,1)",
        lineWidth: 2,
        lineType: 0,
        dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      };
      script.innerHTML = JSON.stringify(config);
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default memo(CryptoChart);
