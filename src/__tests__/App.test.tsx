import { act, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "../store/utils";

it("renders without crashing", async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
        expect(screen.getByText("src")).toBeInTheDocument();
    });
    
});
