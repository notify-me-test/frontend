import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table, {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/Table";

describe("Table Component", () => {
  describe("Table", () => {
    const defaultProps = {
      children: (
        <tbody>
          <tr>
            <td>Test content</td>
          </tr>
        </tbody>
      ),
    };

    it("renders table with children content", () => {
      render(<Table {...defaultProps} />);
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders table with custom className", () => {
      render(<Table {...defaultProps} className="custom-table" />);
      const table = screen.getByRole("table");
      expect(table).toHaveClass("custom-table");
    });

    it("renders table with custom style", () => {
      const customStyle = { backgroundColor: "red" };
      render(<Table {...defaultProps} style={customStyle} />);
      const table = screen.getByRole("table");
      expect(table).toHaveStyle("background-color: red");
    });

    it("renders table with custom id", () => {
      render(<Table {...defaultProps} id="data-table" />);
      const table = screen.getByRole("table");
      expect(table).toHaveAttribute("id", "data-table");
    });

    it("applies default table styling", () => {
      render(<Table {...defaultProps} />);
      const table = screen.getByRole("table");
      expect(table).toHaveClass("table");
    });
  });

  describe("TableHeader", () => {
    const defaultProps = {
      children: (
        <tr>
          <th>Header</th>
        </tr>
      ),
    };

    it("renders thead with children content", () => {
      render(
        <Table>
          <TableHeader {...defaultProps} />
        </Table>,
      );
      expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("renders thead with custom className", () => {
      render(
        <Table>
          <TableHeader {...defaultProps} className="custom-header" />
        </Table>,
      );
      const thead = screen.getByText("Header").closest("thead");
      expect(thead).toHaveClass("custom-header");
    });

    it("renders thead with custom style", () => {
      const customStyle = { backgroundColor: "blue" };
      render(
        <Table>
          <TableHeader {...defaultProps} style={customStyle} />
        </Table>,
      );
      const thead = screen.getByText("Header").closest("thead");
      expect(thead).toHaveStyle("background-color: blue");
    });

    it("applies default thead styling", () => {
      render(
        <Table>
          <TableHeader {...defaultProps} />
        </Table>,
      );
      const thead = screen.getByText("Header").closest("thead");
      expect(thead).toHaveClass("table__header");
    });
  });

  describe("TableBody", () => {
    const defaultProps = {
      children: (
        <tr>
          <td>Body content</td>
        </tr>
      ),
    };

    it("renders tbody with children content", () => {
      render(
        <Table>
          <TableBody {...defaultProps} />
        </Table>,
      );
      expect(screen.getByText("Body content")).toBeInTheDocument();
    });

    it("renders tbody with custom className", () => {
      render(
        <Table>
          <TableBody {...defaultProps} className="custom-body" />
        </Table>,
      );
      const tbody = screen.getByText("Body content").closest("tbody");
      expect(tbody).toHaveClass("custom-body");
    });

    it("renders tbody with custom style", () => {
      const customStyle = { backgroundColor: "green" };
      render(
        <Table>
          <TableBody {...defaultProps} style={customStyle} />
        </Table>,
      );
      const tbody = screen.getByText("Body content").closest("tbody");
      expect(tbody).toHaveStyle("background-color: green");
    });

    it("applies default tbody styling", () => {
      render(
        <Table>
          <TableBody {...defaultProps} />
        </Table>,
      );
      const tbody = screen.getByText("Body content").closest("tbody");
      expect(tbody).toHaveClass("table__body");
    });
  });

  describe("TableRow", () => {
    const defaultProps = {
      children: <td>Row content</td>,
    };

    it("renders tr with children content", () => {
      render(
        <Table>
          <TableBody>
            <TableRow {...defaultProps} />
          </TableBody>
        </Table>,
      );
      expect(screen.getByText("Row content")).toBeInTheDocument();
    });

    it("renders tr with custom className", () => {
      render(
        <Table>
          <TableBody>
            <TableRow {...defaultProps} className="custom-row" />
          </TableBody>
        </Table>,
      );
      const tr = screen.getByText("Row content").closest("tr");
      expect(tr).toHaveClass("custom-row");
    });

    it("renders tr with custom style", () => {
      const customStyle = { backgroundColor: "yellow" };
      render(
        <Table>
          <TableBody>
            <TableRow {...defaultProps} style={customStyle} />
          </TableBody>
        </Table>,
      );
      const tr = screen.getByText("Row content").closest("tr");
      expect(tr).toHaveStyle("background-color: yellow");
    });

    it("applies default tr styling", () => {
      render(
        <Table>
          <TableBody>
            <TableRow {...defaultProps} />
          </TableBody>
        </Table>,
      );
      const tr = screen.getByText("Row content").closest("tr");
      expect(tr).toHaveClass("table__row");
    });
  });

  describe("TableCell", () => {
    describe("Regular Cell (td)", () => {
      const defaultProps = {
        children: "Cell content",
      };

      it("renders td with children content", () => {
        render(
          <Table>
            <TableBody>
              <TableRow>
                <TableCell {...defaultProps} />
              </TableRow>
            </TableBody>
          </Table>,
        );
        expect(screen.getByText("Cell content")).toBeInTheDocument();
      });

      it("renders td with custom className", () => {
        render(
          <Table>
            <TableBody>
              <TableRow>
                <TableCell {...defaultProps} className="custom-cell" />
              </TableRow>
            </TableBody>
          </Table>,
        );
        const td = screen.getByText("Cell content");
        expect(td).toHaveClass("custom-cell");
      });

      it("renders td with custom style", () => {
        const customStyle = { backgroundColor: "orange" };
        render(
          <Table>
            <TableBody>
              <TableRow>
                <TableCell {...defaultProps} style={customStyle} />
              </TableRow>
            </TableBody>
          </Table>,
        );
        const td = screen.getByText("Cell content");
        expect(td).toHaveStyle("background-color: orange");
      });

      it("applies default td styling", () => {
        render(
          <Table>
            <TableBody>
              <TableRow>
                <TableCell {...defaultProps} />
              </TableRow>
            </TableBody>
          </Table>,
        );
        const td = screen.getByText("Cell content");
        expect(td).toHaveClass("table__cell");
      });
    });

    describe("Header Cell (th)", () => {
      const defaultProps = {
        children: "Header content",
        isHeader: true,
      };

      it("renders th when isHeader is true", () => {
        render(
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell {...defaultProps} />
              </TableRow>
            </TableHeader>
          </Table>,
        );
        const th = screen.getByText("Header content");
        expect(th.tagName).toBe("TH");
      });

      it("renders th with custom className", () => {
        render(
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell {...defaultProps} className="custom-header-cell" />
              </TableRow>
            </TableHeader>
          </Table>,
        );
        const th = screen.getByText("Header content");
        expect(th).toHaveClass("custom-header-cell");
      });

      it("renders th with custom style", () => {
        const customStyle = { backgroundColor: "purple" };
        render(
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell {...defaultProps} style={customStyle} />
              </TableRow>
            </TableHeader>
          </Table>,
        );
        const th = screen.getByText("Header content");
        expect(th).toHaveStyle("background-color: purple");
      });

      it("applies default th styling", () => {
        render(
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell {...defaultProps} />
              </TableRow>
            </TableHeader>
          </Table>,
        );
        const th = screen.getByText("Header content");
        expect(th).toHaveClass("table__cell--header");
      });
    });
  });

  describe("Complete Table Structure", () => {
    it("renders a complete table with all components", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product 1</TableCell>
              <TableCell>$10.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product 2</TableCell>
              <TableCell>$20.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      // Check table structure
      expect(screen.getByRole("table")).toBeInTheDocument();

      // Check header content
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Price")).toBeInTheDocument();

      // Check body content
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("$10.99")).toBeInTheDocument();
      expect(screen.getByText("$20.99")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children gracefully", () => {
      render(
        <Table>
          <tbody></tbody>
        </Table>,
      );
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("handles null children gracefully", () => {
      render(
        <Table>
          <tbody>{null}</tbody>
        </Table>,
      );
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("handles complex children content", () => {
      const complexContent = (
        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <strong>Bold text</strong>
                <span>and regular text</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );

      render(<Table>{complexContent}</Table>);
      expect(screen.getByText("Bold text")).toBeInTheDocument();
      expect(screen.getByText("and regular text")).toBeInTheDocument();
    });
  });
});
