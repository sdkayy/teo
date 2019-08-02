import React from 'react';
import styled from 'styled-components';

const Holder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TeamName = styled.div<{ winner?: boolean }>`
  font-size: 16px;
  margin-bottom: 15px;
  padding-left: 12px;
  border-radius: 2px;
  border-left: 4px solid ${props => (props.winner ? 'green' : 'red')};
`;

const Score = styled.p<{ winner?: boolean }>`
  font-size: 20px;
  ${props => props.winner && `font-weight: 600;`}
`;
interface TeamProps {
  winner: boolean;
  score: number;
  name: string;
}

export default (props: TeamProps) => (
  <Holder>
    <TeamName winner={props.winner}>{props.name}</TeamName>
    <Score winner={props.winner}>{props.score}</Score>
  </Holder>
);
