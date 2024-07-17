import { create } from 'zustand';

type AuthStore = {
    currentUser: any;
    token: any;
    setCurrentUser: (user: any) => void;
    setToken: (token: any) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    currentUser: null,
    token: typeof window !== "undefined" ? window.localStorage.getItem('ACCESS_TOKEN') : null,
    setCurrentUser: (user: any) => set({ currentUser: user }),
    setToken: (token: any) => {
        set({ token: token });
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
}));

export default useAuthStore;