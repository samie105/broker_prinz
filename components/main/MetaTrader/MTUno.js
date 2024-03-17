"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "../../../contexts/themeContext";
import Link from "next/link";

export default function MTUno() {
  const { isDarkMode, baseColor } = useTheme();

  return (
    <div id="Home" className={`${isDarkMode ? `${baseColor} text-white` : ""}`}>
      <div className="mt-container grid grid-cols-1 md:grid-cols-1 md:px-10 px-5 py-8 md:py-5">
        <section className="image_section flex w-full h-full items-center justify-center">
          <div className="img_container px-4">
            <Image
              src="/assets/trade.png"
              alt=""
              width={1000}
              height={1000}
              data-aos="fade-down"
            />
            <div
              className="flex items-center justify-center w-full"
              data-aos="fade-up"
            >
              <div
                className={`py-1 w-40 mt-4 h-[1px]  ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-400"
                } blur-md rounded-[100%] shadow-2xl shadow-gray-100 `}
              ></div>
            </div>
          </div>
        </section>
        <section className="text_section md:px-8 px-2 pt-7">
          <div className="textcontaier">
            <div
              className="maintext text-xl md:text-2xl lg:text-3xl font-bold mb-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              #1 Advanced <span className="text-[#79BD44]">Trading</span>{" "}
              Platforms &{" "}
              <span className="text-[#79BD44]">Financial Technology</span>{" "}
              Powered by <span className="text-[#79BD44]">ITrustCapital</span>
            </div>
            <div className="content">
              <p className={`text-sm   leading-relaxed`}>
                ITrustCapital offers cutting-edge trading platforms and
                financial technology solutions to empower investors and traders
                worldwide. Our advanced platforms provide real-time market data,
                customizable charting tools, and sophisticated trading
                capabilities to help you stay ahead in todays dynamic financial
                markets.
                {/* . Whether you're a seasoned investor or just getting
                started, our user-friendly interfaces and intuitive features
                make it easy to execute trades, analyze market trends, and
                manage your portfolio with confidence. With ITrustCapital, you
                can access a wide range of financial instruments, including
                stocks, options, futures, forex, and cryptocurrencies, all from
                one integrated platform. In addition to our state-of-the-art
                trading technology, we also provide educational resources,
                market insights, and personalized support to help you make
                informed investment decisions and achieve your financial goals.
                Join the ITrustCapital community today and experience the future
                of trading innovation. */}
              </p>
            </div>
            <Link href="/auth" passHref className="flex items-center">
              <div
                className="btn ml-2 mt-5 md:mt-12 mb-5 lg:block"
                data-aos="fade-up"
              >
                <div className="px-5 py-4 bg-[#79BD44] text-white font-semibold text-sm items-center rounded-xl flex">
                  <p>Create an account</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 ml-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
{
  /* <div
              className={`listtext font-seibold text-sm ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <div
                className="list_text1 flex pb-5 items-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#79BD44] mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  <span
                    className="
text-[#79BD44] font-bold"
                  >
                    MetaTrader 4{" "}
                  </span>
                  (MT4) &{" "}
                  <span
                    className="
text-[#79BD44] font-bold"
                  >
                    MetaTrader 5{" "}
                  </span>{" "}
                  (MT5) , IRESS,{" "}
                  <span
                    className="
text-[#79BD44] font-bold"
                  >
                    cTrader
                  </span>{" "}
                  and WebTrader & mobile apps for iPhone and Android devices
                </div>
              </div>
              <div
                className="list_text2 flex pb-5 items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#79BD44] mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  Advanced client portal to track your trading in real-time
                </div>
              </div>
              <div
                className="list_text3 flex pb-5"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 text-[#79BD44]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="message">
                  Superior{" "}
                  <span
                    className="
text-[#79BD44] font-bold"
                  >
                    Virtual Private Servers (VPS)
                  </span>{" "}
                  solutions for Expert Advisors (EAs) , scalping and
                  auto-trading
                </div>
              </div>
            </div> */
}
