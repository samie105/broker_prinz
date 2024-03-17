"use client";
import React, { useEffect, useState } from "react";
import { Link as Lk } from "react-scroll";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "../../ui/sheet";

import AuthUi from "../AuthUi/AuthUi";
import { DialogTrigger } from "../../ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useTheme } from "../../../contexts/themeContext";

export default function Navbar() {
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme, baseColor } = useTheme();

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 0;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "Home" },
    { label: "Getting Started" },
    { label: "About Us" },
    { label: "Features & Benefits" },
    { label: "Advantages" },
    { label: "Partners" },
    { label: "Testimonials" },
    { label: "FAQ" },
  ];

  return (
    <>
      <div
        className={`nav-container  flex justify-between duration-300 items-center py-6 px-5 transition-colors ${`${baseColor} border-white/10`} ${
          isDarkMode
            ? "shadow-lg shadow-gray-700/5 border-b"
            : !isDarkMode
            ? ""
            : !isDarkMode
            ? "shadow-lg shadow-gray-700/5"
            : ""
        } `}
      >
        <div className="logo-area">
          <h2 className={`font-bold text-base  ${isDarkMode ? "" : "white"}`}>
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
                d="M153.767 30.0541H150.937C150.566 30.5126 150.381 31.0858 150.381 31.7736C150.381 32.4614 150.575 32.9993 150.963 33.3873H153.767V30.0541ZM148.08 22.647H154.64C155.698 23.2819 156.395 24.0138 156.73 24.8426C157.065 25.6539 157.233 26.765 157.233 28.1758V32.1439C157.233 33.6077 157.268 34.948 157.339 36.1649H154.323L153.847 35.2126C153.159 35.8475 152.189 36.1649 150.937 36.1649H149.27C147.771 35.1773 147.021 33.7576 147.021 31.9058C147.021 30.0364 147.789 28.5638 149.323 27.488H151.81C152.497 27.488 153.141 27.6997 153.741 28.1229V26.8002C153.741 26.1124 153.441 25.6539 152.841 25.4246H148.08V22.647Z"
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
                d="M115.249 30.0541H112.419C112.048 30.5126 111.863 31.0858 111.863 31.7736C111.863 32.4614 112.057 32.9993 112.445 33.3873H115.249V30.0541ZM109.562 22.647H116.122C117.18 23.2819 117.877 24.0138 118.212 24.8426C118.547 25.6539 118.715 26.765 118.715 28.1758V32.1439C118.715 33.6077 118.75 34.948 118.82 36.1649H115.805L115.329 35.2126C114.641 35.8475 113.671 36.1649 112.419 36.1649H110.752C109.253 35.1773 108.503 33.7576 108.503 31.9058C108.503 30.0364 109.271 28.5638 110.805 27.488H113.292C113.979 27.488 114.623 27.6997 115.223 28.1229V26.8002C115.223 26.1124 114.923 25.6539 114.323 25.4246H109.562V22.647Z"
                fill="#79BD44"
              />
              <path
                d="M101.103 33.5143H107V36H98.4897C97.0155 35.1143 95.8986 33.9929 95.1392 32.6357C94.3797 31.2786 94 29.8857 94 28.4571C94 27.0143 94.4244 25.6286 95.2732 24.3C96.122 22.9714 97.384 21.8714 99.0593 21H107V23.5714H101.103C100.5 24.0143 99.9751 24.7286 99.5284 25.7143C99.104 26.7 98.8918 27.6429 98.8918 28.5429C98.8918 29.4429 99.104 30.3857 99.5284 31.3714C99.9751 32.3571 100.5 33.0714 101.103 33.5143Z"
                fill="#79BD44"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 0C1.79086 0 0 1.79087 0 4.00001V32.2222C0 34.4314 1.79087 36.2222 4.00001 36.2222H16.3862V20.9485H20.6983V36.2222H32.2222C34.4314 36.2222 36.2222 34.4314 36.2222 32.2222V4C36.2222 1.79086 34.4314 0 32.2222 0H4ZM16.3862 14.6613H20.6983V19.1522H16.3862V14.6613Z"
                fill="#79BD44"
              />
            </svg>
          </h2>
        </div>{" "}
        <div className="Navigation-Items">
          <div className="itemcontainer lg:flex hidden text-black text-sm">
            {navItems.map((item) => (
              <Lk
                key={item.label}
                to={item.label}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                activeClass="font-bold"
                onSetActive={() => setActiveNavItem(item.label)}
              >
                <div
                  className={`text-xs 
                   ${isDarkMode ? "text-white" : "#444"}
                   ${
                     activeNavItem === item.label
                       ? "font-bold opacity-100 text-green-500 text-base border-b-2 border-b-[#79BD44]"
                       : "font-normal opacity0"
                   } mx-2 -px-2 pb-1 cursor-pointer transition-opacity duration-500 ${
                    activeNavItem !== item.label ? "hover:opacity-100" : ""
                  }`}
                  onClick={() => handleNavItemClick(item.label)}
                >
                  {item.label}
                </div>
              </Lk>
            ))}
          </div>
        </div>
        <div className=" items-center hidden lg:flex">
          {" "}
          <button
            className={`theme-toggler text-white mx-4 p-3  ${
              isDarkMode ? "bg-[#79BD4420]" : "bg-[#79BD4410]"
            } rounded-md`}
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  isDarkMode ? "text-[#79BD44]" : "text-[#79BD44]"
                }`}
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 ${
                  isDarkMode ? "text-[#79BD44]" : "text-[#79BD44]"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <Link href="/auth" passHref>
            <div className="ctaButtons lg:flex justify-between text-sm font-bold hidden items-center">
              <div
                className="btn1 px-4 cursor-pointer flex py-3 bg-clip-tet text-transprent bg-[#79BD44] rounded-xl"
                // style={{ backgroundColor: "#ffffff10" }}
              >
                <p className="px-0.5 opacity-90 text-white flex items-center gap-x-2">
                  <div>Get started</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="menu-bar cursor-pointer lg:hidden flex items-center">
          <button
            className="theme-toggler text-white mr-7  /bg-white/10 rounded-md"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6  ${isDarkMode ? "text-white" : ""}`}
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <Sheet>
            <SheetTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </SheetTrigger>
            <SheetContent side="left" className=" ">
              <SheetHeader className="text-white">
                <SheetTitle>
                  <div className=" font-bold">
                    <svg
                      width="163"
                      height="41"
                      viewBox="0 0 163 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M84.4558 29.0941V23.8333H82.4722V20.8148H84.4558V16.8188H88.2792V20.8148H90.6365V23.8333H88.2792V30.0141C88.2792 31.1831 88.4804 32.0072 88.8829 32.4864H90.6365V35.5049H86.5543C85.5386 34.5658 84.9253 33.55 84.7145 32.4576C84.542 31.5377 84.4558 30.4165 84.4558 29.0941Z"
                        fill={` ${isDarkMode ? "#222" : "#222"}`}
                      />
                      <path
                        d="M74.9802 20.8149H81.3334V23.8335H76.8488L79.5798 27.8869C80.8064 29.6309 81.4868 30.8287 81.6209 31.4804C81.6976 31.787 81.7359 32.1032 81.7359 32.429C81.7359 33.7898 81.228 34.8151 80.2123 35.505H72.8816V32.4865H78.1424L75.0664 27.9731C74.9323 27.7623 74.7214 27.4653 74.434 27.082C74.1657 26.6986 73.9548 26.392 73.8015 26.162C73.6482 25.9129 73.5428 25.7308 73.4853 25.6158C73.4278 25.5008 73.3511 25.3571 73.2553 25.1846C73.1595 24.9929 73.0924 24.83 73.0541 24.6959C72.9774 24.3318 72.9391 24.0347 72.9391 23.8047C72.9391 22.4056 73.6195 21.4091 74.9802 20.8149Z"
                        fill={` ${isDarkMode ? "#222" : "#222"}`}
                      />
                      <path
                        d="M64.9311 35.505H61.9126C61.0693 34.4318 60.4944 33.3585 60.1877 32.2853C59.8811 31.212 59.7278 29.8705 59.7278 28.2606V20.8149H63.5512V28.5481C63.5512 30.2921 63.8962 31.6049 64.5862 32.4865H67.2597V20.8149H71.0831V35.505H68.0646L67.5472 34.4701C66.8189 35.1601 65.9469 35.505 64.9311 35.505Z"
                        fill={` ${isDarkMode ? "#222" : "#222"}`}
                      />
                      <path
                        d="M50.719 35.505V20.8149H53.45L54.1687 22.3673C54.9353 21.3324 55.9032 20.8149 57.0722 20.8149H58.1934V24.6671H54.5424V35.505H50.719Z"
                        fill={` ${isDarkMode ? "#222" : "#222"}`}
                      />
                      <path
                        d="M42.0672 18.8311H37.7263V15.3813H50.3178V18.8311H45.9769V35.5048H42.0672V18.8311Z"
                        fill={` ${isDarkMode ? "#222" : "#222"}`}
                      />
                      <path
                        d="M163 17.6472V36.1649H159.508V17.6472H163Z"
                        fill="#79BD44"
                      />
                      <path
                        d="M153.767 30.0541H150.937C150.566 30.5126 150.381 31.0858 150.381 31.7736C150.381 32.4614 150.575 32.9993 150.963 33.3873H153.767V30.0541ZM148.08 22.647H154.64C155.698 23.2819 156.395 24.0138 156.73 24.8426C157.065 25.6539 157.233 26.765 157.233 28.1758V32.1439C157.233 33.6077 157.268 34.948 157.339 36.1649H154.323L153.847 35.2126C153.159 35.8475 152.189 36.1649 150.937 36.1649H149.27C147.771 35.1773 147.021 33.7576 147.021 31.9058C147.021 30.0364 147.789 28.5638 149.323 27.488H151.81C152.497 27.488 153.141 27.6997 153.741 28.1229V26.8002C153.741 26.1124 153.441 25.6539 152.841 25.4246H148.08V22.647Z"
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
                        d="M115.249 30.0541H112.419C112.048 30.5126 111.863 31.0858 111.863 31.7736C111.863 32.4614 112.057 32.9993 112.445 33.3873H115.249V30.0541ZM109.562 22.647H116.122C117.18 23.2819 117.877 24.0138 118.212 24.8426C118.547 25.6539 118.715 26.765 118.715 28.1758V32.1439C118.715 33.6077 118.75 34.948 118.82 36.1649H115.805L115.329 35.2126C114.641 35.8475 113.671 36.1649 112.419 36.1649H110.752C109.253 35.1773 108.503 33.7576 108.503 31.9058C108.503 30.0364 109.271 28.5638 110.805 27.488H113.292C113.979 27.488 114.623 27.6997 115.223 28.1229V26.8002C115.223 26.1124 114.923 25.6539 114.323 25.4246H109.562V22.647Z"
                        fill="#79BD44"
                      />
                      <path
                        d="M101.103 33.5143H107V36H98.4897C97.0155 35.1143 95.8986 33.9929 95.1392 32.6357C94.3797 31.2786 94 29.8857 94 28.4571C94 27.0143 94.4244 25.6286 95.2732 24.3C96.122 22.9714 97.384 21.8714 99.0593 21H107V23.5714H101.103C100.5 24.0143 99.9751 24.7286 99.5284 25.7143C99.104 26.7 98.8918 27.6429 98.8918 28.5429C98.8918 29.4429 99.104 30.3857 99.5284 31.3714C99.9751 32.3571 100.5 33.0714 101.103 33.5143Z"
                        fill="#79BD44"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4 0C1.79086 0 0 1.79087 0 4.00001V32.2222C0 34.4314 1.79087 36.2222 4.00001 36.2222H16.3862V20.9485H20.6983V36.2222H32.2222C34.4314 36.2222 36.2222 34.4314 36.2222 32.2222V4C36.2222 1.79086 34.4314 0 32.2222 0H4ZM16.3862 14.6613H20.6983V19.1522H16.3862V14.6613Z"
                        fill="#79BD44"
                      />
                    </svg>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="nav-menus mt-10 flex-col w-full flex">
                {navItems.map((item) => (
                  <Lk
                    key={item.label}
                    to={item.label}
                    spy={true}
                    smooth={true}
                    offset={-75}
                    duration={500}
                    className="w-full"
                    activeClass="font-bold"
                    onSetActive={() => setActiveNavItem(item.label)}
                  >
                    <SheetClose key={item.label} className="w-full">
                      <div
                        className={`menu-item py-3  /my-2 hover:opacity-90 /text-gray-500 duration-200 cursor-pointer hover:bg-gray-100 px-2 //rounded-md flex items-center ${
                          activeNavItem === item.label
                            ? " opacity-100 bg-[#79BD4410]  text-[#79BD44] font-bold rounded-md hover:bg-green-50"
                            : ""
                        }`}
                        onClick={() => handleNavItemClick(item.label)}
                      >
                        <p>{item.label}</p>
                      </div>
                    </SheetClose>
                  </Lk>
                ))}
              </div>
              <Link href="/auth" passHref>
                <SheetClose>
                  <div className="cta-button justify-center text-sm flex items-center pr-12 cursor-pointer w-full absolute bottom-5">
                    <div className="w-full bg-[#79BD44]  text-white px-7 py-4 rounded-xl font-bold">
                      Login or Sign up
                    </div>
                  </div>
                </SheetClose>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
