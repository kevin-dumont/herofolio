import React from 'react';
import Head from 'next/head';

import Formation from '@containers/Formation';

const Home = () => (
  <>
    <Head>
      <title>
        Herofolio - Le portfolio de Kevin Dumont, développeur React passionné
        depuis plus de 10 ans sur Paris
      </title>
      <meta
        name="description"
        content="Découvrez le portfolio de Kévin Dumont, développeur React passionné depuis plus de 10 ans sur la région de Paris"
      />
    </Head>
    <Formation />
  </>
);

export default Home;
