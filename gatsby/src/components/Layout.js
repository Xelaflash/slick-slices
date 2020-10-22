import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Fonts from '../styles/Fonts';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Fonts />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
