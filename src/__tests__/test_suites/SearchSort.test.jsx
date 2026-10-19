
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer.jsx";

const transactions = [
  {
    id: 1,
    date: "2024-01-01",
    description: "Rent",
    category: "Housing",
    amount: 900,
  },
  {
    id: 2,
    date: "2024-01-02",
    description: "Coffee",
    category: "Food",
    amount: 5,
  },
  {
    id: 3,
    date: "2024-01-03",
    description: "Groceries",
    category: "Food",
    amount: 40,
  },
];

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mockFetch() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(transactions),
    })
  );
}

describe("Search and Sort Transactions", () => {
  it("sorts transactions by description alphabetically", async () => {
    mockFetch();
    render(<AccountContainer />);

    await screen.findByText("Rent");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "description" },
    });

    const descriptions = screen
      .getAllByRole("row")
      .slice(1)
      .map((row) => row.cells[1].textContent);

    expect(descriptions).toEqual(["Coffee", "Groceries", "Rent"]);
  });

  it("searches transactions by description", async () => {
    mockFetch();
    render(<AccountContainer />);

    await screen.findByText("Rent");

  fireEvent.change(
  screen.getByPlaceholderText("Search your Recent Transactions"),
  {
    target: { value: "coffee" },
  }
);

    expect(screen.getByText("Coffee")).toBeTruthy();
    expect(screen.queryByText("Rent")).toBeNull();
    expect(screen.queryByText("Groceries")).toBeNull();
  });
});

