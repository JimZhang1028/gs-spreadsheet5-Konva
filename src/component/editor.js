//* global window */
import { h } from './element';
import Suggest from './suggest';
import Datepicker from './datepicker';
import { cssPrefix } from '../config';
// import { mouseMoveUp } from '../event';

function resetTextareaSize() {
//  if (!/^\s*$/.test(this.inputText)) {
    const {
      textlineEl, textEl, areaOffset,
    } = this;
    const tlineWidth = textlineEl.offset().width + 9;
    const maxWidth = this.viewFn().width - areaOffset.left - 9;
    // console.log('tlineWidth:', tlineWidth, ':', maxWidth);
    if (tlineWidth > areaOffset.width) {
      let twidth = tlineWidth;
      if (tlineWidth > maxWidth) {
        twidth = maxWidth;
        let h1 = parseInt(tlineWidth / maxWidth, 10);
        h1 += (tlineWidth % maxWidth) > 0 ? 1 : 0;
        h1 *= this.rowHeight;
        if (h1 > areaOffset.height) {
          textEl.css('height', `${h1}px`);
        }
      }
      textEl.css('width', `${twidth}px`);
    }
//  }
}

function inputEventHandler(evt) {
    const keyCode = evt.keyCode || evt.which;
    const {
      key, ctrlKey, shiftKey, altKey, metaKey,
    } = evt;

/*
    if (altKey) {
      console.log("alt:",keyCode);
      switch (keyCode) {
        case 13:
            console.log("input alt+Enter");
            break;
      }
}   
*/
  //console.log("input:",evt);

  const v = evt.target.value;
  const { suggest, textlineEl, validator } = this;
  this.inputText =  v ;
  if (validator) {
    if (validator.type === 'list') {
      suggest.search(v);
    } else {
      suggest.hide();
    }
  } else {
    const start = v.lastIndexOf('=');
    if (start !== -1) {
      suggest.search(v.substring(start + 1));
    } else {
      suggest.hide();
    }
  }
  textlineEl.html(v);
  resetTextareaSize.call(this);
  this.change('input', v);
}

function keydownEventHandler(evt) {

    const keyCode = evt.keyCode || evt.which;
    const {
      key, ctrlKey, shiftKey, altKey, metaKey,
    } = evt;

  var v = evt.target.value;
  var t = evt.target;
                       //console.log("input :", evt);
                       //console.log("v :", t);

      if (altKey) {
            switch (keyCode) {
                 case 13:
                       //console.log("input alt+Enter");
                       //v = 13;
                       //v = '&#13';
                       //t.value =  t.value + 13
                       //t.value =  t.value + '&#13;&#10;';
                       //t.value =  t.value + "&#10;";
                      // var newline = String.fromCharCode(13, 10);
                       var newline = String.fromCharCode(13,10 );
                       t.value =  t.value + newline;
                       //t.value =  t.value + "<pre>";
                       ;
                       break;
             }
       }
 
//  console.log("keydown:",evt);

  //const v = evt.target.value;
  const { suggest, textlineEl, validator } = this;
  this.inputText =  v ;
  if (validator) {
    if (validator.type === 'list') {
      suggest.search(v);
    } else {
      suggest.hide();
    }
  } else {
    if (typeof v === 'string' || v instanceof String) {
    const start = v.lastIndexOf('=');
    if (start !== -1) {
      suggest.search(v.substring(start + 1));
    } else {
      suggest.hide();
    }
    }
  }
  textlineEl.html(v);
  resetTextareaSize.call(this);
  this.change('textarea', v);

  ////
  /*
    var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
  */
      var textarea = evt.target;

   textarea.style.height = ""; /* Reset the height*/
  textarea.style.height = textarea.scrollHeight + "px";
}

function setTextareaRange(position) {
  const { el } = this.textEl;
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(position, position);
  }, 0);
}

function setText(text, position) {
  const { textEl, textlineEl } = this;
  // firefox bug
  textEl.el.blur();

  textEl.val(text);
  textlineEl.html(text);
  setTextareaRange.call(this, position);
}

function suggestItemClick(it) {
  const { inputText, validator } = this;
  let position = 0;
  if (validator && validator.type === 'list') {
    this.inputText = it;
    position = this.inputText.length;
  } else {
    const start = inputText.lastIndexOf('=');
    const sit = inputText.substring(0, start + 1);
    let eit = inputText.substring(start + 1);
    if (eit.indexOf(')') !== -1) {
      eit = eit.substring(eit.indexOf(')'));
    } else {
      eit = '';
    }
    this.inputText = `${sit + it.key}(`;
    // console.log('inputText:', this.inputText);
    position = this.inputText.length;
    this.inputText += `)${eit}`;
  }
  setText.call(this, this.inputText, position);
}

