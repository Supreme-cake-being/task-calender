import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  gap: 16px;
`;

export const Button = styled.button`
  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ccc;

  transition: background-color 250ms linear;

  &:hover {
    background-color: #aaa;
  }
`;
