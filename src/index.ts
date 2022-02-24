/**
 * @name Dynamic-css-link
 */

type LinkObj = {
  src: string;
  alternative?: boolean;
};

type Sign = number | symbol;

class DynamicCssLink {
  private linkMap = new Map<Sign, Element>();
  private headEle = document.querySelector("head");

  constructor() { }

  get links() {
    return this.linkMap;
  }
  /**
   * Add dynamic css-link of object or array
   */
  use(targetLink: LinkObj | LinkObj[]): Sign[] {
    if (!targetLink) return []

    const parcelLinkList =
      targetLink instanceof Array ? targetLink : [targetLink];
    const fragment = document.createDocumentFragment();
    const temp: Sign[] = [];

    for (let i = 0; i < parcelLinkList.length; i++) {
      const { src, alternative } = parcelLinkList[i];
      const linkEle = this.createLink(src, alternative);
      const symbol = this.createSymbol();
      if (linkEle && this.headEle) {
        this.linkMap.set(symbol, linkEle);
        fragment.appendChild(linkEle);
        temp.push(symbol);
      }
    }
    this.headEle?.appendChild(fragment);

    return temp;
  }
  /**
   * Show given css-link by sign
   */
  show(linkSymbol: Sign) {
    return this.changeAlternate(linkSymbol, false);
  }
  /**
   * Hide given css-link by sign
   */
  hide(linkSymbol: Sign) {
    return this.changeAlternate(linkSymbol, true);
  }
  /**
   * Teardown css-link by sign
   */
  teardown(linkSymbol: Sign): this {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    if (targetLinkElem && this.headEle) {
      this.headEle.removeChild(targetLinkElem);
    }
    this.linkMap.delete(linkSymbol);
    return this;
  }
  /**
   * Destory all dynamic css-link
   */
  destory(): this {
    this.linkMap.forEach((_, link) => this.teardown(link));
    return this;
  }


  private createLink(
    href: string,
    alternative = false
  ): HTMLLinkElement | undefined {
    if (!href) return void 0;

    const elem = document.createElement("link");
    const rel = alternative ? "alternate stylesheet" : "stylesheet";

    elem.setAttribute("rel", rel);
    elem.setAttribute("type", "text/css");
    elem.setAttribute("href", href);

    return elem;
  }
  private createSymbol(): Sign {
    const sign = new Date().getTime();
    return typeof Symbol == "function" ? Symbol(sign) : sign;
  }

  private changeAlternate(linkSymbol: Sign, targetAlternate: boolean): this {
    const targetLinkElem = this.linkMap.get(linkSymbol);
    const rel = targetAlternate ? "alternate stylesheet" : "stylesheet";
    if (targetLinkElem) {
      targetLinkElem.setAttribute("rel", rel);
    }
    return this;
  }
}

export default DynamicCssLink;
