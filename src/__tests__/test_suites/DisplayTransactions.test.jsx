
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer.jsx";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Display Transactions", () => {
  it("displays transaction details in the table", async () => {
    const transactions = [
      {
        id: 1,
        date: "2024-01-01",
        description: "Coffee",
        category: "Food",
        amount: 5,
      },
      {
        id: 2,
        date: "2024-01-02",
        description: "Rent",
        category: "Housing",
        amount: 900,
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve(transactions),
      })
    );

    render(<AccountContainer />);

    // Wait for the transactions to load.
    expect(await screen.findByText("Coffee")).toBeTruthy();
    expect(screen.getByText("2024-01-01")).toBeTruthy();
    expect(screen.getByText("Food")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();

    expect(screen.getByText("Rent")).toBeTruthy();
    expect(screen.getByText("2024-01-02")).toBeTruthy();
    expect(screen.getByText("Housing")).toBeTruthy();
    expect(screen.getByText("900")).toBeTruthy();
  });
});
