### Usage

```js
import QRCode from "react-simple-qrcode";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <QRCode content="Omer Bhatti" image={logo} />
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
- `dimention`: dimention of whole QR Code `(default: 10)`
- `blockSize`: size of single block `(default: 10)`
- `imageSize`: image dimentions `(default: 75)`
