import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../Validations/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { userActions } from "../../Store/UserSlice";
import { motion } from "framer-motion";
import { api } from "../../api/axios";

type LoginForm = {
    email: string;
    password: string;
    rememberMe: boolean; // חדש
};

type ApiError = {
    response?: { data?: { error?: string } };
};

const LoginPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const initialData: LoginForm = {
        email: "",
        password: "",
        rememberMe: true, // ברירת מחדל: להשאיר מחובר במכשיר הזה
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        defaultValues: initialData,
        mode: "onChange",
        resolver: joiResolver(LoginSchema),
    });

    const onSubmit = async (form: LoginForm) => {
        try {
            // לוגין — שולחים גם rememberMe (השרת יקבע maxAge לעוגייה בהתאם)
            await api.post("/users/login", {
                email: form.email,
                password: form.password,
                rememberMe: form.rememberMe,
            });

            // משיכת המשתמש המחובר (מבוסס עוגייה HttpOnly)
            const { data } = await api.get("/users/me");
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
        <div
            className="min-h-screen pt-20 px-4 flex items-center justify-center bg-[#FFFFFF] font-serif text-[#3B3024]"
            style={{
                backgroundImage: "url('/backgrounds/BG4.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "right top",
                backgroundAttachment: "fixed",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="w-full max-w-lg p-8 bg-[#ffff] rounded-3xl shadow-2xl border border-[#CBB279]/50"
            >
                <h1 className="mb-6 text-4xl font-extrabold tracking-wide text-center text-[#063942]">
                    Login
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FloatingLabel
                        label="Email"
                        type="email"
                        variant="standard"
                        className="text-[#4B4B4B]"
                        autoComplete="username"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}

                    <FloatingLabel
                        label="Password"
                        type="password"
                        variant="standard"
                        className="text-[#4B4B4B]"
                        autoComplete="current-password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}

                    {/* Remember me */}
                    <label className="flex items-center gap-2 mt-1 text-sm">
                        <input type="checkbox" {...register("rememberMe")} defaultChecked />
                        <span>השאר אותי מחובר במכשיר הזה</span>
                    </label>

                    <Button
                        type="submit"
                        disabled={!isValid}
                        className="mt-2 bg-[#D1F96D] text-white font-semibold rounded-lg py-2 hover:bg-[#063942] transition duration-300"
                    >
                        Login
                    </Button>
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
