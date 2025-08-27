import React from "react";
import { Category, ProductFilters } from "../types";
import { Input, Select } from "./ui";

interface ProductFilterBarProps {
  filters: ProductFilters;
  categories: Category[];
  onFilterChange: (key: keyof ProductFilters, value: any) => void;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  filters,
  categories,
  onFilterChange,
}) => {
  // Debug logging
  console.log("ProductFilterBar render:", { filters, categories });

  // Convert categories to the format expected by our Select component
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  console.log("Category options:", categoryOptions);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "30px",
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Input
        type="text"
        placeholder="Search products..."
        value={filters.search || ""}
        onChange={(e) => onFilterChange("search", e.target.value)}
      />

      <div>
        <label>Category: </label>
        <Select
          options={categoryOptions}
          value={filters.category ?? ""}
          onChange={(e) =>
            onFilterChange(
              "category",
              e.target.value ? parseInt(e.target.value) : undefined,
            )
          }
        />
      </div>

      <Input
        type="number"
        placeholder="Min Price"
        value={filters.min_price || ""}
        onChange={(e) =>
          onFilterChange(
            "min_price",
            e.target.value ? parseFloat(e.target.value) : undefined,
          )
        }
      />

      <Input
        type="number"
        placeholder="Max Price"
        value={filters.max_price || ""}
        onChange={(e) =>
          onFilterChange(
            "max_price",
            e.target.value ? parseFloat(e.target.value) : undefined,
          )
        }
      />
    </div>
  );
};

export default ProductFilterBar;
