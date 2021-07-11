import React, { ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';

export interface FlexUiProps {
  justify?:
    | 'flex-start'
    | 'space-between'
    | 'space-around'
    | 'flex-end'
    | 'center';
  align?: 'flex-start' | 'center' | 'flex-end';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-revers';
  wrap?: boolean;
  flex?: string;
}

export interface FlexProps extends FlexUiProps {
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
}

const FlexUi = styled.div<FlexUiProps>`
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  flex: ${({ flex }) => flex || '0 1 auto'};
`;

const Flex = ({ ...props }: FlexProps) => <FlexUi {...props} />;

export default Flex;
