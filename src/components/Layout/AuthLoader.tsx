import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { decode } from "../../Services/tokenServices";
import { userActions } from "../../Store/UserSlice";

const AuthLoader = () => {
    const { VITE_API_URL } = import.meta.env;
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("🚀 AuthLoader found token in localStorage:", token);

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            try {
                const decoded = decode(token);
                axios.get(`${VITE_API_URL}/users/${decoded._id}`)
                    .then(res => {
                        dispatch(userActions.login(res.data));
                        console.log("✅ Loaded user from server:", res.data);
                    })
                    .catch(err => {
                        console.log("❌ Failed loading user. Keeping token but user will not be logged.", err);
                    });
            } catch (err) {
                console.log("❌ Invalid token:", err);
            }
        }
    }, [dispatch]);

    return null;
};

export default AuthLoader;
