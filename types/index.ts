export type LinkObj = {
  src: string;
  isAlternate?: boolean;
};

export type Sign = number | symbol;

export type DynamicCssLinkType = {
  /** 使用一个css link */
  use: (targetLink: LinkObj | LinkObj[]) => Sign[];
  teardown: (linkSymbol: Sign) => void;
};
