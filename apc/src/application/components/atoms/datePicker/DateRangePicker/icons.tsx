import styled from 'styled-components';

import ArrowSvg from '$application/assets/icons/arrow-right.svg';
import WaffleSvg from '$application/assets/icons/waffle.svg';

export const WaffleIcon = styled(WaffleSvg)`
  width: 24px;
  height: 24px;
  path,
  use {
    fill: ${({ theme }) => theme.palette.grey[700]};
  }
`;

export const ArrowIcon = styled(ArrowSvg)`
  width: 20px;
  height: 20px;
  path,
  use {
    fill: ${({ theme }) => theme.palette.grey[700]};
  }
`;