function resetSuggestItems() {
  this.suggest.setItems(this.formulas);
}

function dateFormat(d) {
  let month = d.getMonth() + 1;
  let date = d.getDate();
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return `${d.getFullYear()}-${month}-${date}`;
}

function textarea_autosize(){
      var rows = parseInt(textarea.getAttribute("rows"));
    // If we don't decrease the amount of rows, the scrollHeight would show the scrollHeight for all the rows
    // even if there is no text.
    textarea.setAttribute("rows", "1");

    if (rows < limitRows && textarea.scrollHeight > messageLastScrollHeight) {
        rows++;
    } else if (rows > 1 && textarea.scrollHeight < messageLastScrollHeight) {
        rows--;
    }

    messageLastScrollHeight = textarea.scrollHeight;
    textarea.setAttribute("rows", rows);
}

export default class Editor {
  constructor(formulas, viewFn, rowHeight) {
    this.viewFn = viewFn;
    this.rowHeight = rowHeight;
    this.formulas = formulas;
    this.suggest = new Suggest(formulas, (it) => {
      suggestItemClick.call(this, it);
    });
    this.datepicker = new Datepicker();
    this.datepicker.change((d) => {
      // console.log('d:', d);
      this.setText(dateFormat(d));
      this.clear();
    });
    this.areaEl = h('div', `${cssPrefix}-editor-area`)
      .children(
        this.textEl = h('textarea', '')
       //   .on('input', evt => inputEventHandler.call(this, evt)),
          .on('keydown', evt => keydownEventHandler.call(this, evt)),
        //  .on('textarea', evt => textareaEventHandler.call(this, evt)),
        //this.textEl.attr("rows","5"),
        //this.textEl.attr("cols","5"),

        this.textlineEl = h('div', 'textline'),
        this.suggest.el,
        this.datepicker.el,
      )
      .on('mousemove.stop', () => {})
      .on('mousedown.stop', () => {});
    this.el = h('div', `${cssPrefix}-editor`)
      .child(this.areaEl).hide();
    this.suggest.bindInputEvents(this.textEl);

    this.areaOffset = null;
    this.freeze = { w: 0, h: 0 };
    this.cell = null;
    this.inputText = '';
    this.change = () => {};
  }

  setFreezeLengths(width, height) {
    this.freeze.w = width;
    this.freeze.h = height;
  }

  clear() {
    // const { cell } = this;
    // const cellText = (cell && cell.text) || '';
    if (this.inputText !== '') {
      this.change('finished', this.inputText);
    }
    this.cell = null;
    this.areaOffset = null;
    this.inputText = '';
    this.el.hide();
    this.textEl.val('');
    this.textlineEl.html('');
    resetSuggestItems.call(this);
    this.datepicker.hide();
  }

  setOffset(offset, suggestPosition = 'top') {
    const {
      textEl, areaEl, suggest, freeze, el,
    } = this;
    if (offset) {
      this.areaOffset = offset;
      const {
        left, top, width, height, l, t,
      } = offset;
      // console.log('left:', left, ',top:', top, ', freeze:', freeze);
      const elOffset = { left: 0, top: 0 };
      // top left
      if (freeze.w > l && freeze.h > t) {
        //
      } else if (freeze.w < l && freeze.h < t) {
        elOffset.left = freeze.w;
        elOffset.top = freeze.h;
      } else if (freeze.w > l) {
        elOffset.top = freeze.h;
      } else if (freeze.h > t) {
        elOffset.left = freeze.w;
      }
      el.offset(elOffset);
      areaEl.offset({ left: left - elOffset.left - 0.8, top: top - elOffset.top - 0.8 });
      textEl.offset({ width: width - 9 + 0.8, height: height - 3 + 0.8 });
      const sOffset = { left: 0 };
      sOffset[suggestPosition] = height;
      suggest.setOffset(sOffset);
      suggest.hide();
    }
  }

  setCell(cell, validator) {
    // console.log('::', validator);
    const { el, datepicker, suggest } = this;
    el.show();
    this.cell = cell;
    const text = (cell && cell.text) || '';
    this.setText(text);

    this.validator = validator;
    if (validator) {
      const { type } = validator;
      if (type === 'date') {
        datepicker.show();
        if (!/^\s*$/.test(text)) {
          datepicker.setValue(text);
        }
      }
      if (type === 'list') {
        suggest.setItems(validator.values());
        suggest.search('');
      }
    }
  }

  setText(text) {
    this.inputText = text ;
    // console.log('text>>:', text);
    setText.call(this, text, text.length);
    resetTextareaSize.call(this);
  }
}
