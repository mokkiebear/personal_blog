import React from 'react';

import { Navigation } from 'components/navigation/navigation';

import './header.scss';


export const Header = () => (
  <div className="header">
    <div className="header__title">Блог Максима</div>
    <Navigation />
  </div>
);
