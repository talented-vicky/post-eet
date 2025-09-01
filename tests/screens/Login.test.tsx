import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Login from "../../src/screens/Auth/sign-in-up/Login";


describe("Login Unit Test", () => {
    it("renders email and password textfields", () => {
        render(<MemoryRouter> <Login /> </MemoryRouter>);

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    it("renders login button", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);

        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it("renders reroute to signup page", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);

        // verify login reroute link is present
        const signupLink = screen.getByRole('link', { name: /sign up/i });
        expect(signupLink).toBeInTheDocument();

        // validate login points to right path
        expect(signupLink).toHaveAttribute('href', '/signup')
    })
})