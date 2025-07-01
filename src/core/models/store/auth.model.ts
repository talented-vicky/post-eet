export interface AuthStoreProps {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}