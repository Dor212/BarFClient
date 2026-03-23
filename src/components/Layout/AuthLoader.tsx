import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { decode } from "../../Services/tokenServices";
import { userActions } from "../../Store/UserSlice";

type DecodedToken = {
    _id: string;
    isAdmin: boolean;
    exp?: number;
};

const AuthLoader = () => {
    const { VITE_API_URL } = import.meta.env;
    const dispatch = useDispatch();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = decode(token) as DecodedToken;

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                return;
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios
                .get(`${VITE_API_URL}/users/${decoded._id}`)
                .then((res) => {
                    dispatch(userActions.login(res.data));
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        localStorage.removeItem("token");
                        delete axios.defaults.headers.common["Authorization"];
                    }
                    console.log("Failed loading user:", err);
                });
        } catch (err) {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            console.log("Invalid token:", err);
        }
    }, [dispatch, VITE_API_URL]);

    return null;
};

export default AuthLoader;