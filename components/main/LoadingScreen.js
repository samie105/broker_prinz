/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isDarkMode, baseColor } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the progress by a certain amount
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1.4; // Increase by 10% (adjust as needed)
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          setIsVisible(false);
          return prevProgress;
        }
      });
    }, 100);
  }, []);

  return isVisible ? (
    <div
      className={`fixed top-0 left-0 z-50 ${
        isDarkMode ? `${baseColor}` : "bg-white"
      } w-full h-full`}
    >
      <section className="section relative w-full h-full">
        {" "}
        <div
          className={`   animate__animated text-xl flex w-full h-full justify-center items-center ${
            progress > 94 ? "animate__slideOutRight" : ""
          }`}
        >
          <div className="progress-cont w-4/5 md:w-1/2">
            <div
              className={`${
                isDarkMode ? "bg-[#11111150]" : "bg-gray-100"
              } progressguauge w-full h-1.5 rounded-full  overflow-hidden transition-all relative`}
            >
              <div
                className="progressbar absolute rounded-full h-full top-0 left-0 transition-all bg-[#79BD44]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>{" "}
        <div
          className={`header  absolute w-full flex items-center justify-center font-bold pt-4  ${
            progress > 10 ? "top-0 " : "-top-20"
          }`}
        >
          <div
            className={` animate__faster animate__animated ${
              isDarkMode ? "text-white" : "text-black"
            } font-bold text-lg ${
              progress > 10 && progress <= 95 ? "animate__slideInDown" : ""
            } ${progress >= 95 ? "animate__slideOutUp" : ""}`}
          >
            <svg
              width="163"
              height="41"
              viewBox="0 0 163 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M84.4558 29.0941V23.8333H82.4722V20.8148H84.4558V16.8188H88.2792V20.8148H90.6365V23.8333H88.2792V30.0141C88.2792 31.1831 88.4804 32.0072 88.8829 32.4864H90.6365V35.5049H86.5543C85.5386 34.5658 84.9253 33.55 84.7145 32.4576C84.542 31.5377 84.4558 30.4165 84.4558 29.0941Z"
                fill={` ${isDarkMode ? "#C3C3C3" : "#222"}`}
              />
              <path
                d="M74.9802 20.8149H81.3334V23.8335H76.8488L79.5798 27.8869C80.8064 29.6309 81.4868 30.8287 81.6209 31.4804C81.6976 31.787 81.7359 32.1032 81.7359 32.429C81.7359 33.7898 81.228 34.8151 80.2123 35.505H72.8816V32.4865H78.1424L75.0664 27.9731C74.9323 27.7623 74.7214 27.4653 74.434 27.082C74.1657 26.6986 73.9548 26.392 73.8015 26.162C73.6482 25.9129 73.5428 25.7308 73.4853 25.6158C73.4278 25.5008 73.3511 25.3571 73.2553 25.1846C73.1595 24.9929 73.0924 24.83 73.0541 24.6959C72.9774 24.3318 72.9391 24.0347 72.9391 23.8047C72.9391 22.4056 73.6195 21.4091 74.9802 20.8149Z"
                fill={` ${isDarkMode ? "#C3C3C3" : "#222"}`}
              />
              <path
                d="M64.9311 35.505H61.9126C61.0693 34.4318 60.4944 33.3585 60.1877 32.2853C59.8811 31.212 59.7278 29.8705 59.7278 28.2606V20.8149H63.5512V28.5481C63.5512 30.2921 63.8962 31.6049 64.5862 32.4865H67.2597V20.8149H71.0831V35.505H68.0646L67.5472 34.4701C66.8189 35.1601 65.9469 35.505 64.9311 35.505Z"
                fill={` ${isDarkMode ? "#C3C3C3" : "#222"}`}
              />
              <path
                d="M50.719 35.505V20.8149H53.45L54.1687 22.3673C54.9353 21.3324 55.9032 20.8149 57.0722 20.8149H58.1934V24.6671H54.5424V35.505H50.719Z"
                fill={` ${isDarkMode ? "#C3C3C3" : "#222"}`}
              />
              <path
                d="M42.0672 18.8311H37.7263V15.3813H50.3178V18.8311H45.9769V35.5048H42.0672V18.8311Z"
                fill={` ${isDarkMode ? "#C3C3C3" : "#222"}`}
              />
              <path
                d="M163 17.6472V36.1649H159.508V17.6472H163Z"
                fill="#79BD44"
              />
              <path
                d="M153.767 30.0541H150.937C150.567 30.5126 150.381 31.0858 150.381 31.7736C150.381 32.4614 150.575 32.9993 150.963 33.3873H153.767V30.0541ZM148.08 22.647H154.64C155.699 23.2819 156.395 24.0138 156.73 24.8426C157.065 25.6539 157.233 26.765 157.233 28.1758V32.1439C157.233 33.6077 157.268 34.948 157.339 36.1649H154.323L153.847 35.2126C153.159 35.8475 152.189 36.1649 150.937 36.1649H149.27C147.771 35.1773 147.022 33.7576 147.022 31.9058C147.022 30.0364 147.789 28.5638 149.323 27.488H151.81C152.498 27.488 153.141 27.6997 153.741 28.1229V26.8002C153.741 26.1124 153.441 25.6539 152.842 25.4246H148.08V22.647Z"
                fill="#79BD44"
              />
              <path
                d="M140.074 30.2658V25.4247H138.249V22.6471H140.074V18.97H143.592V22.6471H145.761V25.4247H143.592V31.1123C143.592 32.1881 143.777 32.9465 144.148 33.3873H145.761V36.165H142.005C141.07 35.3008 140.506 34.3661 140.312 33.3609C140.153 32.5144 140.074 31.4827 140.074 30.2658Z"
                fill="#79BD44"
              />
              <path
                d="M133.519 36.1649V22.647H137.011V36.1649H133.519ZM133.519 17.6472H137.011V21.2185H133.519V17.6472Z"
                fill="#79BD44"
              />
              <path
                d="M120.99 22.647H123.82L124.217 23.5993C124.605 23.2466 124.967 22.9997 125.302 22.8586C125.654 22.7175 126.175 22.647 126.863 22.647H129.243C129.984 23.37 130.566 24.3048 130.989 25.4511C131.413 26.5974 131.624 27.8584 131.624 29.234C131.624 32.1792 130.742 34.4895 128.979 36.1649H126.73C125.796 36.1649 125.055 35.918 124.508 35.4242V40.133H120.99V22.647ZM124.508 33.3873H127.048C127.7 32.2762 128.026 30.927 128.026 29.3398C128.026 27.7526 127.691 26.4475 127.021 25.4246H124.508V33.3873Z"
                fill="#79BD44"
              />
              <path
                d="M115.249 30.0541H112.418C112.048 30.5126 111.863 31.0858 111.863 31.7736C111.863 32.4614 112.057 32.9993 112.445 33.3873H115.249V30.0541ZM109.561 22.647H116.122C117.18 23.2819 117.877 24.0138 118.212 24.8426C118.547 25.6539 118.714 26.765 118.714 28.1758V32.1439C118.714 33.6077 118.75 34.948 118.82 36.1649H115.804L115.328 35.2126C114.64 35.8475 113.671 36.1649 112.418 36.1649H110.752C109.253 35.1773 108.503 33.7576 108.503 31.9058C108.503 30.0364 109.27 28.5638 110.805 27.488H113.291C113.979 27.488 114.623 27.6997 115.222 28.1229V26.8002C115.222 26.1124 114.923 25.6539 114.323 25.4246H109.561V22.647Z"
                fill="#79BD44"
              />
              <path
                d="M100.957 32.2591H106.882V36.1647H98.3304C96.849 34.7731 95.7267 33.0111 94.9636 30.8787C94.2004 28.7464 93.8188 26.5579 93.8188 24.3134C93.8188 22.0463 94.2453 19.8691 95.0983 17.7816C95.9512 15.6942 97.2194 13.9659 98.9028 12.5967H106.882V16.6369H100.957C100.351 17.3327 99.8231 18.455 99.3742 20.0038C98.9477 21.5525 98.7345 23.0339 98.7345 24.448C98.7345 25.8621 98.9477 27.3435 99.3742 28.8923C99.8231 30.441 100.351 31.5633 100.957 32.2591Z"
                fill="#79BD44"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 0C1.79086 0 0 1.79087 0 4.00001V32.2222C0 34.4314 1.79087 36.2222 4.00001 36.2222H16.3862V20.9485H20.6983V36.2222H32.2222C34.4314 36.2222 36.2222 34.4314 36.2222 32.2222V4C36.2222 1.79086 34.4314 0 32.2222 0H4ZM16.3862 14.6613H20.6983V19.1522H16.3862V14.6613Z"
                fill="#79BD44"
              />
            </svg>
            ;
          </div>
        </div>
        <div
          className={`messages absolute w-full flex items-center justify-center pb-4 ${
            progress > 10 ? "bottom-0" : "-bottom-20"
          }`}
        >
          {progress <= 40 && (
            <div
              className={`text-sm md:text-base rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 10 && progress <= 35 ? "animate__slideInUp" : ""
              } ${progress >= 35 ? "animate__slideOutDown" : ""}`}
            >
              Hey👋 Nice seeing you
            </div>
          )}
          {progress > 40 && progress <= 85 && (
            <div
              className={`text-sm md:text-base rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 40 && progress <= 82 ? "animate__slideInUp" : ""
              } ${progress >= 82 ? "animate__slideOutDown" : ""}`}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 animate-spin mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="div">Setting up the page...</div>
              </div>
            </div>
          )}
          {progress > 85 && (
            <div
              className={`text-sm md:text-base flex items-center rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 85 && progress <= 95 ? "animate__slideInUp" : ""
              }${progress >= 95 ? "animate__slideOutDown" : ""}`}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-green-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="message"> Your page is ready</div>
            </div>
          )}
        </div>
      </section>{" "}
    </div>
  ) : null;
}
