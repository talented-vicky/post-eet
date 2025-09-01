import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import SignUp from "../../src/screens/Auth/sign-in-up/SignUp";

describe("Signup screen", () => {
    it("renders email, username and password textfields", () => {
        // mounting login component in mock router
        render(<MemoryRouter><SignUp /></MemoryRouter>);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();

        // verify presence of password field
        const passwordField = screen.getByPlaceholderText(/password/i);
        expect(passwordField).toBeInTheDocument();

        // verify passowrd field has the right type (for security);
        expect(passwordField).toHaveAttribute('type', 'password');
    });

    it("renders state and lga dropdown fields", () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);

        expect(screen.getByLabelText(/select state/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/select city/i)).toBeInTheDocument();
    });

    it("renders signup button", () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);

        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it("renders re-routing link to login page", () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);

        // check that link is present
        const loginLink = screen.getByRole('link', { name: /log in/i });
        expect(loginLink).toBeInTheDocument();

        // confirm link points to the correct path
        expect(loginLink).toHaveAttribute('href', '/login');
    });
})