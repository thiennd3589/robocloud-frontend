import gif1 from "../../../../assets/gif/1.gif";
import gif2 from "../../../../assets/gif/2.gif";
import gif3 from "../../../../assets/gif/3.gif";
import gif4 from "../../../../assets/gif/4.gif";
import gif5 from "../../../../assets/gif/5.gif";
import gif6 from "../../../../assets/gif/6.gif";
import gif7 from "../../../../assets/gif/7.gif";
import gif8 from "../../../../assets/gif/8.gif";
import gif9 from "../../../../assets/gif/9.gif";
import gif10 from "../../../../assets/gif/10.gif";
import gif11 from "../../../../assets/gif/11.gif";
import gif12 from "../../../../assets/gif/12.gif";
import gif13 from "../../../../assets/gif/13.gif";
import gif14 from "../../../../assets/gif/14.gif";
import gif15 from "../../../../assets/gif/15.gif";
import gif16 from "../../../../assets/gif/16.gif";
import gif17 from "../../../../assets/gif/17.gif";
import gif18 from "../../../../assets/gif/18.gif";
import gif19 from "../../../../assets/gif/19.gif";
import gif20 from "../../../../assets/gif/20.gif";
import gif21 from "../../../../assets/gif/21.gif";
import gif22 from "../../../../assets/gif/22.gif";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const gifs = [
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  gif7,
  gif8,
  gif9,
  gif10,
  gif11,
  gif12,
  gif13,
  gif14,
  gif15,
  gif16,
  gif17,
  gif18,
  gif19,
  gif20,
  gif21,
  gif22,
];

const randomGif = () => {
  return gifs[Math.floor(Math.random() * gifs.length)];
};

const DisplayGif = () => {
  const [gif, setGif] = useState(randomGif());
  const log = useSelector((state: RootState) => state.logging.logs);

  useEffect(() => {
    setGif(randomGif());
  }, [log]);

  useEffect(() => {
    const interval = setInterval(() => {
      const gif = randomGif();
      setGif(gif);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full aspect-square">
      <img src={gif} className="w-full h-full" />
    </div>
  );
};

export default DisplayGif;
