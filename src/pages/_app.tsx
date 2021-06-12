/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { AppProps } from 'next/app';

import { wrapper } from '@store/index';
import GlobalStyles from '@components/Design/GlobalStyles';

const SafeHydrate: FC = ({ children }) => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
);

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <SafeHydrate>
    <GlobalStyles />
    <Component {...pageProps} />
  </SafeHydrate>
);

export default wrapper.withRedux(WrappedApp);
