import { Component, ErrorInfo, ReactElement } from "react";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    try {
      window.console.error("Default error componentDidCatch", error, errorInfo);
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
