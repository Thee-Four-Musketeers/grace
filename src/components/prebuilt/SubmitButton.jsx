import styled from "@emotion/styled";

const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#f4e0c6" : "rgb(179, 99, 2)")};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #FFFFFF;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
