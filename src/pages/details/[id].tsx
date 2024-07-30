"use client";
import RowDetailCoin from "@/components/RowDetailCoin";
import ThinkToday from "@/components/ThinkToday";
import TradingViewWidget from "@/components/TradingViewWidget";
import { ICoinData } from "@/models/ICoin";
import { getCoinDataById } from "@/services/CoinGekoService";
import {
  Description,
  Forum,
  GitHub,
  MilitaryTech,
  Public,
  Reddit,
  Telegram,
  Twitter,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

export default function Details() {
  const [data, setData] = useState<ICoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  const fetchDetails = async (id: string) => {
    try {
      const response = await getCoinDataById(id);
      setData(response.data);
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails(String(id));
    }
  }, [id]);

  return (
    <div className="dark:bg-gray-900 bg-slate-200 dark:text-white text-black lg:px-24 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Circles color="#6b21a8" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="flex flex-col-reverse lg:flex-row bg-gray-400 dark:bg-opacity-25 lg:rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
            <div className="contenedor1 lg:w-1/2 flex flex-col justify-items-start p-4">
              <TradingViewWidget symbol={data?.symbol || ""} />
              <div className="my-4"></div>
              {data?.market_data?.price_change_percentage_24h && (
                <div>
                  <RowDetailCoin
                    name="Market Cap"
                    changePercentage={
                      data?.market_data?.price_change_percentage_24h || 0
                    }
                    value={data?.market_data?.market_cap?.usd || 0}
                    currency="USD"
                  />

                  <hr className="my-4 border-gray-800" />
                </div>
              )}
              {data?.market_data?.market_cap_rank && (
                <div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold text-sm">
                        Market Cap Rank
                      </span>
                      <MilitaryTech className="dark:text-white" />
                    </div>
                    <div className="text-sm font-semibold">
                      {data?.market_data?.market_cap_rank || 0}
                    </div>
                  </div>
                  <hr className="my-4 border-gray-800" />
                </div>
              )}
              {data?.market_data?.total_volume?.usd && (
                <div>
                  <RowDetailCoin
                    name="Volume"
                    value={data?.market_data?.total_volume?.usd || 0}
                    currency="USD"
                  />
                  <hr className="my-4 border-gray-800" />
                </div>
              )}
              {data?.market_data?.circulating_supply && (
                <div>
                  <RowDetailCoin
                    name="Circulating Supply"
                    value={data?.market_data?.circulating_supply || 0}
                    currency={data?.symbol?.toUpperCase() || ""}
                  />
                  <hr className="my-4 border-gray-800" />
                </div>
              )}
              {data?.market_data?.max_supply && (
                <div>
                  <RowDetailCoin
                    name="Max Supply"
                    value={data?.market_data?.max_supply || 0}
                    currency={data?.symbol?.toUpperCase() || ""}
                  />
                  <hr className="my-4 border-gray-800" />
                </div>
              )}
              {data?.market_data?.fully_diluted_valuation?.usd && (
                <RowDetailCoin
                  name="Fully diluted market cap"
                  value={data?.market_data?.fully_diluted_valuation?.usd || 0}
                  currency="USD"
                />
              )}

              <ThinkToday
                name={data?.name || ""}
                symbol={data?.symbol || ""}
                votesUp={data?.sentiment_votes_up_percentage || 0}
                votesDown={data?.sentiment_votes_down_percentage || 0}
              />
            </div>
            <div className="flex flex-col lg:w-1/2 justify-start p-8">
              <div className="flex items-center gap-2">
                <Image
                  src={data?.image?.large || ""}
                  alt={data?.name || ""}
                  width={30}
                  height={30}
                />
                <h1 className="text-2xl font-light">{data?.name || ""}</h1>
                <span className="text-2xl uppercase">{data?.symbol || ""}</span>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.description?.en || "",
                }}
                className="description font-light text-sm mt-4"
              />
              <div className="my-4 ">
                <h3 className="text-sm font-semibold mb-2">Oficial links</h3>
                <div className="flex gap-2 ">
                  {data?.links?.homepage[0] && (
                    <Chip
                      icon={<Public className="dark:text-white" />}
                      label="Website"
                      component="a"
                      href={data?.links?.homepage[0]}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                  {data?.links?.whitepaper && (
                    <Chip
                      icon={<Description className="dark:text-white" />}
                      label="Whitepaper"
                      component="a"
                      href={data?.links?.whitepaper}
                      target="_blank"
                      clickable
                      className="dark:text-white dark:bg-slate-800"
                    />
                  )}
                  {data?.links?.repos_url?.github[0] && (
                    <Chip
                      icon={<GitHub className="dark:text-white" />}
                      label="Github"
                      component="a"
                      href={data?.links?.repos_url?.github[0]}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                </div>
              </div>
              <div className="my-4">
                <h3 className="text-sm font-semibold mb-2">Social links</h3>
                <div className="flex gap-2">
                  {data?.links?.twitter_screen_name && (
                    <Chip
                      icon={<Twitter className="dark:text-white" />}
                      label="Twitter"
                      component="a"
                      href={`https://twitter.com/${data?.links?.twitter_screen_name}`}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                  {data?.links?.official_forum_url[0] && (
                    <Chip
                      icon={<Forum className="dark:text-white" />}
                      label="Forum"
                      component="a"
                      href={data?.links?.official_forum_url[0]}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                  {data?.links?.subreddit_url && (
                    <Chip
                      icon={<Reddit className="dark:text-white" />}
                      label="Reddit"
                      component="a"
                      href={data?.links?.subreddit_url}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                  {data?.links?.telegram_channel_identifier && (
                    <Chip
                      icon={<Telegram className="dark:text-white" />}
                      label="Telegram"
                      component="a"
                      href={`https://t.me/${data?.links?.telegram_channel_identifier}`}
                      target="_blank"
                      className="dark:text-white dark:bg-slate-800"
                      clickable
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
