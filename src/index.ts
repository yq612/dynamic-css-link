/**
 * @name Dynamic-css-link
 */

import { LinkObj, Sign } from "../types";

class DynamicCssLink {
  private linkMap = new Map<Sign, Element>();
  private headEle = document.querySelector("head");

  constructor() {}

  /**
   * Add dynamic css-link of object or array
   */
  use(targetLink: LinkObj | LinkObj[]): Sign[] {
    const parcelLinkList =
      targetLink instanceof Array ? targetLink : [targetLink];
    const fragment = document.createDocumentFragment();
    const temp: Sign[] = [];

    for (let i = 0; i < parcelLinkList.length; i++) {
      const { src, isAlternate } = parcelLinkList[i];
      const linkEle = this.createLink(src, isAlternate);
      const symbol = this.createSymbol();
      if (linkEle && this.headEle) {
        this.linkMap.set(symbol, linkEle);
        fragment.appendChild(linkEle);
        temp.push(symbol);
      }
    }

    return [];
  }
  /**
   * Show given css-link by sign
   */
  show(linkSymbol: Sign) {
    this.changeAlternate(linkSymbol, false);
  }
  /**
   * Hide given css-link by sign
   */
  hide(linkSymbol: Sign) {
    this.changeAlternate(linkSymbol, true);
  }
  /**
   * Teardown css-link by sign
   */
  teardown(linkSymbol: Sign) {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    if (targetLinkElem && this.headEle) {
      this.headEle.removeChild(targetLinkElem);
    }
    this.linkMap.delete(linkSymbol);
  }
  /**
   * Destory all dynamic css-link
   */
  destory() {
    this.linkMap.forEach((_, link) => this.teardown(link));
  }
  links() {
    return this.linkMap;
  }

  private createLink(
    href: string,
    isAlternate = false
  ): HTMLLinkElement | undefined {
    if (!href) return void 0;

    const elem = document.createElement("link");
    const rel = isAlternate ? "alternate stylesheet" : "stylesheet";

    elem.setAttribute("rel", rel);
    elem.setAttribute("type", "text/css");
    elem.setAttribute("href", href);

    return elem;
  }
  private createSymbol(): Sign {
    const sign = new Date().getTime();
    return typeof Symbol == "function" ? Symbol(sign) : sign;
  }

  private changeAlternate(linkSymbol: Sign, targetAlternate: boolean) {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    const rel = targetAlternate ? "alternate stylesheet" : "stylesheet";
    if (targetLinkElem) {
      targetLinkElem.setAttribute("rel", rel);
    }
  }
}

export default new DynamicCssLink();
