import { vi, beforeEach } from 'vitest';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Posts from "../../src/screens/main/posts/Posts";
import { incrementPage } from '../../src/core/models/api/query.model';
import postApi from '../../src/api/postApi';

// mock api
vi.mock("../../src/api/postApi", () => ({
    default: {
        fetchPosts: vi.fn(),
        likePost: vi.fn(),
        fetchNearbyPosts: vi.fn(),
    }
}));

describe("Post unit test", () => {
    it("increments page", () => {
        const params = { page: 1, pageSize: 3 };
        expect(incrementPage(params)).toEqual({ page: 2, pageSize: 3 });
    });
})

describe("Post integration test", () => {
    const mockPostData = [
        { id: 1, userId: 2, title: 'test post', content: 'post content', views: 2, likes: 3, email: 'mockemail@gmail.co', username: 'mock_username', comments: 'nice mock post', imageUrls: [] }
    ];

    // hook (callback fn executed b4 this test) for resetting states, reinitializing values and clearing caches
    beforeEach(() => {
        vi.resetAllMocks();
        (postApi.fetchPosts as any).mockResolvedValue({ data: mockPostData });
    });

    it("renders posts from mock api", async () => {
        render(<MemoryRouter><Posts /></MemoryRouter>);
        await waitFor(() => expect(screen.getByText(/test post/i)).toBeInTheDocument());
    });

    it("calls likePost when btn is clicked", async () => {
        (postApi.likePost as any).mockResolvedValue({ data: { status: true, message: 'Post liked/unliked' } })
        render(<MemoryRouter><Posts /></MemoryRouter>);

        const likeBtn = await screen.findByAltText("like");
        fireEvent.click(likeBtn);

        await waitFor(() => expect(postApi.likePost).toHaveBeenCalledWith(1))
    });

    it("loads more post when btn is clicked", async () => {
        render(<MemoryRouter><Posts /></MemoryRouter>);

        const morePostBtn = screen.getByRole('button', { name: /load more/i });
        expect(morePostBtn).toBeInTheDocument();
    })
})