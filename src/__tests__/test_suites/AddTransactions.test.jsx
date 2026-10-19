
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTransactionForm from "../../components/AddTransactionForm";

describe("Add Transactions", () => {
  it("submits a new transaction with the correct details", () => {
    const postTransaction = vi.fn();

    render(<AddTransactionForm postTransaction={postTransaction} />);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Grocery Shopping" },
    });

    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Food" },
    });

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "75.50" },
    });

    fireEvent.change(document.querySelector('input[name="date"]'), {
      target: { value: "2026-10-19" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Add Transaction" })
    );

    expect(postTransaction).toHaveBeenCalledWith({
      date: "2026-10-19",
      description: "Grocery Shopping",
      category: "Food",
      amount: "75.50",
    });
  });
});

