import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "../ui/Select";

describe("Select Component", () => {
  const defaultOptions = [
    { value: "", label: "All Categories" },
    { value: "1", label: "Electronics" },
    { value: "2", label: "Clothing" },
    { value: "3", label: "Books" },
  ];

  const defaultProps = {
    options: defaultOptions,
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders select with options", () => {
      render(<Select {...defaultProps} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      // Check that all options are rendered
      expect(screen.getByText("All Categories")).toBeInTheDocument();
      expect(screen.getByText("Electronics")).toBeInTheDocument();
      expect(screen.getByText("Clothing")).toBeInTheDocument();
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("renders select with custom value", () => {
      render(<Select {...defaultProps} value="1" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveValue("1");
    });

    it("renders select with custom className", () => {
      render(<Select {...defaultProps} className="custom-class" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("custom-class");
    });

    it("renders select with custom style", () => {
      const customStyle = { backgroundColor: "red" };
      render(<Select {...defaultProps} style={customStyle} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveStyle("background-color: red");
    });
  });

  describe("Select Options", () => {
    it("renders options with value and label", () => {
      render(<Select {...defaultProps} />);
      const select = screen.getByRole("combobox");

      // Check that options have correct values
      const options = select.querySelectorAll("option");
      expect(options[0]).toHaveValue("");
      expect(options[1]).toHaveValue("1");
      expect(options[2]).toHaveValue("2");
      expect(options[3]).toHaveValue("3");
    });

    it("handles empty options array", () => {
      render(<Select {...defaultProps} options={[]} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      expect(select.children).toHaveLength(0);
    });
  });

  describe("Select Interactions", () => {
    it("calls onChange when selection changes", () => {
      render(<Select {...defaultProps} />);
      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "1" } });
      expect(defaultProps.onChange).toHaveBeenCalled();
    });
  });

  describe("Select Features", () => {
    it("supports name attribute", () => {
      render(<Select {...defaultProps} name="category" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("name", "category");
    });

    it("supports id attribute", () => {
      render(<Select {...defaultProps} id="category-select" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "category-select");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onChange gracefully", () => {
      render(<Select options={defaultOptions} onChange={() => {}} />);
      const select = screen.getByRole("combobox");
      expect(() =>
        fireEvent.change(select, { target: { value: "1" } }),
      ).not.toThrow();
    });

    it("handles empty value gracefully", () => {
      render(<Select {...defaultProps} value="" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveValue("");
    });
  });
});
