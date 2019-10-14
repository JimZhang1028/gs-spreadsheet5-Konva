/* global window, document */
import { h } from './component/element';
import DataProxy from './core/data_proxy';
import Sheet from './component/sheet';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import './index.less';
import Tweakpane from 'tweakpane';

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

  getEl() {
     return this.rootEl2;
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

//--------------------------------
//const pane = new Tweakpane({container: spreadsheet.getEl(),});
    const pane = new Tweakpane();
        const PARAMS = {
		b: true,
		c: '#ff8800',
		n: 50,
		s: 'string',
	};
	const nf = pane.addFolder({
		title: 'Number',
	});
	nf.addInput(PARAMS, 'n', {
		label: 'text',
	});
	nf.addInput(PARAMS, 'n', {
		label: 'slider',
		max: 100,
		min: 0,
	});
	nf.addInput(PARAMS, 'n', {
		label: 'list',
		options: {
			low: 0,
			medium: 50,
			high: 100,
		},
	});
	const sf = pane.addFolder({
		title: 'String',
	});
	sf.addInput(PARAMS, 's', {
		label: 'text',
	});
	sf.addInput(PARAMS, 's', {
		label: 'list',
		options: {
			dark: 'Dark',
			light: 'Light',
		},
	});
	const bf = pane.addFolder({
		title: 'Boolean',
	});
	bf.addInput(PARAMS, 'b', {
		label: 'checkbox',
	});
	const cf = pane.addFolder({
		title: 'Color',
	});
	cf.addInput(PARAMS, 'c', {
		label: 'text',
	});
//--------------------------------
export default Spreadsheet;
export {
  spreadsheet,
};
