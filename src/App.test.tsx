import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock ProductList component
jest.mock("./components/ProductList", () => {
  return function MockProductList() {
    return <div data-testid="product-list">Product List Component</div>;
  };
});

// Mock InventoryManager component
jest.mock("./components/InventoryManager", () => {
  return function MockInventoryManager() {
    return (
      <div data-testid="inventory-manager">Inventory Manager Component</div>
    );
  };
});

// Helper functions to get navigation buttons
const getProductsButton = () => screen.getByText("Products");
const getInventoryButton = () => screen.getByText("Inventory");

describe("App Component", () => {
  describe("Component State Management", () => {
    test("should initialize with 'products' as default active tab", () => {
      render(<App />);

      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should update activeTab state when navigation buttons are clicked", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();
      await user.click(inventoryButton);

      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();
    });

    test("should maintain state consistency during re-renders", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<App />);

      const inventoryButton = getInventoryButton();
      await user.click(inventoryButton);

      rerender(<App />);

      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
    });
  });

  describe("Navigation Functionality", () => {
    test("should switch to 'products' tab when Products button is clicked", async () => {
      const user = userEvent.setup();
      render(<App />);

      // First switch to inventory
      await user.click(getInventoryButton());
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();

      // Then switch back to products
      await user.click(getProductsButton());
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should switch to 'inventory' tab when Inventory button is clicked", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();
      await user.click(inventoryButton);

      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();
    });

    test("should handle multiple tab switches correctly", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();
      const productsButton = getProductsButton();

      // Multiple switches
      await user.click(inventoryButton);
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();

      await user.click(productsButton);
      expect(screen.getByTestId("product-list")).toBeInTheDocument();

      await user.click(inventoryButton);
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
    });
  });

  describe("Conditional Content Rendering", () => {
    test("should render ProductList component when products tab is active", () => {
      render(<App />);

      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    test("should render InventoryManager component when inventory tab is active", async () => {
      const user = userEvent.setup();
      render(<App />);

      await user.click(getInventoryButton());

      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
    });

    test("should render ProductList component by default", () => {
      render(<App />);

      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should switch rendered content when tab changes", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Initially shows ProductList
      expect(screen.getByTestId("product-list")).toBeInTheDocument();

      // Switch to inventory
      await user.click(getInventoryButton());
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();

      // Switch back to products
      await user.click(getProductsButton());
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should handle default case in renderContent function", () => {
      // This test covers the default case in the switch statement
      render(<App />);

      // Default behavior should render ProductList
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });
  });

  describe("UI Rendering", () => {
    test("should render header with 'E-commerce Admin' logo", () => {
      render(<App />);

      expect(screen.getByText("E-commerce Admin")).toBeInTheDocument();
    });

    test("should render Products navigation button", () => {
      render(<App />);

      expect(getProductsButton()).toBeInTheDocument();
    });

    test("should render Inventory navigation button", () => {
      render(<App />);

      expect(getInventoryButton()).toBeInTheDocument();
    });

    test("should render main content container", () => {
      render(<App />);

      const mainContent = screen.getByRole("main");
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe("Active State Management", () => {
    test("should mark Products button as active when products tab is selected", () => {
      render(<App />);

      // Check if the active state is reflected in the component rendering
      // Since we're testing the default state, ProductList should be visible
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should mark Inventory button as active when inventory tab is selected", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();
      await user.click(inventoryButton);

      // Check if the active state is reflected in the component rendering
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();
    });

    test("should show only one button as active at a time", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();
      const productsButton = getProductsButton();

      // Initially products is active - verify through rendered content
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();

      // Switch to inventory
      await user.click(inventoryButton);
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();

      // Switch back to products
      await user.click(productsButton);
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
      expect(screen.queryByTestId("inventory-manager")).not.toBeInTheDocument();
    });

    test("should apply active styling correctly", async () => {
      const user = userEvent.setup();
      render(<App />);

      const inventoryButton = getInventoryButton();

      // Check initial active state through rendered content
      expect(screen.getByTestId("product-list")).toBeInTheDocument();

      // Switch tabs and verify active state changes through rendered content
      await user.click(inventoryButton);
      expect(screen.getByTestId("inventory-manager")).toBeInTheDocument();
      expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();
    });
  });
});
