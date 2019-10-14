import helper from './helper';

class Shapes {
  constructor({
    //len, width, indexWidth, minWidth,
    draggable,
  }) {
    this._ = {};
    this.draggable = draggable;
    //this.width = width;
    //this.indexWidth = indexWidth;
    //this.minWidth = minWidth;
  }

  setData(d) {
    console.log("shapes setData:", d);
    /*
    if (d.len) {
      this.len = d.len;
      delete d.len;
    }
    */
    this._ = d;
  }

  getData() {
    //const { len } = this;
    //return Object.assign({ len }, this._);
    return Object.assign( this._);
  }
/*
  getWidth(i) {
    const col = this._[i];
    if (col && col.width) {
      return col.width;
    }
    //console.log("col gwtWidth: ", this.width);
    return this.width;
  }

  getOrNew(ci) {
    this._[ci] = this._[ci] || {};
    return this._[ci];
  }

  setWidth(ci, width) {
    console.log("col setWidth: ", ci, width);
    const col = this.getOrNew(ci);
    col.width = width;
  }

  setStyle(ci, style) {
    const col = this.getOrNew(ci);
    col.style = style;
  }

  sumWidth(min, max) {
    return helper.rangeSum(min, max, i => this.getWidth(i));
  }

  totalWidth() {
    return this.sumWidth(0, this.len);
  }
  */
}

export default {};
export {
  Shapes,
};
