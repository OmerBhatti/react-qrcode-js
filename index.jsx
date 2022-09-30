import qrcode from "qr.js";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export default function QRCode({
  content,
  image,
  fgColor = "#000000",
  bgColor = "#ffffff",
  blockSize = 10,
  imageSize = 75,
  copyToClipboard = true,
  downloadable = false,
}) {
  const canvas = useRef();
  const [, setCells] = useState([[]]);

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
          x * 10 * blockSize_,
          y * 10 * blockSize_,
          10 * blockSize_,
          10 * blockSize_
        );
      }
    }
  };

  useEffect(() => {
    let cells = qrcode(content);
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
    <div className="center-align">
      <canvas
        className={copyToClipboard ? "pointer" : ""}
        onClick={() => {
          if (copyToClipboard) {
            document
              .getElementById("qrcode-noti")
              .removeAttribute("hidden", "");
            navigator.clipboard.writeText(content);
            setTimeout(() => {
              document.getElementById("qrcode-noti").setAttribute("hidden", "");
            }, 1000);
          }
        }}
        ref={canvas}
      ></canvas>
      <div id="qrcode-noti" className="qrcode-noti" hidden>
        Content Copied!!!
      </div>
      {downloadable && canvas.current && (
        <div>
          <a
            className="downloadButton"
            href={canvas.current.toDataURL()}
            download="qrcode.png"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
