import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Github = () => (
  <Logo onClick={() => { window.location = 'https://github.com/schalela/sensors-sensibility'; }} src={'/static/github.png'} />
);

export default Github;
