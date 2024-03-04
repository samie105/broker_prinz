import Script from "next/script";
import Home from "../components/main/Home";
export default function HomePage() {
  return (
    <>
      <Script
        src="//code.tidio.co/b3cjjxksq7ckrfh5gv2gm8c5wfudo7oe.js"
        strategy="afterInteractive"
        async
      ></Script>
      <Home />
    </>
  );
}
