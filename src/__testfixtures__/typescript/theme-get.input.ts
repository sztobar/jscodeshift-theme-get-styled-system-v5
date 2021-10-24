import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { space, layout, themeGet, color } from 'styled-system';

interface Props {
  hasRadius: boolean;
}

const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${(props: Props) =>
    props.hasRadius
      ? css`
          border-radius: ${themeGet('radii.small', '4px')};
        `
      : ''};
`;

export default Box;
