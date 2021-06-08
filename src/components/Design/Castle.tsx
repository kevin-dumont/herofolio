import React from 'react';

import { BrickBg } from '@/components/Design/BrickBg';

const Castle = () => (
  <>
    <BrickBg
      color1="silver"
      color2="gray"
      color3="gray"
      style={{
        width: '20%',
        height: 30,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
    <BrickBg
      color1="silver"
      color2="gray"
      color3="gray"
      style={{
        width: '20%',
        height: 30,
        position: 'absolute',
        top: 0,
        left: '40%',
      }}
    />
    <BrickBg
      color1="silver"
      color2="gray"
      color3="gray"
      style={{
        width: '20%',
        height: 30,
        position: 'absolute',
        top: 0,
        left: '80%',
      }}
    />
    <BrickBg
      color1="silver"
      color2="gray"
      color3="gray"
      style={{ width: '100%', marginTop: 30 }}
    />
  </>
);

export default Castle;
