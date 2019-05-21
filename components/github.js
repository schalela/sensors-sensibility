import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Github = () => (
  <Logo onClick={() => { window.location = 'google.com'; }} src={'/static/github.png'} />
);

export default Github;
