import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default props => {
  return (
    <div>  
      <div style={{ width: "100%" }}>
        <Header />
      </div>

      <Container style={{ marginTop: "10px" }}>
        <style>{`Grid
          html, body {
            background-color: #252839 !important;
          }
          p {
            align-content: center;
            background-color: #ffffff;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 6em;
          }
          p > span {
            opacity: 0.4;
            text-align: center;
          }

          .codeLogoLanding img {
            width: auto;
            height: auto;
          }
        }
        `}</style>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <Container>
          {props.children}
        </Container>
        <div style={{ width: "100%" }}>
          <Footer />
        </div>
      </Container>
    </div>
  );
};
