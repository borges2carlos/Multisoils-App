export interface AuthProps {
  token: string | null;
  setToken: (token: string) => void;
}

const auth = set => ({
  token: null,
  setToken: (token: string) => set({ token }),
});

export default auth;
