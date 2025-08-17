import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../ui/Card';

describe('Card Component', () => {
  const defaultProps = {
    children: 'Card content',
  };

  describe('Basic Rendering', () => {
    it('renders card with children content', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders card with custom className', () => {
      render(<Card {...defaultProps} className="custom-class" />);
      const card = screen.getByText('Card content').closest('div');
      expect(card).toHaveClass('custom-class');
    });

    it('renders card with custom style', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<Card {...defaultProps} style={customStyle} />);
      const card = screen.getByText('Card content').closest('div');
      expect(card).toHaveStyle('background-color: red');
    });

    it('renders card with custom id', () => {
      render(<Card {...defaultProps} id="card-1" />);
      const card = screen.getByText('Card content').closest('div');
      expect(card).toHaveAttribute('id', 'card-1');
    });
  });

  describe('Card Styling', () => {
    it('renders with default card styling', () => {
      render(<Card {...defaultProps} />);
      const card = screen.getByText('Card content').closest('div');
      expect(card).toHaveClass('card');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Card children="" />);
      const card = screen.getByRole('generic');
      expect(card).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Card children={null} />);
      const card = screen.getByRole('generic');
      expect(card).toBeInTheDocument();
    });

    it('handles complex children content', () => {
      const complexChildren = (
        <div>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </div>
      );
      render(<Card>{complexChildren}</Card>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });
});
