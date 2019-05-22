import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 15px;
`;

const Totals = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default Totals;
