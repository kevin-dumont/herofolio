import styled from 'styled-components';

export const Clock = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  margin-left: -75px;
  border-radius: 50%;
  background-color: white;
  background-image: radial-gradient(
      circle at center,
      #655b4e 4px,
      transparent 4px
    ),
    radial-gradient(
      circle at center,
      white 47%,
      transparent 47%,
      transparent 57%,
      white 57%
    );
  border: 10px solid #f0e0db;
  box-shadow: inset 0 2px 2px 2px rgb(0 0 0 / 10%), 0 2px 2px rgb(0 0 0 / 10%);
  box-sizing: border-box;

  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
  }

  &::before {
    width: 20px;
    height: 3px;
    left: 46%;
    top: 48%;
    background-color: #4e5a65;
    border-radius: 4px;
  }

  &::after {
    width: 14px;
    height: 3px;
    top: 42%;
    left: 30%;
    background-color: #4e5a65;
    border-radius: 4px;
    transform: rotate(32deg);
  }
`;
