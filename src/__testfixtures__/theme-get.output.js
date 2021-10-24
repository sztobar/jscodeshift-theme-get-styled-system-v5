import styled from 'styled-components';
import { space, layout, color } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  border-radius: ${themeGet('radii.small', '4px')};
`;

export default Box;