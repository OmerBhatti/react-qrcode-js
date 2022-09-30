### Usage

```js
import QRCode from "react-qrcode-js";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <QRCode content="Omer Bhatti" image={logo} blockSize={10} />
    </div>
  );
}

export default App;
```

### Preview

![preview](assets/resource.png)

### Props

- `content`: Content of QR Code
- `image`: image url to display in center of qrcode
- `fgColor`: Foreground Color `(default: "#000000")`
- `bgColor`: Background Color `(default: "#ffffff")`
- `blockSize`: size of single block `(default: 10)`
- `imageSize`: image dimentions `(default: 75)`
- `copyToClipboard`: allow copy content to clipboard on click `(default: true)`
- `downloadable`: display a button to download the QRCode as image `(default: false)`
