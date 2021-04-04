/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import Aside from './aside';
import './layout.css';

const Layout = ({ location, children }) => {
  return (
    <div className="layout">
      <Aside location={location} />
      <div className="main-container">
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
