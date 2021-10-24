import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { space, layout, color } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

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
