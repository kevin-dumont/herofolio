import styled from 'styled-components';

export const Platform = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: linear-gradient(
      to bottom,
      #e6af39 0,
      #e6af39 15%,
      rgba(0, 0, 0, 0) 15.5%
    ),
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 5%,
      #b98d2d 5.5%,
      #b98d2d 94.5%,
      rgba(0, 0, 0, 0) 95%
    ),
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 5%,
      #bea369 5.5%,
      #bea369 94.5%,
      rgba(0, 0, 0, 0) 95%
    );

  &::before {
    content: '';
    display: block;
    position: absolute;
  }
`;
