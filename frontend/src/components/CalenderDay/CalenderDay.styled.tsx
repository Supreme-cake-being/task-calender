import styled from "styled-components";

export const Box = styled.div<{ $currentMonth: boolean }>`
  position: relative;

  height: 150px;

  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${({ $currentMonth }) => ($currentMonth ? "#ddd" : "#bbb")};
  border-radius: 4px;
`;

export const Day = styled.p`
  font-size: 12px;
  line-height: 16px;
`;

export const Events = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CreateButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
`;
