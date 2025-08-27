import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilterBar from "../ProductFilterBar";
import { Category, ProductFilters } from "../../types";

const mockCategories: Category[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Books" },
];

const mockFilters: ProductFilters = {
  search: "test",
  category: 1,
  min_price: 10,
  max_price: 100,
};

const mockOnFilterChange = jest.fn();

describe("ProductFilterBar", () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("renders all filter inputs", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    expect(
      screen.getByPlaceholderText("Search products..."),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();

    // Check that the select has the correct value selected
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("1");

    expect(screen.getByPlaceholderText("Min Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max Price")).toBeInTheDocument();
  });

  it("renders all category options", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("calls onFilterChange when search input changes", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "new search" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("search", "new search");
  });

  it("calls onFilterChange when category changes", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "2" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("category", 2);
  });

  it("calls onFilterChange when min price changes", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    fireEvent.change(minPriceInput, { target: { value: "25" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("min_price", 25);
  });

  it("calls onFilterChange when max price changes", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const maxPriceInput = screen.getByPlaceholderText("Max Price");
    fireEvent.change(maxPriceInput, { target: { value: "200" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("max_price", 200);
  });

  it("handles empty string values correctly", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("search", "");
  });

  it("handles category selection with empty value", () => {
    render(
      <ProductFilterBar
        filters={mockFilters}
        categories={mockCategories}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("category", undefined);
  });
});
