import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.div`
  padding: 8px;
  font-size: 14px;
  color: white;
  background: #28b662;
  cursor: pointer;
  border: 1px solid #28b662;

  &:hover {
    background: white;
    color: #28b662;
  }
`;

export default (props: any) => <ButtonStyled {...props}>{props.children}</ButtonStyled>;
