import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: -6px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  bottom: -42px; 
  justify-content: space-evenly;
`;

const Totals = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default Totals;
