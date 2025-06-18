import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  line-height: 24px;
`;

export const CalenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
