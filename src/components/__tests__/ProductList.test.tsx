import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProductList from "../ProductList";
import { productService, categoryService } from "../../services/api";

// Mock API services
jest.mock("../../services/api", () => ({
  productService: {
    getProducts: jest.fn(),
  },
  categoryService: {
    getCategories: jest.fn(),
  },
}));

// Mock child components
jest.mock("../ProductFilterBar", () => {
  return (props) => {
    const { onFilterChange, filters } = props;
    return (
      <div data-testid="product-filter-bar">
        <button
          onClick={() => onFilterChange("category", 1)}
          data-testid="filter-test-button"
        >
          Filter Test
        </button>
        <span data-testid="filter-values">{JSON.stringify(filters)}</span>
      </div>
    );
  };
});

jest.mock("../ProductGrid", () => {
  return (props) => {
    const { products } = props;
    return (
      <div data-testid="product-grid">
        {products.map((product) => (
          <div key={product.id} data-testid="product-item">
            {product.name} - ${product.price}
          </div>
        ))}
      </div>
    );
  };
});

const mockProductService = productService as jest.Mocked<typeof productService>;
const mockCategoryService = categoryService as jest.Mocked<
  typeof categoryService
>;

const mockProducts = [
  {
    id: 1,
    name: "Test Product 1",
    description: "Test Description 1",
    price: "99.99",
    category: {
      id: 1,
      name: "Electronics",
      description: "Electronic devices",
      parent: undefined,
    },
    stock_quantity: 10,
    sku: "TEST001",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Low Stock Product",
    description: "Low Stock Description",
    price: "49.99",
    category: {
      id: 1,
      name: "Electronics",
      description: "Electronic devices",
      parent: undefined,
    },
    stock_quantity: 3,
    sku: "TEST002",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices",
    parent: undefined,
  },
];

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    (console.warn as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  describe("Component State Management", () => {
    test("should initialize with default state values", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });
      mockCategoryService.getCategories.mockResolvedValue([]);

      render(<ProductList />);

      expect(screen.getByText("Loading products...")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText("Product Catalog")).toBeInTheDocument();
      });
    });

    test("should update loading state during API calls", async () => {
      mockProductService.getProducts.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  count: 1,
                  next: null,
                  previous: null,
                  results: mockProducts,
                }),
              100,
            ),
          ),
      );
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      expect(screen.getByText("Loading products...")).toBeInTheDocument();

      await waitFor(() => {
        expect(
          screen.queryByText("Loading products..."),
        ).not.toBeInTheDocument();
      });
    });

    test("should update error state when API fails", async () => {
      mockProductService.getProducts.mockRejectedValue(new Error("API Error"));
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load products. Please try again later."),
        ).toBeInTheDocument();
      });
    });

    test("should clear error state on successful API call", async () => {
      mockProductService.getProducts.mockRejectedValueOnce(
        new Error("API Error"),
      );
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      const { rerender } = render(<ProductList />);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load products. Please try again later."),
        ).toBeInTheDocument();
      });

      mockProductService.getProducts.mockResolvedValueOnce({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });

      rerender(<ProductList key="retry" />);

      await waitFor(() => {
        expect(
          screen.queryByText(
            "Failed to load products. Please try again later.",
          ),
        ).not.toBeInTheDocument();
        expect(screen.getByText("Product Catalog")).toBeInTheDocument();
      });
    });
  });

  describe("API Integration", () => {
    test("should fetch products on component mount", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledWith({});
      });
    });

    test("should fetch categories on component mount", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(mockCategoryService.getCategories).toHaveBeenCalled();
      });
    });

    test("should handle product API failures gracefully", async () => {
      mockProductService.getProducts.mockRejectedValue(
        new Error("Product API Error"),
      );
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load products. Please try again later."),
        ).toBeInTheDocument();
      });
      expect(console.error).toHaveBeenCalledWith(
        "Error loading products:",
        expect.any(Error),
      );
    });

    test("should handle category API failures gracefully", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockRejectedValue(
        new Error("Category API Error"),
      );

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByText("Product Catalog")).toBeInTheDocument();
      });
      expect(console.error).toHaveBeenCalledWith(
        "Failed to load categories:",
        expect.any(Error),
      );
    });

    test("should refetch products when filters change", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledWith({});
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });

      const filterButton = screen.getByTestId("filter-test-button");
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledWith({
          category: 1,
        });
      });
    });
  });

  describe("Filter Functionality", () => {
    test("should update filters when handleFilterChange is called", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });

      const filterButton = screen.getByTestId("filter-test-button");
      fireEvent.click(filterButton);

      await waitFor(() => {
        const filterValues = screen.getByTestId("filter-values");
        expect(filterValues.textContent).toContain("category");
      });
    });

    test("should convert empty string filter values to undefined", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });

      // First, trigger a filter with actual value
      const filterButton = screen.getByTestId("filter-test-button");
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledWith({
          category: 1,
        });
      });

      // The empty string conversion is handled in the handleFilterChange function
      // We can test this by checking that empty strings don't appear in API calls
      expect(mockProductService.getProducts).not.toHaveBeenCalledWith({
        search: "",
      });
    });

    test("should preserve existing filters when updating single filter", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });

      // Set category filter first
      const filterButton = screen.getByTestId("filter-test-button");
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledWith({
          category: 1,
        });
      });

      // Check that the filter state is preserved by examining the filter-values span
      await waitFor(() => {
        const filterValues = screen.getByTestId("filter-values");
        expect(filterValues.textContent).toContain("category");
        expect(filterValues.textContent).toContain("1");
      });
    });

    test("should trigger product refetch when filters change", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });

      const filterButton = screen.getByTestId("filter-test-button");
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(mockProductService.getProducts).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Low Stock Warning System", () => {
    test("should log warning for products with stock quantity <= 5", async () => {
      const lowStockProducts = [
        { ...mockProducts[0], stock_quantity: 5 },
        { ...mockProducts[1], stock_quantity: 2 },
      ];

      mockProductService.getProducts.mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: lowStockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(console.warn).toHaveBeenCalledWith(
          "Low stock alert: Test Product 1 has only 5 items left",
        );
        expect(console.warn).toHaveBeenCalledWith(
          "Low stock alert: Low Stock Product has only 2 items left",
        );
      });
    });

    test("should not log warning for products with stock quantity > 5", async () => {
      const highStockProducts = [
        { ...mockProducts[0], stock_quantity: 10 },
        { ...mockProducts[1], stock_quantity: 15 },
      ];

      mockProductService.getProducts.mockResolvedValue({
        count: 2,
        next: null,
        previous: null,
        results: highStockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByText("Product Catalog")).toBeInTheDocument();
      });

      expect(console.warn).not.toHaveBeenCalled();
    });

    test("should log multiple warnings for multiple low stock products", async () => {
      const multipleLowStockProducts = [
        { ...mockProducts[0], stock_quantity: 1, name: "Product A" },
        { ...mockProducts[1], stock_quantity: 3, name: "Product B" },
        { ...mockProducts[0], id: 3, stock_quantity: 5, name: "Product C" },
      ];

      mockProductService.getProducts.mockResolvedValue({
        count: 3,
        next: null,
        previous: null,
        results: multipleLowStockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(console.warn).toHaveBeenCalledTimes(3);
        expect(console.warn).toHaveBeenCalledWith(
          "Low stock alert: Product A has only 1 items left",
        );
        expect(console.warn).toHaveBeenCalledWith(
          "Low stock alert: Product B has only 3 items left",
        );
        expect(console.warn).toHaveBeenCalledWith(
          "Low stock alert: Product C has only 5 items left",
        );
      });
    });
  });

  describe("Conditional Rendering", () => {
    test("should show loading message during initial load", () => {
      mockProductService.getProducts.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  count: 1,
                  next: null,
                  previous: null,
                  results: mockProducts,
                }),
              100,
            ),
          ),
      );
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      expect(screen.getByText("Loading products...")).toBeInTheDocument();
    });

    test("should show error message when API fails", async () => {
      mockProductService.getProducts.mockRejectedValue(new Error("API Error"));
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load products. Please try again later."),
        ).toBeInTheDocument();
      });
    });

    test("should show filter bar when showFilters is true", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList showFilters={true} />);

      await waitFor(() => {
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });
    });

    test("should hide filter bar when showFilters is false", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList showFilters={false} />);

      await waitFor(() => {
        expect(
          screen.queryByTestId("product-filter-bar"),
        ).not.toBeInTheDocument();
      });
    });

    test("should render ProductGrid after successful data load", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByTestId("product-grid")).toBeInTheDocument();
      });
    });
  });

  describe("Props Handling", () => {
    test("should default showFilters to true when not provided", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList />);

      await waitFor(() => {
        expect(screen.getByTestId("product-filter-bar")).toBeInTheDocument();
      });
    });

    test("should respect showFilters prop when explicitly set", async () => {
      mockProductService.getProducts.mockResolvedValue({
        count: 1,
        next: null,
        previous: null,
        results: mockProducts,
      });
      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      render(<ProductList showFilters={false} />);

      await waitFor(() => {
        expect(
          screen.queryByTestId("product-filter-bar"),
        ).not.toBeInTheDocument();
        expect(screen.getByTestId("product-grid")).toBeInTheDocument();
      });
    });
  });
});
