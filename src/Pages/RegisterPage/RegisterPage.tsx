import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import RegisterSchema from "../../Validations/RegisterSchema";
import { Button, FloatingLabel } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { api } from "../../api/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";

type RegisterForm = {
    name: { first: string; last: string };
    phone: string;
    email: string;
    password: string;
    rememberMe: boolean;
};

type ApiError = { response?: { data?: { error?: string } } };

const RegisterPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const initialData: RegisterForm = {
        name: { first: "", last: "" },
        phone: "",
        email: "",
        password: "",
        rememberMe: true, // ברירת מחדל - לזכור את המכשיר
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterForm>({
        defaultValues: initialData,
        mode: "all",
        resolver: joiResolver(RegisterSchema),
    });

    const onSubmit = async (form: RegisterForm) => {
        try {
            // 1) רישום
            await api.post("/users/register", {
                name: form.name,
                phone: form.phone,
                email: form.email,
                password: form.password,
            });

            // 2) התחברות אוטומטית עם rememberMe
            await api.post("/users/login", {
                email: form.email,
                password: form.password,
                rememberMe: form.rememberMe,
            });

            // 3) משיכת המשתמש המחובר ועדכון Redux
            const me = await api.get("/users/me");
            dispatch(userActions.login(me.data));

            Swal.fire({
                position: "top",
                icon: "success",
                title: "Account created — you’re in!",
                showConfirmButton: false,
                timer: 1500,
            });

            nav("/#logo");
        } catch (err) {
            const msg =
                (err as ApiError).response?.data?.error ||
                "Sorry, something went wrong";
            Swal.fire({
                position: "top",
                icon: "error",
                title: msg,
                showConfirmButton: false,
                timer: 1500,
            });
            console.error(err);
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
                <h1 className="mb-6 text-4xl font-extrabold text-center text-[#063942] tracking-wide">
                    Register
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FloatingLabel label="First Name" type="text" variant="standard"
                        className="text-[#4B4B4B]" autoComplete="given-name" {...register("name.first")} />
                    {errors.name?.first && <p className="text-sm text-red-600">{errors.name.first.message}</p>}

                    <FloatingLabel label="Last Name" type="text" variant="standard"
                        className="text-[#4B4B4B]" autoComplete="family-name" {...register("name.last")} />
                    {errors.name?.last && <p className="text-sm text-red-600">{errors.name.last.message}</p>}

                    <FloatingLabel label="Phone" type="tel" variant="standard"
                        className="text-[#4B4B4B]" autoComplete="tel" {...register("phone")} />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}

                    <FloatingLabel label="Email" type="email" variant="standard"
                        className="text-[#4B4B4B]" autoComplete="email" {...register("email")} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

                    <FloatingLabel label="Password" type="password" variant="standard"
                        className="text-[#4B4B4B]" autoComplete="new-password" {...register("password")} />
                    {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

                    {/* Remember me */}
                    <label className="flex items-center gap-2 mt-2 text-sm">
                        <input type="checkbox" {...register("rememberMe")} defaultChecked />
                        <span>השאר אותי מחובר במכשיר הזה</span>
                    </label>

                    <Button type="submit" disabled={!isValid}
                        className="mt-4 bg-[#D1F96D] text-white font-semibold rounded-lg py-2 hover:bg-[#063942] transition duration-300">
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[#5A4B36]">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-[#8C7351] hover:underline">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
