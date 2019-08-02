import React from "react";
import styled from "styled-components";

interface InputProps {
  id: string;
  placeholder: string;
  onChange: any;
  value: string | number;
  label: string;
}

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputLabel = styled.label`
  font-size: 14px;
  text-transform: uppercase;
  color: #818f8f;
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 2px;
  border: 1px solid #28b662;
  padding: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

export const Input = (props: InputProps) => (
  <InputGroup>
    <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
    <StyledInput {...props} />
  </InputGroup>
);
