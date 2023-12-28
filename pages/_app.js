import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import btmImage from "../public/Vectors.svg";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['cyrillic'] })

export default function App({ Component, pageProps }) {
  return (
    <div className="main_wrapper">
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <div className="bottom-image">
        <img src={btmImage.src} style={{width: "100%"}} />
      </div>
    </div>
  );
}
