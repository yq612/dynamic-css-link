/**
 * @name Dynamic-css-link
 */
declare type LinkObj = {
    src: string;
    alternative?: boolean;
};
declare type Sign = number | symbol;
declare class DynamicCssLink {
    private linkMap;
    private headEle;
    constructor();
    get links(): Map<Sign, Element>;
    /**
     * Add dynamic css-link of object or array
     */
    use(targetLink: LinkObj | LinkObj[]): Sign[];
    /**
     * Show given css-link by sign
     */
    show(linkSymbol: Sign): this;
    /**
     * Hide given css-link by sign
     */
    hide(linkSymbol: Sign): this;
    /**
     * Teardown css-link by sign
     */
    teardown(linkSymbol: Sign): this;
    /**
     * Destory all dynamic css-link
     */
    destory(): this;
    private createLink;
    private createSymbol;
    private changeAlternate;
}
export default DynamicCssLink;
