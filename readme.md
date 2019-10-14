# gs-spreadsheet

## x-spredsheet 機能拡張 Konva

## Konvc

## https://konvajs.org/

> A web-based JavaScript spreadsheet

<p align="center">
  <a href="https://github.com/myliang/x-spreadsheet">
    <img width="100%" src="https://raw.githubusercontent.com/devg1120/gs-spreadsheet2/master/docs/split.png">
  </a>
</p>

```js
class Spreadsheet {
  constructor(selectors, options = {}) {
    let targetEl = selectors;
    let targetEl2 = selectors;
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
      targetEl2 = document.querySelector(selectors+'2');
    }
    this.data = new DataProxy('sheet1', options);
    this.data2 = new DataProxy('sheet2', options);

    const rootEl = h('div', `${cssPrefix}`)
      .on('contextmenu', evt => evt.preventDefault());
    const rootEl2 = h('div', `${cssPrefix}`)
      .on('contextmenu', evt => evt.preventDefault());
    // create canvas element
    targetEl.appendChild(rootEl.el);
    targetEl2.appendChild(rootEl2.el);
    this.sheet = new Sheet(rootEl, this.data);
    this.sheet2 = new Sheet(rootEl2, this.data2);

    this.data.verticalAddSplitSheet(this.sheet2);
    this.data2.verticalAddSplitSheet(this.sheet);
    //this.data.horizontalAddSplitSheet(this.sheet2);
    //this.data2.horizontalAddSplitSheet(this.sheet);
  }

  loadData(data ) {
    this.sheet.loadData(data);  //splitsheet 同じdataをロードする
    this.sheet2.loadData(data);
    //this.sheet2.loadData(this.sheet.exportData());
    return this;
  }

  getData() {
    return this.data.getData();
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    console.log("Spreadsheet change");
    this.data.change = cb;
    return this;
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

if (window) {
  window.x = window.x || {};
  window.x.spreadsheet = spreadsheet;
  window.x.spreadsheet.locale = (lang, message) => locale(lang, message);
}

export default Spreadsheet;
export {
  spreadsheet,
};

```



## CDN
```html
<link rel="stylesheet" href="https://unpkg.com/x-data-spreadsheet@1.0.13/dist/xspreadsheet.css">
<script src="https://unpkg.com/x-data-spreadsheet@1.0.13/dist/xspreadsheet.js"></script>

<script>
   x.spreadsheet('#xspreadsheet');
</script>
```

## NPM

```shell
npm install x-data-spreadsheet
```

```html
<div id="x-spreadsheet-demo"></div>
```

```javascript
import Spreadsheet from "x-data-spreadsheet";
// If you need to override the default options, you can set the override
// const options = {};
// new Spreadsheet('#x-spreadsheet-demo', options);
const s = new Spreadsheet("#x-spreadsheet-demo")
  .loadData({}) // load data
  .change(data => {
    // save data to db
  });

// data validation
s.validate()
```

```javascript
// default options
{
  showToolbar: true,
  showGrid: true,
  showContextmenu: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 100,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    strike: false,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'Helvetica',
      size: 10,
      bold: false,
      italic: false,
    },
  },
}
```

## Internationalization
```javascript
// npm 
import Spreadsheet from 'x-data-spreadsheet';
import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';

Spreadsheet.locale('zh-cn', zhCN);
new Spreadsheet(document.getElementById('xss-demo'));
```
```html
<!-- Import via CDN -->
<link rel="stylesheet" href="https://unpkg.com/x-data-spreadsheet@1.0.13/dist/xspreadsheet.css">
<script src="https://unpkg.com/x-data-spreadsheet@1.0.13/dist/xspreadsheet.js"></script>
<script src="https://unpkg.com/x-data-spreadsheet@1.0.13/dist/locale/zh-cn.js"></script>

<script>
  x.spreadsheet.locale('zh-cn');
</script>
```

## Features
  - Undo & Redo
  - Paint format
  - Clear format
  - Format
  - Font
  - Font size
  - Font bold
  - Font italic
  - Underline
  - Strike
  - Text color
  - Fill color
  - Borders
  - Merge cells
  - Align
  - Text wrapping
  - Freeze cell
  - Functions
  - Resize row-height, col-width
  - Copy, Cut, Paste
  - Autofill
  - Insert row, column
  - Delete row, column
  - Data validations

## Development

```sheel
git clone https://github.com/myliang/x-spreadsheet.git
cd x-spreadsheet
npm install
npm run dev
```

Open your browser and visit http://127.0.0.1:8080.

## Browser Support

Modern browsers(chrome, firefox, Safari).

## LICENSE

MIT
