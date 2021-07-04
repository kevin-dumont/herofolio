import styled from 'styled-components';

export const Window = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: #8775b1;
  background-image: radial-gradient(
      50px 80px at 0 0,
      #5d63aa 49%,
      #5d63aa00 50%
    ),
    radial-gradient(50px 80px at 100% 0, #5d63aa 49%, #5d63aa00 50%),
    radial-gradient(50px 80px at -10% 110%, #5d63aa 49%, #5d63aa00 50%),
    radial-gradient(50px 80px at 110% 110%, #5d63aa 49%, #5d63aa00 50%);
  border-radius: 4px;
  border-bottom: 15px solid #f88807;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 5px);
    height: 6px;
    width: 90%;
    border-radius: 5px;
    background-color: #9e8ace;
  }

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    top: 5%;
    height: 90%;
    border-radius: 5px;
    background-color: #9e8ace;
  }
`;
