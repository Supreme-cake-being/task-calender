import styled from "styled-components";

export const Box = styled.div`
  cursor: grab;

  padding: 8px;

  background-color: #ffffff;
  border-radius: 4px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  &:active {
    cursor: grabbing;
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  width: 100%;
  height: 8px;
  margin-bottom: 4px;
`;

export const Bar = styled.div`
  width: 33%;
  height: 8px;

  background-color: green;
  border-radius: 4px;
`;

export const TaskName = styled.p`
  font-size: 14px;
  line-height: 20px;

  cursor: pointer;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TaskInput = styled.input`
  width: 100%;

  font-size: 14px;
  line-height: 20px;

  background-color: transparent;
  border: 1px solid black;
  border-radius: 8px;
`;

export const ConfirmButton = styled.button`
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
`;
