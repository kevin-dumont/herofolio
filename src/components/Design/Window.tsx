import styled from 'styled-components';

export const Window = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: #9775b1;
  background-image: radial-gradient(
      50px 80px at 0 0,
      #885daa 49%,
      #885daa00 50%
    ),
    radial-gradient(50px 80px at 100% 0, #885daa 49%, #885daa00 50%),
    radial-gradient(50px 80px at -10% 110%, #885daa 49%, #885daa00 50%),
    radial-gradient(50px 80px at 110% 110%, #885daa 49%, #885daa00 50%);
  border-radius: 4px;
  border-bottom: 15px solid #fc691f;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 5px);
    height: 6px;
    width: 90%;
    border-radius: 5px;
    background-color: #b58cd6;
  }

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    top: 5%;
    height: 90%;
    border-radius: 5px;
    background-color: #b58cd6;
  }
`;
