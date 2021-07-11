import React from 'react';
import Head from 'next/head';

import Profile from '@containers/Profile';

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
    <Profile />
  </>
);

export default Home;
