import qr from "qr.js";
import React, { useEffect, useRef, useState } from "react";

export default function QRCode({
  content,
  image,
  fgColor = "#000000",
  bgColor = "#ffffff",
  dimention = 10,
  blockSize = 10,
  imageSize = 75,
}) {
  const canvas = useRef();
  const [cells, setCells] = useState([[]]);

  const drawImage = (ctx, img) => {
    let imgElem = new Image(imageSize, imageSize);
    imgElem.src = img;
    imgElem.onload = () => {
      ctx.drawImage(
        imgElem,
        canvas.current.width / 2 - imgElem.width / 2,
        canvas.current.height / 2 - imgElem.height / 2,
        imgElem.width,
        imgElem.height
      );
    };
  };

  const drawQR = (ctx, map) => {
    let blockSize_ = blockSize / 10;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        ctx.fillStyle = map[x][y] ? fgColor : bgColor;
        ctx.fillRect(
          x * dimention * blockSize_,
          y * dimention * blockSize_,
          dimention * blockSize_,
          dimention * blockSize_
        );
      }
    }
  };

  useEffect(() => {
    let cells = qr(content);
    setCells(cells);

    let canvas_ = canvas.current;
    canvas_.height = blockSize * cells.moduleCount;
    canvas_.width = blockSize * cells.moduleCount;
    let ctx = canvas_.getContext("2d");
    drawQR(ctx, cells.modules, cells.moduleCount);
    if (image) {
      drawImage(ctx, image);
    }
  }, [content]);

  return (
    <>
      <canvas ref={canvas}></canvas>
    </>
  );
}
