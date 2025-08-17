import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../ui/Input';

describe('Input Component', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders input with default type text', () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders input with custom placeholder', () => {
      render(<Input {...defaultProps} placeholder="Enter text..." />);
      const input = screen.getByPlaceholderText('Enter text...');
      expect(input).toBeInTheDocument();
    });

    it('renders input with custom value', () => {
      render(<Input {...defaultProps} value="initial value" />);
      const input = screen.getByDisplayValue('initial value');
      expect(input).toBeInTheDocument();
    });

    it('renders input with custom className', () => {
      render(<Input {...defaultProps} className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('renders input with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<Input {...defaultProps} style={customStyle} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveStyle('background-color: red');
    });
  });

  describe('Input Types', () => {
    it('renders text input by default', () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders number input when type is number', () => {
      render(<Input {...defaultProps} type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Input States', () => {
    it('calls onChange when value changes', () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
    });

    it('applies disabled styles when disabled', () => {
      render(<Input {...defaultProps} disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Input Features', () => {
    it('supports name attribute', () => {
      render(<Input {...defaultProps} name="username" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'username');
    });

    it('supports id attribute', () => {
      render(<Input {...defaultProps} id="user-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'user-input');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onChange gracefully', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(() => fireEvent.change(input, { target: { value: 'test' } })).not.toThrow();
    });

    it('handles empty value gracefully', () => {
      render(<Input {...defaultProps} value="" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });
});

