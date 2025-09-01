import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe("App Routing", () => {
    it("Renders Home Page on Default", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
});