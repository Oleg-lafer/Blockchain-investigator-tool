//ErrorBoundary.js
import React from "react";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #2c0d0d;
  border: 1px solid #ff4d4d;
  border-radius: 10px;
  margin: 20px;
  color: #ffbaba;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
    window.location.reload(); // אפשר להחליף ל־callback אם רוצים בלי reload
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <h2>Something went wrong</h2>
          <p>{this.state.errorMessage}</p>
          <RetryButton onClick={this.handleRetry}>Retry</RetryButton>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
