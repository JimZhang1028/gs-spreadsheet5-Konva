# toolbar botton append method


###  SHTEET.JS
/src/component/sheet.js

```js
function sheetInitEvents() {

// toolbar change
  toolbar.change = (type, value) => toolbarChange.call(this, type, value);
}

function toolbarChange(type, value) {
  const { data } = this;
  if (type === 'undo') {
    this.undo();
  } else if (type === 'redo') {
    this.redo();
  } else if (type === 'print') {
    // print
  } else if (type === 'paintformat') {
    if (value === true) copy.call(this);
    else clearClipboard.call(this);
  } else if (type === 'clearformat') {
    insertDeleteRowColumn.call(this, 'delete-cell-format');
  } else if (type === 'link') {
    // link
  } else if (type === 'chart') {
    // chart
  } else if (type === 'autofilter') {
    // filter
    autofilter.call(this);
  } else if (type === 'freeze') {
    if (value) {
      const { ri, ci } = data.selector;
      this.freeze(ri, ci);
    } else {
      this.freeze(0, 0);
    }
  } else {
    data.setSelectedCellAttr(type, value);
    if (type === 'formula') {
      editorSet.call(this);
    }
    sheetReset.call(this);
  }
}


export default class Sheet {
 ~
 ~
  freeze(ri, ci) {
    const { data } = this;
    data.setFreeze(ri, ci);
    sheetReset.call(this);
    return this;
  }
 ~
 ~
  enableOverlayer(flag) {  //GUSA
    if (flag) {
      this.overlayerEl.show();//GUSA
    } else {
      this.overlayerEl.hide();//GUSA
    }
  }
}

```

### TOOLBAR.JS
/src/component/toolbar.js

```js

function toggleChange(type) {
  let elName = type;
  const types = type.split('-');
  if (types.length > 1) {
    types.forEach((it, i) => {
      if (i === 0) elName = it;
      else elName += it[0].toUpperCase() + it.substring(1);
    });
  }
  const el = this[`${elName}El`];
  el.toggle();
  this.change(type, el.hasClass('active'));
}

export default class Toolbar {
  constructor(data, widthFn, isHide = false) {
  ~
  ~
  this.freezeEl = buildButtonWithIcon(`${t('toolbar.freeze')}`, 'freeze', () => toggleChange.call(this, 'freeze')),
  ~
```
## TOOLCHIP
/src/locale/en.js

```json
  toolbar: {
    overlayer: 'OverLayer enable',
```
### STYLE SHEET
/src/index.less

```css
.@{css-prefix}-icon {
~
~
  .@{css-prefix}-icon-img {
    background-image: url('../assets/sprite.svg');
    ~
    ~
    ●svgファイル g要素の順番
    &.freeze {
      left: -11 * @icon-size;
      top: -1 * @icon-size;
    }
       //  svg-faile   1行11列
    ~
    ~
```
### ICON
/assets/sprite.svg

<g xmlns="http://www.w3.org/2000/svg" transform="translate(126,0)">
　　<path fill="#000000" d="M6,12 C8.76,12 11,9.76 11,7 L11,0 L9,0 L9,7 C9,8.75029916 7.49912807,10 6,10 C4.50087193,10 3,8.75837486 3,7 L3,0 L1,0 L1,7 C1,9.76 3.24,12 6,12 Z M0,13 L0,15 L12,15 L12,13 L0,13 Z" transform="translate(3 3)"/>
</g>


