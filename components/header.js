import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: sans-serif;
  display: flex;
  justify-content: space-between;
`;

const Header = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default Header;
