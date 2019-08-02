import * as React from 'react';
import styled from 'styled-components';

const ErrorHolder = styled.div`
  padding: 12px;
  margin: auto;
`;

const ErrorText = styled.p`
  margin: auto;
  display: table;
  font-size: 24px;
  color: #c6c6c6;
`;

interface Props {
  message: string;
}

export default (props: Props) => (
  <ErrorHolder>
    <span
      role="img"
      aria-label="Error!"
      style={{
        fontSize: '46px',
        display: 'table',
        opacity: 0.5,
        margin: 'auto',
      }}
    >
      🤖
    </span>
    <ErrorText id="message">{props.message}</ErrorText>
  </ErrorHolder>
);
