import Script from "next/script";
import Home from "../components/main/Home";
export default function HomePage() {
  return (
    <>
      <Script
        src="//code.tidio.co/rhs7kacj3lpcw2xqb9o2agrohae1hs8j.js"
        strategy="afterInteractive"
        async
      ></Script>
      <Home />
    </>
  );
}
