import React from 'react';
import Head from 'next/head';
import Header from './Header';

export default props => {
  return (
    <Container>
      <Head>
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
