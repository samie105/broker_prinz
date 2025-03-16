"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cryptos } from "../components/dashboard/MarketsPage/data/cryptos";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const router = useRouter();
  const [details, setDetails] = useState(0);
  const [defaultOpen, setDefaultOPen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [address, setAddress] = useState();
  const [coinPrices, setCoinPrices] = useState({});
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [currncyPrices, setCurrencyPrices] = useState({});

  const [stockPrices, setStockPrices] = useState({});

  let email = "";

  if (typeof document !== "undefined") {
    const rawEmail = decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    );
    email = rawEmail.replace(/%40/g, "@");
  }
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: "0xiohxhihfojdokhijkhnofwefodsdhfodhod",
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: "0xiohxhihfojhijkhnowefodsdhfodhod",
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: "0Xxiohxhihfookhijkhnofwefodsdhfodhod",
    },
  ];
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=uBHWmV9nY9dXSxbrZJ8iiuFrcHsEiHED`
        );
        if (
          response.data &&
          response.data.status === "OK" &&
          response.data.results
        ) {
          const stockData = response.data.results;
          const priceData = {};

          stockData.forEach((stock) => {
            priceData[stock.T] = stock.c;
          });

          setStockPrices(priceData);
        }
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
  }, []);
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/global/market/fx/2023-01-09?adjusted=true&apiKey=uBHWmV9nY9dXSxbrZJ8iiuFrcHsEiHED`
        );
        if (
          response.data &&
          response.data.status === "OK" &&
          response.data.results
        ) {
          const stockData = response.data.results;
          const priceData = {};

          stockData.forEach((stock) => {
            priceData[stock.T] = stock.c;
          });

          setCurrencyPrices(priceData);
        }
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchStockPrices();
  }, []);
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const symbols = cryptos
          .map((crypto) => crypto.name.replace(/ /g, "-"))
          .join(",");

        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbols}&vs_currencies=usd`
        );

        if (response.ok) {
          const data = await response.json();
          setCryptoPrices(data);
        }
      } catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
      }
    };

    fetchCryptoPrices();
  }, []);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.post("/db/getAddess/", {
            _id: "66139c1b696b67b56c37b8e8",
          });
          setAddress(response.data);
        }, 40000); // 40-second delay
      } catch (error) {
        console.log("Error fetching Address: ", error);
      }
    };
    fetchAddress();
  }, [details._id]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("defaultOpen", defaultOpen.toString());
    }
  }, [defaultOpen]);
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        const coinSymbols = deposits.map((coin) => coin.short.toLowerCase());

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbols.join(
            ","
          )}&vs_currencies=usd`
        );

        setCoinPrices(response.data);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();
  }, []);

  useEffect(() => {
    if (selectedMethod) {
      const assetId = selectedMethod.toLowerCase().replace(/\s+/g, "-");
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`;

      axios
        .get(apiUrl)
        .then((response) => {
          setCurrentPrice(response.data[assetId]?.usd || 0);
        })
        .catch((error) => {
          console.error("Error fetching the current price:", error);
        });
    }
  }, [selectedMethod]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch(
            "/fetching/fetchAllDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            },
            { next: { revalidate: 1 } }
          );
          if (response.status === 200) {
            const data = await response.json();
            setDetails(data);
            setDefaultOPen(true);
          } else {
            const tokenCookie = document.cookie
              .split(";")
              .find((cookie) => cookie.trim().startsWith("token="));
            if (tokenCookie) {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            router.replace("/auth");
          }
        }, 40000); // 40-second delay
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();

    const intervalId = setInterval(fetchDetails, 60000);
    return () => clearInterval(intervalId);
  }, [email]);
  const setNotification = async (message, type, method) => {
    try {
      setTimeout(async () => {
        const newNotification = {
          id: crypto.randomUUID(),
          message,
          type,
          method,
          date: new Date().toISOString(),
        };

        const response = await axios.post("/notifs/setNotifs/api", {
          newNotification,
          email,
        });

        if (response.status === 200) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            notifications: [...prevDetails.notifications, newNotification],
            isReadNotifications: false,
          }));
        } else {
          console.error("Failed to send notification:", response.data);
        }
      }, 40000); // 40-second delay
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  const addAsset = async (email, assetType, assetId) => {
    try {
      const response = await axios.post("/db/watch/add/api", {
        email,
        assetType,
        assetId,
      });

      if (response.data && response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const removeAsset = async (email, assetType, assetId) => {
    try {
      const response = await axios.post("/db/watch/remove/api", {
        email,
        assetType,
        assetId,
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        details,
        setDetails,
        selectedMethod,
        setSelectedMethod,
        currentPrice,
        setCurrentPrice,
        coinPrices,
        setCoinPrices,
        email,
        defaultOpen,
        setDefaultOPen,
        setNotification,
        removeAsset,
        addAsset,
        cryptoPrices,
        stockPrices,
        currncyPrices,
        address,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
