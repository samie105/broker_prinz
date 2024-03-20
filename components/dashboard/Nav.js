"use client";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Sheeet from "./sheeet";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import axios from "axios";
import { useUserData } from "../../contexts/userrContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/themeContext";
import { ScrollArea } from "../ui/scroll-area";

export default function Nav() {
  const router = useRouter();
  const { isDarkMode, baseColor, toggleTheme } = useTheme();
  const { coinPrices, setCoinPrices } = useUserData();
  const [loading, isloading] = useState(false);
  const { details, email, setDetails } = useUserData();
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: "0xiohxhihfojdokhijkhnofwefodsdhfodhod",
    },
    // {
    //   coinName: "Ethereum",
    //   short: "Ethereum",
    //   image: "/assets/ethereum.webp",
    //   address: "0xiohxhihfojhijkhnowefodsdhfodhod",
    // },
    // {
    //   coinName: "Tether USDT",
    //   short: "Tether",
    //   image: "/assets/Tether.webp",
    //   address: "0Xxiohxhihfookhijkhnofwefodsdhfodhod",
    // },
  ];
  const handleReadNotif = async () => {
    if (!details.isReadNotifications) {
      try {
        // Send a POST request to mark notifications as read
        const response = await axios.post(`/notifs/readNotifs/api`, { email });

        if (response.status === 200) {
          // Notifications marked as read successfully
          // Now, you can update the user's details to set isReadNotifications to true
          setDetails((prevDetails) => ({
            ...prevDetails,
            isReadNotifications: true,
          }));
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to mark notifications as read:", response.data);
        }
      } catch (error) {
        // Handle network errors or other unexpected errors
        console.error("Error marking notifications as read:", error);
      }
    }
  };
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (details.notifications && details.notifications.length > 0) {
      setNotifications(details.notifications);
    }
  }, [details]);

  // ...

  const formatRelativeTime = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Calculate the relative time to now
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Map over notifications and format the date as relative time for each
  const formattedNotifications = notifications
    ? notifications.map((notification) => ({
        ...notification,
        date: formatRelativeTime(notification.date), // Format as relative time
      }))
    : [];
  const sortedNotifications = formattedNotifications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Compare dates in descending order (newest first)
  });

  const handleNotificationClick = (id) => {
    isloading(true);
    // Send a DELETE request to the backend API to delete the notification
    axios
      .delete(`/notifs/deleteNotifs/api/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedNotifications = notifications.filter(
            (notification) => notification.id !== id
          );
          setNotifications(updatedNotifications);
          isloading(false);
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to delete notification:", response.data);
          isloading(false);
        }
      })
      .catch((error) => {
        // Handle network errors or other unexpected errors
        console.error("Error deleting notification:", error);
        isloading(false);
      });
  };
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        // Create an array of coin symbols for API request
        const coinSymbols = deposits.map((coin) => coin.short.toLowerCase());

        // API request to fetch coin prices
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbols.join(
            ","
          )}&vs_currencies=usd`
        );

        // Update coinPrices state with fetched prices
        setCoinPrices(response.data);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    // Remove the "token" cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the logout page or any other desired action
    router.replace("/auth"); // Replace "/logout" with your actual logout route
  };

  return (
    <>
      <div
        className={`nav-container flex justify-between ${
          isDarkMode
            ? `${baseColor} text-white border border-white/5`
            : "text-slate-900 border-b bg-white"
        } duration-300  items-center py-3 px-5 transition-colors  `}
      >
        <div className="burger md:hidden cursor-pointer">
          <Sheet className="p-0">
            <SheetTrigger>
              <div className="burger-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`px-4 ${
                isDarkMode ? `${baseColor} text-gray-200 border-0` : ""
              }`}
            >
              <Sheeet />
            </SheetContent>
          </Sheet>
        </div>
        <div className="title hidden md:flex">
          <h2 className="font-bold">
            <svg
              width="132"
              height="23"
              viewBox="0 0 132 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1 2C0.447715 2 0 2.44772 0 3V22C0 22.5523 0.447716 23 1 23H9.95228V14.145H12.5713V23H21C21.5523 23 22 22.5523 22 22V3C22 2.44772 21.5523 2 21 2H1ZM9.95228 10.5H12.5713V13.1036H9.95228V10.5Z"
                fill="#79BD44"
              />
              <path
                d="M25.9248 20.0439C25.6084 20.0439 25.3711 20 25.2129 19.9121C25.0605 19.8242 24.9844 19.6982 24.9844 19.5342V9.53223C24.9844 9.18652 25.2979 9.01367 25.9248 9.01367H26.4697C26.792 9.01367 27.0264 9.05762 27.1729 9.14551C27.3252 9.2334 27.4014 9.3623 27.4014 9.53223V19.5342C27.4014 19.874 27.0908 20.0439 26.4697 20.0439H25.9248ZM32.4287 20.0264C31.8018 20.0264 31.4883 19.8623 31.4883 19.5342V11.1055H29.0098C28.8457 11.1055 28.7256 11.0439 28.6494 10.9209C28.5791 10.7979 28.5439 10.5986 28.5439 10.3232V9.84863C28.5439 9.57324 28.5791 9.37402 28.6494 9.25098C28.7256 9.12793 28.8457 9.06641 29.0098 9.06641H36.4014C36.5654 9.06641 36.6826 9.12793 36.7529 9.25098C36.8291 9.37402 36.8672 9.57324 36.8672 9.84863V10.3232C36.8672 10.5986 36.8291 10.7979 36.7529 10.9209C36.6826 11.0439 36.5654 11.1055 36.4014 11.1055H33.9141V19.5342C33.9141 19.8623 33.6006 20.0264 32.9736 20.0264H32.4287ZM39.0117 20.0264C38.3848 20.0264 38.0713 19.8623 38.0713 19.5342V9.68164C38.0713 9.46484 38.1211 9.30957 38.2207 9.21582C38.3203 9.11621 38.4785 9.06641 38.6953 9.06641H41.7451C44.335 9.06641 45.6299 10.042 45.6299 11.9932C45.6299 12.585 45.4629 13.0947 45.1289 13.5225C44.8008 13.9502 44.3584 14.2695 43.8018 14.4805V14.542C43.9951 14.624 44.1973 14.7998 44.4082 15.0693C44.625 15.3389 44.7979 15.6436 44.9268 15.9834L46.3066 19.4199C46.3535 19.5605 46.377 19.6602 46.377 19.7188C46.377 19.9238 46.0664 20.0264 45.4453 20.0264H44.8037C44.2822 20.0264 43.9805 19.918 43.8984 19.7012L42.6592 16.6514C42.542 16.417 42.4277 16.2354 42.3164 16.1064C42.2109 15.9775 42.0615 15.8809 41.8682 15.8164C41.6748 15.7461 41.4141 15.7109 41.0859 15.7109H40.4795V19.5342C40.4795 19.8623 40.166 20.0264 39.5391 20.0264H39.0117ZM41.9561 13.6367C42.167 13.6367 42.3662 13.5781 42.5537 13.4609C42.7412 13.3379 42.8906 13.1738 43.002 12.9688C43.1133 12.7637 43.1689 12.5381 43.1689 12.292C43.1689 11.9287 43.0488 11.6416 42.8086 11.4307C42.5742 11.2139 42.2549 11.1055 41.8506 11.1055H40.4795V13.6367H41.9561ZM52.0986 20.1318C51.1494 20.1318 50.335 19.9824 49.6553 19.6836C48.9814 19.3848 48.4658 18.9541 48.1084 18.3916C47.751 17.8232 47.5723 17.1406 47.5723 16.3438V9.53223C47.5723 9.3623 47.6484 9.23633 47.8008 9.1543C47.9531 9.06641 48.1904 9.02246 48.5127 9.02246H49.04C49.3623 9.02246 49.5967 9.06641 49.7432 9.1543C49.8955 9.23633 49.9717 9.3623 49.9717 9.53223V16.1855C49.9717 16.5488 50.0596 16.874 50.2354 17.1611C50.417 17.4482 50.6689 17.6738 50.9912 17.8379C51.3135 17.9961 51.6826 18.0752 52.0986 18.0752C52.5146 18.0752 52.8838 17.9961 53.2061 17.8379C53.5342 17.6738 53.7891 17.4482 53.9707 17.1611C54.1523 16.874 54.2432 16.5488 54.2432 16.1855V9.53223C54.2432 9.3623 54.3164 9.23633 54.4629 9.1543C54.6152 9.06641 54.8525 9.02246 55.1748 9.02246H55.6934C56.0156 9.02246 56.25 9.06641 56.3965 9.1543C56.5488 9.23633 56.625 9.3623 56.625 9.53223V16.3438C56.625 17.1406 56.4463 17.8232 56.0889 18.3916C55.7314 18.9541 55.2129 19.3848 54.5332 19.6836C53.8594 19.9824 53.0479 20.1318 52.0986 20.1318ZM61.6787 20.1318C60.9404 20.1318 60.29 20.0586 59.7275 19.9121C59.1709 19.7598 58.7432 19.5752 58.4443 19.3584C58.1514 19.1416 58.0049 18.9365 58.0049 18.7432C58.0049 18.5908 58.0605 18.4033 58.1719 18.1807C58.2891 17.958 58.4268 17.7676 58.585 17.6094C58.7432 17.4453 58.875 17.3633 58.9805 17.3633C59.0449 17.3633 59.1826 17.4189 59.3936 17.5303C59.71 17.6943 60.0088 17.8262 60.29 17.9258C60.5771 18.0254 60.9053 18.0752 61.2744 18.0752C61.6846 18.0752 62.0303 17.9961 62.3115 17.8379C62.5986 17.6738 62.7422 17.3896 62.7422 16.9854C62.7422 16.751 62.6689 16.5488 62.5225 16.3789C62.376 16.209 62.1885 16.0654 61.96 15.9482C61.7314 15.8311 61.4209 15.6934 61.0283 15.5352L60.334 15.2363C59.9121 15.0312 59.5488 14.8057 59.2441 14.5596C58.9453 14.3135 58.6992 13.9883 58.5059 13.584C58.3184 13.1797 58.2246 12.6846 58.2246 12.0986C58.2246 11.3838 58.4004 10.7891 58.752 10.3145C59.1035 9.83984 59.5605 9.49121 60.123 9.26855C60.6855 9.0459 61.2891 8.93457 61.9336 8.93457C62.4609 8.93457 62.9385 8.99023 63.3662 9.10156C63.7939 9.20703 64.1279 9.34473 64.3682 9.51465C64.6143 9.68457 64.7373 9.85449 64.7373 10.0244C64.7373 10.165 64.6904 10.3467 64.5967 10.5693C64.5088 10.7861 64.3975 10.9766 64.2627 11.1406C64.1279 11.3047 64.002 11.3867 63.8848 11.3867C63.832 11.3867 63.7383 11.3574 63.6035 11.2988C63.3867 11.2109 63.167 11.1406 62.9443 11.0879C62.7275 11.0293 62.4609 11 62.1445 11C61.5996 11 61.2217 11.0879 61.0107 11.2637C60.7998 11.4336 60.6943 11.6357 60.6943 11.8701C60.6943 12.1396 60.7646 12.3652 60.9053 12.5469C61.0518 12.7285 61.2334 12.8779 61.4502 12.9951C61.6729 13.1123 61.9805 13.2471 62.373 13.3994C62.9648 13.6514 63.4482 13.8916 63.8232 14.1201C64.1982 14.3428 64.5205 14.665 64.79 15.0869C65.0654 15.5088 65.2031 16.0479 65.2031 16.7041C65.2031 17.5068 65.0332 18.166 64.6934 18.6816C64.3594 19.1914 63.9258 19.5605 63.3926 19.7891C62.8652 20.0176 62.2939 20.1318 61.6787 20.1318ZM69.501 20.0264C68.874 20.0264 68.5605 19.8623 68.5605 19.5342V11.1055H66.082C65.918 11.1055 65.7979 11.0439 65.7217 10.9209C65.6514 10.7979 65.6162 10.5986 65.6162 10.3232V9.84863C65.6162 9.57324 65.6514 9.37402 65.7217 9.25098C65.7979 9.12793 65.918 9.06641 66.082 9.06641H73.4736C73.6377 9.06641 73.7549 9.12793 73.8252 9.25098C73.9014 9.37402 73.9395 9.57324 73.9395 9.84863V10.3232C73.9395 10.5986 73.9014 10.7979 73.8252 10.9209C73.7549 11.0439 73.6377 11.1055 73.4736 11.1055H70.9863V19.5342C70.9863 19.8623 70.6729 20.0264 70.0459 20.0264H69.501Z"
                fill={`${isDarkMode ? "white" : "#222"}`}
              />
              <path
                d="M79.9072 20.1318C78.1494 20.1318 76.8516 19.6748 76.0137 18.7607C75.1816 17.8467 74.7656 16.4258 74.7656 14.498C74.7656 10.7891 76.5059 8.93457 79.9863 8.93457C80.4609 8.93457 80.9531 8.98145 81.4629 9.0752C81.9727 9.16895 82.3975 9.30078 82.7373 9.4707C83.083 9.63477 83.2559 9.81934 83.2559 10.0244C83.2559 10.1709 83.1973 10.3643 83.0801 10.6045C82.9629 10.8389 82.8223 11.0469 82.6582 11.2285C82.5 11.4102 82.3594 11.501 82.2363 11.501C82.207 11.501 82.1279 11.4717 81.999 11.4131C81.7178 11.2959 81.4219 11.1992 81.1113 11.123C80.8066 11.041 80.417 11 79.9424 11C79.0225 11 78.3398 11.293 77.8945 11.8789C77.4551 12.459 77.2354 13.3379 77.2354 14.5156C77.2354 15.6934 77.458 16.5811 77.9033 17.1787C78.3486 17.7764 79.0166 18.0752 79.9072 18.0752C80.3701 18.0752 80.7715 18.0283 81.1113 17.9346C81.457 17.8408 81.7939 17.7207 82.1221 17.5742C82.1396 17.5684 82.1924 17.5479 82.2803 17.5127C82.3682 17.4717 82.4326 17.4512 82.4736 17.4512C82.626 17.4512 82.7725 17.542 82.9131 17.7236C83.0537 17.8994 83.168 18.1016 83.2559 18.3301C83.3438 18.5527 83.3877 18.7139 83.3877 18.8135C83.3877 19.1006 83.1943 19.3438 82.8076 19.543C82.4268 19.7422 81.9639 19.8916 81.4189 19.9912C80.8799 20.085 80.376 20.1318 79.9072 20.1318ZM84.7061 20.0264C84.0674 20.0264 83.748 19.9121 83.748 19.6836C83.748 19.6191 83.7686 19.5254 83.8096 19.4023L87.2549 9.35645C87.3369 9.13379 87.6328 9.02246 88.1426 9.02246H88.9512C89.4609 9.02246 89.7568 9.13379 89.8389 9.35645L93.2842 19.4023C93.3135 19.5195 93.3281 19.6133 93.3281 19.6836C93.3281 19.8008 93.2637 19.8887 93.1348 19.9473C93.0117 20 92.8154 20.0264 92.5459 20.0264H91.8604C91.6143 20.0264 91.415 20.0029 91.2627 19.9561C91.1162 19.9033 91.0254 19.8184 90.9902 19.7012L90.3574 17.7939H86.6748L86.042 19.7012C85.9775 19.918 85.7373 20.0264 85.3213 20.0264H84.7061ZM89.6895 15.7285L88.8018 12.9512C88.749 12.8105 88.7021 12.6494 88.6611 12.4678C88.626 12.2861 88.5938 12.1133 88.5645 11.9492H88.5029L88.4678 12.1426C88.4092 12.4883 88.3418 12.7578 88.2656 12.9512L87.3428 15.7285H89.6895ZM95.3496 20.0264C94.7227 20.0264 94.4092 19.8623 94.4092 19.5342V9.68164C94.4092 9.46484 94.459 9.30957 94.5586 9.21582C94.6582 9.11621 94.8164 9.06641 95.0332 9.06641H98.3203C99.293 9.06641 100.154 9.30371 100.904 9.77832C101.654 10.2529 102.029 11.1553 102.029 12.4854C102.029 13.3994 101.812 14.1113 101.379 14.6211C100.945 15.125 100.456 15.4648 99.9111 15.6406C99.3721 15.8164 98.8916 15.9043 98.4697 15.9043H96.8174V19.5342C96.8174 19.8623 96.5039 20.0264 95.877 20.0264H95.3496ZM98.2061 13.8389C98.5811 13.8389 98.9004 13.7393 99.1641 13.54C99.4336 13.3408 99.5684 12.9893 99.5684 12.4854C99.5684 11.9756 99.4336 11.6182 99.1641 11.4131C98.8945 11.208 98.5752 11.1055 98.2061 11.1055H96.8174V13.8389H98.2061ZM104.165 20.0439C103.849 20.0439 103.611 20 103.453 19.9121C103.301 19.8242 103.225 19.6982 103.225 19.5342V9.53223C103.225 9.18652 103.538 9.01367 104.165 9.01367H104.71C105.032 9.01367 105.267 9.05762 105.413 9.14551C105.565 9.2334 105.642 9.3623 105.642 9.53223V19.5342C105.642 19.874 105.331 20.0439 104.71 20.0439H104.165ZM110.669 20.0264C110.042 20.0264 109.729 19.8623 109.729 19.5342V11.1055H107.25C107.086 11.1055 106.966 11.0439 106.89 10.9209C106.819 10.7979 106.784 10.5986 106.784 10.3232V9.84863C106.784 9.57324 106.819 9.37402 106.89 9.25098C106.966 9.12793 107.086 9.06641 107.25 9.06641H114.642C114.806 9.06641 114.923 9.12793 114.993 9.25098C115.069 9.37402 115.107 9.57324 115.107 9.84863V10.3232C115.107 10.5986 115.069 10.7979 114.993 10.9209C114.923 11.0439 114.806 11.1055 114.642 11.1055H112.154V19.5342C112.154 19.8623 111.841 20.0264 111.214 20.0264H110.669ZM115.556 20.0264C114.917 20.0264 114.598 19.9121 114.598 19.6836C114.598 19.6191 114.618 19.5254 114.659 19.4023L118.104 9.35645C118.187 9.13379 118.482 9.02246 118.992 9.02246H119.801C120.311 9.02246 120.606 9.13379 120.688 9.35645L124.134 19.4023C124.163 19.5195 124.178 19.6133 124.178 19.6836C124.178 19.8008 124.113 19.8887 123.984 19.9473C123.861 20 123.665 20.0264 123.396 20.0264H122.71C122.464 20.0264 122.265 20.0029 122.112 19.9561C121.966 19.9033 121.875 19.8184 121.84 19.7012L121.207 17.7939H117.524L116.892 19.7012C116.827 19.918 116.587 20.0264 116.171 20.0264H115.556ZM120.539 15.7285L119.651 12.9512C119.599 12.8105 119.552 12.6494 119.511 12.4678C119.476 12.2861 119.443 12.1133 119.414 11.9492H119.353L119.317 12.1426C119.259 12.4883 119.191 12.7578 119.115 12.9512L118.192 15.7285H120.539ZM125.883 20C125.666 20 125.508 19.9502 125.408 19.8506C125.309 19.751 125.259 19.5928 125.259 19.376V9.53223C125.259 9.3623 125.335 9.23633 125.487 9.1543C125.64 9.06641 125.877 9.02246 126.199 9.02246H126.727C127.049 9.02246 127.286 9.06641 127.438 9.1543C127.591 9.23633 127.667 9.3623 127.667 9.53223V17.9521H131.147C131.312 17.9521 131.429 18.0137 131.499 18.1367C131.575 18.2598 131.613 18.4561 131.613 18.7256V19.2178C131.613 19.4932 131.575 19.6924 131.499 19.8154C131.429 19.9385 131.312 20 131.147 20H125.883Z"
                fill="#79BD44"
              />
            </svg>
          </h2>
        </div>{" "}
        {details === 0 ? (
          <div className="flex items-center gap-x-3">
            {" "}
            <Skeleton
              className={`md:w-52 md:h-10 rounded-md  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              }  w-24 h-10`}
            />
            <Skeleton
              className={`md:w-52 md:h-10 md:rounded-sm  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10 rounded-full`}
            />
            <Skeleton
              className={`md:w-10 md:h-10 rounded-full ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10`}
            />
          </div>
        ) : (
          <div className="nav-tools text-sm flex items-center">
            <Select defaultValue="Bitcoin">
              <SelectTrigger
                className={`${isDarkMode ? "border border-[#222]" : "border"}`}
              >
                <SelectValue className="outline-none " />
              </SelectTrigger>
              <SelectContent
                className={`outline-none focus:outline-none ${
                  isDarkMode ? `${baseColor} text-white border-0` : ""
                }`}
              >
                {deposits.map((deps, index) => (
                  <div key={deps.coinName}>
                    <SelectItem key={deps.coinName} value={deps.coinName}>
                      <div className="flex items-center py-2">
                        <div className="image">
                          <Image
                            src={deps.image}
                            alt=""
                            width={20}
                            height={15}
                          />
                        </div>
                        <div className="price text-sm mx-2 font-bold">
                          {details !== 0 && details !== null ? (
                            <code>
                              {coinPrices[deps.short.toLowerCase()]
                                ? (
                                    details.tradingBalance /
                                    coinPrices[deps.short.toLowerCase()].usd
                                  ).toFixed(5)
                                : "0.00"}
                            </code>
                          ) : (
                            <span>calculating...</span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger onClick={handleReadNotif}>
                <div className="notif-cont  ml-3 relative">
                  <div
                    className={` flex font-bold ${
                      isDarkMode
                        ? `md:bg-[#79BD4410] text-[#79BD44]`
                        : "md:bg-[#79BD4410] text-[#79BD44]"
                    } rounded-full md:rounded-lg md:px-3 md:py-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="md:w-5 md:h-5 w-5 h-5 md:mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a6 6 0 1112 0c0 1.887.454 3.665 1.257 5.234a.75.75 0 01-.515 1.076 32.903 32.903 0 01-3.256.508 3.5 3.5 0 01-6.972 0 32.91 32.91 0 01-3.256-.508.75.75 0 01-.515-1.076A11.448 11.448 0 004 8zm6 7c-.655 0-1.305-.02-1.95-.057a2 2 0 003.9 0c-.645.038-1.295.057-1.95.057zM8.75 6a.75.75 0 000 1.5h1.043L8.14 9.814A.75.75 0 008.75 11h2.5a.75.75 0 000-1.5h-1.043l1.653-2.314A.75.75 0 0011.25 6h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div
                      className={`hidden md:block  ${
                        isDarkMode ? "text-[#79BD44]" : "text-[#79BD44]"
                      }`}
                    >
                      Notifications
                    </div>
                  </div>

                  {!details.isReadNotifications && (
                    <div className="notifier-dot absolute md:-right-1 right-0  top-0">
                      <div className="dot bg-red-500 md:w-3 md:h-3 animate__rubberBand animate__animated animate__infinite rounded-full w-2 h-2"></div>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[350px] md:w-[400px] mx-3 pb-0 pt-4 px-1 relative overflow-hidden ${
                  isDarkMode ? "bg-[#222] border-white/5 text-gray-200" : ""
                }`}
              >
                <div className="tit px-3">
                  <div className="flex w-full justify-between items-center pb-4">
                    <div
                      className={`title-name font-bold ${
                        isDarkMode ? "text-white" : "text-black/90"
                      }`}
                    >
                      Notifications
                    </div>
                    <div className="titcount fleex">
                      <div className=" ">
                        <div
                          className={`py-1 px-2 rounded-full text-xs font-bold ${
                            isDarkMode ? "bg-[#333]" : "bg-black/5"
                          }`}
                        >
                          {notifications.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`line w-1/2 mx-auto mb-2 h-0.5  rounded-full ${
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                  ></div>
                </div>
                <div className="cont ">
                  {notifications.length === 0 && (
                    <>
                      {" "}
                      <div className="message text-center text-sm py-4">
                        No notifications yet
                      </div>
                    </>
                  )}
                  {loading && (
                    <div
                      className={`loader-overlay absolute w-full h-full ${
                        isDarkMode ? "bg-black" : "bg-white"
                      } opacity-60 left-0 top-0 blur-2xl z-50`}
                    ></div>
                  )}
                  {notifications.length !== 0 && (
                    <>
                      <div>
                        <div className=" max-h-[300px] overflow-scroll overflow-x-hidden w-full px-3 py-3">
                          {sortedNotifications.reverse().map((notif, index) => (
                            <>
                              <div
                                className={`flex justify-between w-full items-start cursor-pointer transition-all`}
                                key={crypto.randomUUID()}
                              >
                                <div className="icon flex items-center flex-col">
                                  <div
                                    className={`${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } rounded-full p-3`}
                                  >
                                    {notif.type === "trade" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : notif.type === "transaction" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : notif.type === "intro" ? (
                                      <>🤝</>
                                    ) : notif.type === "verification" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4 text-sm"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div
                                    className={`linedwon   ${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } ${
                                      index !== notifications.length - 1
                                        ? "h-11 border border-dashed border-white/5"
                                        : ""
                                    }`}
                                    key={crypto.randomUUID()}
                                  ></div>
                                </div>
                                <div className="message w-full text-sm mx-2">
                                  <div
                                    className={`pb-1 pt-1 ${
                                      isDarkMode
                                        ? "text-white"
                                        : "text-black/90 font-bold"
                                    }`}
                                  >
                                    {" "}
                                    {notif.message}
                                  </div>
                                  <div
                                    className={`date text-xs capitalize ${
                                      isDarkMode ? "opacity-40" : "opacity-80"
                                    }`}
                                  >
                                    {notif.date}
                                  </div>
                                </div>
                                <div
                                  className="actiom pt-3 h-full /w-full"
                                  onClick={() =>
                                    handleNotificationClick(notif.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`w-4 h-4 ${
                                      isDarkMode
                                        ? "text-white/50 hover:text-white/80"
                                        : "text-black/30 hover:text-black/50"
                                    }`}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <button
              className={`theme-toggler  md:p-3  ${
                isDarkMode
                  ? "md:bg-[#79BD4420] text-[#79BD44] "
                  : "md:bg-[#79BD4410] text-[#79BD44]"
              } rounded-full mx-5 md:mx-2`}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 
                          }`}
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 
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
            <Popover>
              <PopoverTrigger>
                <div
                  className={`flex font-bold text-[#79BD44] rounded-full md:p-3 ${
                    isDarkMode ? "md:bg-[#79BD4420]" : "md:bg-[#79BD4410]"
                  } md:mr-5 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[300px] mx-3  p-1   ${
                  isDarkMode ? "bg-[#111] text-white border border-white/5" : ""
                }`}
              >
                {/* <div className="header-title py-4 px-4 font-bold">
                  <h1 className="bgname text-lg">Menus</h1>
                </div> */}
                <div className="content1 grid grid-cols-3 gap-y-4 py-3 pt-5 gap-x-3 px-3">
                  <Link href="/dashboard/account" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/profile.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Profile</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/deposits" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/wallet.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Deposit</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/withdrawals" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/withdraw.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Withdraw</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/markets" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3 relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="identifier absolute -top-1 -right-2">
                        <div className="px-2  font-normal bg-green-500 rounded-md text-white  text-[10px]">
                          Live
                        </div>
                      </div>
                      <Image
                        alt=""
                        src="/assets/increase.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Tradings</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/investments" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/money.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Investments</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/verify" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="verification-identifier absolute -top-1 -right-2">
                        {details.isVerified ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-green-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <Image
                        alt=""
                        src="/assets/veraccount.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Verification</p>
                    </div>
                  </Link>
                </div>{" "}
                <div className="relative w-full flex items-center justify-center pt-4">
                  <div
                    className={` line h-0.5 w-1/2 mx-auto top-0 left-0 ${
                      isDarkMode ? "bg-white/5" : "bg-black/10"
                    } rounded-full`}
                  ></div>
                </div>
                <div
                  className={`logout flex items-center text-sm py-3 mb-4 mx-3 rounded-md text-red-600 mt-4 ${
                    isDarkMode
                      ? "bg-red-500/10 /border /border-red-600 font-bold"
                      : "bg-red-50"
                  } px-2 font-bold cursor-pointer`}
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>Logout</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
}
