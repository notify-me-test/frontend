import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../ui/Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders button with children content', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders button with custom className', () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders button with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<Button {...defaultProps} style={customStyle} />);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: red');
    });
  });

  describe('Button Types', () => {
    it('renders button type by default', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders submit type when specified', () => {
      render(<Button {...defaultProps} type="submit" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Button States', () => {
    it('calls onClick when button is clicked', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('applies disabled styles when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not call onClick when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onClick gracefully', () => {
      render(<Button children="Click me" />);
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});
