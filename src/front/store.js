export const initialStore = () => {
    return {
        token: sessionStorage.getItem("token") || null,
        user: null
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case "login":
            return { ...store, token: action.payload };
        case "logout":
            return { ...store, token: null, user: null };
        default:
            return store;
    }
}
