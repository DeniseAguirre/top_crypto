"use client";
import TradingViewWidget from "@/components/TradingViewWidget";
import { ICoinData } from "@/models/ICoin";
import { getCoinDataById } from "@/services/CoinGekoService";
import {
  ArrowBack,
  Description,
  GitHub,
  Public,
  Web,
} from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
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
      console.log(response.data);
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

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="dark:bg-gray-900 bg-slate-200 dark:text-white text-black px-24 min-h-screen">
      <div className="flex justify-between mb-4">
        <IconButton aria-label="back" size="large" onClick={() => handleBack()}>
          <ArrowBack fontSize="inherit" className="dark:text-white" />
        </IconButton>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Circles color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="flex divide-x-2 divide-gray-500 border-2 border-gray-500 rounded-lg">
            <div className="contenedor1 w-1/2 flex flex-col justify-items-start p-4">
              <TradingViewWidget symbol={data?.symbol || ""} />
              <div className="my-4 ">
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
            </div>
            <div className="flex flex-col w-1/2 justify-center p-8">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}
