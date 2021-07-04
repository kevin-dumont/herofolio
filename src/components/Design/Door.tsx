import styled from 'styled-components';

interface DoorProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export const Door = styled.div<DoorProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
        to left,
        ${(p) => p.color1 || '#412e1e'} 10%,
        ${(p) => p.color2 || '#5e452f'} 10%
      )
      20px 0 / 20px repeat,
    ${(p) => p.color2 || '#5e452f'};
  border: 6px solid ${(p) => p.color3 || '#6b6b6b'};
  border-bottom: none;
  border-radius: 40% 40% 0 0;
  box-sizing: border-box;

  &:before {
    content: ' ';
    width: 22px;
    height: 22px;
    position: absolute;
    top: calc(50% + 20px);
    left: 10px;
    background: radial-gradient(
      100% 100% at 50% 50%,
      transparent 39%,
      #ffae00 40%,
      #ffd600 50%,
      transparent 51%
    );
  }
`;
