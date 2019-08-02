import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

interface CardProps {
  isSpecial?: boolean;
  isBigger?: boolean;
}

export const DisplayCard = styled.div<CardProps>`
  width: ${props => (props.isBigger ? '75%' : '50%')};
  border-radius: 2px;
  background: white;
  padding: 12px;
  border: 1px solid #ebecee;
  ${props => props.isSpecial && `border-top: 6px solid #28B662`}
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const VerticalContainer = styled.div<{ center?: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${props =>
    props.center &&
    `
    justify-content: center;
    align-items: center;
  `}
`;
