class DynamicCssLink {
  linkMap = new Map();
  headEle = document.querySelector("head");

  constructor() {}

  use(targetLink) {
    const parcelLinkList =
      targetLink instanceof Array ? targetLink : [].concat(targetLink);
    const fragment = document.createDocumentFragment();
    const temp = [];

    for (let index = 0; index < parcelLinkList.length; index++) {
      const { src, isAlternate } = parcelLinkList[index];
      const linkEle = this.createLink(src, isAlternate);
      const symbol = this.createSymbol();
      if (linkEle && this.headEle) {
        this.linkMap.set(symbol, linkEle);
        fragment.appendChild(linkEle);
        temp.push(symbol);
      }
    }

    this.headEle.appendChild(fragment);
    return temp;
  }
  show(linkSymbol) {
    this.changeAlternate(linkSymbol, false);
  }
  hide(linkSymbol) {
    this.changeAlternate(linkSymbol, true);
  }

  teardown(linkSymbol) {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    if (targetLinkElem) this.headEle.removeChild(targetLinkElem);
    this.linkMap.delete(linkSymbol);
  }

  changeAlternate(linkSymbol, isAlternate) {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    const rel = isAlternate ? "alternate stylesheet" : "stylesheet";
    targetLinkElem.setAttribute("rel", rel);
  }

  createLink(href = "", isAlternate = false) {
    if (!href) return void 0;

    const elem = document.createElement("link");
    const rel = isAlternate ? "alternate stylesheet" : "stylesheet";

    elem.setAttribute("rel", rel);
    elem.setAttribute("type", "text/css");
    elem.setAttribute("href", href);

    return elem;
  }
  createSymbol() {
    return new Date().getTime();
  }
}
