import styled from 'styled-components';
import { space, layout, themeGet, color } from 'styled-system';

const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  border-radius: ${themeGet('radii.small', '4px')};
`;

export default Box;