export const breakPoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
};

export const device = {
  mobileS: `(max-width: ${breakPoints.mobileS}px)`,
  mobileM: `(min-width: ${breakPoints.mobileS + 1}px) and (max-width: ${
    breakPoints.mobileM
  }px)`,
  mobileL: `(min-width: ${breakPoints.mobileM + 1}px) and (max-width: ${
    breakPoints.mobileL
  }px)`,
  mobile: `(max-width: ${breakPoints.mobileL}px)`, // all mobiles
  tablet: `(min-width: ${breakPoints.mobileL + 1}px) and (max-width: ${
    breakPoints.tablet
  }px)`,
  laptop: `(min-width: ${breakPoints.tablet + 1}px) and (max-width: ${
    breakPoints.laptop
  }px)`,
  laptopL: `(min-width: ${breakPoints.laptop + 1}px) and (max-width: ${
    breakPoints.laptopL
  }px)`,
};

export const below = {
  mobileM: `(max-width: ${breakPoints.mobileS}px)`, // includes mobileS
  mobileL: `(max-width: ${breakPoints.mobileM}px)`, // includes mobileM & mobileS
  tablet: `(max-width: ${breakPoints.mobileL}px)`, // includes  mobileM & mobileS & mobileL
  laptop: `(max-width: ${breakPoints.tablet}px)`, // includes   mobileM & mobileS & mobileL & tablet
  laptopL: `(max-width: ${breakPoints.laptop}px)`, // includes  mobileM & mobileS & mobileL & tablet & laptop (not laptopL)
};

export const above = {
  mobileS: `(min-width: ${breakPoints.mobileS}px)`, // includes mobileM & mobileL & tablet & laptop & laptopL
  mobileM: `(min-width: ${breakPoints.mobileM}px)`, // includes mobileL & tablet & laptop & laptopL
  mobileL: `(min-width: ${breakPoints.mobileL}px)`, // includes tablet & laptop & laptopL
  tablet: `(min-width: ${breakPoints.tablet}px)`, // includes   laptop & laptopL
  laptop: `(min-width: ${breakPoints.laptop}px)`, // includes   laptopL
};
