//Loader.js

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #444;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #eaeaea;
  font-family: monospace;
`;

function Loader({ visible, message = "Loading..." }) {
  if (!visible) return null;
  return (
    <LoaderWrapper>
      <Spinner />
      <span>{message}</span>
    </LoaderWrapper>
  );
}

export default Loader;
