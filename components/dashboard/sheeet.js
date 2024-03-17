"use client";
import { usePathname } from "next/navigation";
import { SheetClose, SheetHeader, SheetTitle } from "../ui/sheet";
import { navList, accountList } from "./navList";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "../../contexts/themeContext";
import Image from "next/image";

export default function Sheeet() {
  const { isDarkMode, baseColor } = useTheme();
  const router = usePathname();

  return (
    <>
      <SheetHeader className="text-white">
        <SheetTitle>
          <div className={`${isDarkMode ? "text-white" : ""} font-bold`}>
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
          </div>
        </SheetTitle>
      </SheetHeader>
      <div className="mt-10 nav-menus">
        <ScrollArea className="h-[80vh] border-red-600">
          <div className="classes mb-3 text-m font-bold /mt-10 flex items-center">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                  clipRule="evenodd"
                />
                <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
              </svg>
            </div>
            <div> Quick Access</div>
          </div>
          {navList.map((item) => (
            <Link
              key={item.nav}
              href={item.linkPath}
              passHref
              className={`flex items-center py-3 w-full transition-all cursor-pointer text-sm font-medium px-3 rounded-xl ${
                router === item.linkPath
                  ? "text-white bg-[#79BD44] font-bold"
                  : isDarkMode
                  ? "text-white/40"
                  : "text-black/80 "
              }`}
            >
              <SheetClose className="w-full">
                <div className="w-full flex items-center py-1">
                  <div className="icon mr-2">{item.icon}</div>
                  <div className="nav">{item.nav}</div>
                  {item.new && (
                    <div className=" ml-2">
                      <Image
                        alt=""
                        src="/assets/new.png"
                        width={1000}
                        height={1000}
                        className="w-8 h-8 opacity-60"
                      />
                    </div>
                  )}
                </div>
              </SheetClose>
            </Link>
          ))}
          <div className="classes mb-2 mt-5 text-m font-bold flex items-center">
            {" "}
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path
                  fillRule="evenodd"
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div> User Actions</div>
          </div>
          {accountList.map((item) => (
            <Link
              key={item.nav}
              href={item.linkPath}
              passHref
              className={`flex items-center py-3 w-full transition-all cursor-pointer text-sm font-medium px-3 rounded-xl ${
                router === item.linkPath
                  ? "text-white bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-800 via-red-600 to-orange-700 font-bold"
                  : isDarkMode
                  ? "text-white/40"
                  : "text-black/80 "
              }`}
            >
              <SheetClose className="w-full">
                <div className="w-full flex items-center py-1">
                  <div className="icon mr-2">{item.icon}</div>
                  <div className="nav">{item.nav}</div>
                  {item.new && (
                    <div className=" ml-2">
                      <Image
                        alt=""
                        src="/assets/new.png"
                        width={1000}
                        height={1000}
                        className="w-8 h-8 opacity-60"
                      />
                    </div>
                  )}
                </div>
              </SheetClose>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
