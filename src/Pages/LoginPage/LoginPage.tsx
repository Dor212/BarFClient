import { joiResolver } from "@hookform/resolvers/joi";
import {  FloatingLabel } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "../../Validations/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { userActions } from "../../Store/UserSlice";
import { motion } from "framer-motion";
import { api } from "../../api/axios";
import type { AxiosInstance } from "axios";

type LoginForm = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type ApiError = {
    response?: { data?: { error?: string } };
};

const LoginPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        defaultValues: { email: "", password: "", rememberMe: true },
        mode: "onChange",
        resolver: joiResolver(LoginSchema),
    });

    const onSubmit = async (form: LoginForm) => {
        console.log("✅ Form submitted:", form);

        
        console.log("✅ API baseURL:", (api as AxiosInstance).defaults.baseURL);

        try {
            const resp = await api.post("/users/login", {
                email: form.email,
                password: form.password,
                rememberMe: form.rememberMe,
            });
            console.log("Login status:", resp.status);

            const { data } = await api.get("/users/me");
            console.log("User /me:", data);

            dispatch(userActions.login(data));

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Login Success",
                showConfirmButton: false,
                timer: 1500,
            });

            nav("/#logo");
        } catch (error) {
            console.error("❌ Login error (client):", error);
            const msg =
                (error as ApiError).response?.data?.error ||
                "Your email or password is incorrect";
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: msg,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 flex items-center justify-center bg-[#FFFFFF] font-serif text-[#3B3024]">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="w-full max-w-lg p-8 bg-[#ffff] rounded-3xl shadow-2xl border border-[#CBB279]/50"
            >
                <h1 className="mb-6 text-4xl font-extrabold tracking-wide text-center text-[#063942]">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit, (errs) => {
                        console.warn("❗ RHF validation errors:", errs);
                    })}
                    className="flex flex-col gap-5"
                >
                    
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabel
                                label="Email"
                                type="email"
                                variant="standard"
                                className="text-[#4B4B4B]"
                                autoComplete="username"
                                id="email"
                                {...field}
                            />
                        )}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{String(errors.email.message)}</p>
                    )}

                    
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabel
                                label="Password"
                                type="password"
                                variant="standard"
                                className="text-[#4B4B4B]"
                                autoComplete="current-password"
                                id="password"
                                {...field}
                            />
                        )}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600">
                            {String(errors.password.message)}
                        </p>
                    )}

                 
                    <label className="flex items-center gap-2 mt-1 text-sm">
                        <input type="checkbox" {...register("rememberMe")} defaultChecked />
                        <span>השאר אותי מחובר במכשיר הזה</span>
                    </label>

                    
                    <button
                        type="submit"
                        className="mt-2 bg-[#D1F96D] text-white font-semibold rounded-lg py-2 hover:bg-[#063942] transition duration-300"
                        onClick={() => console.log("🖱️ submit clicked")}
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#5A4B36]">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#8C7351] hover:underline"
                    >
                        Sign Up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
