'use client'
import { Button, Label, TextInput } from "flowbite-react"
import { useThemeStore } from "../../../stores/themeStore"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useEffect, useState } from "react"
import { IoMoon, IoSunny } from "react-icons/io5"
import toast from "react-hot-toast"
import useAuthStore from "../../../stores/authStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from 'next/image'

export default function Login() {
  const { token, setToken } = useAuthStore();
  const router = useRouter();
  const { toggleTheme, isDarkMode } = useThemeStore();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (formData.email === "") {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (formData.password === "") {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    } else if (formData.password.length < 8) {
      setError((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.status === 200) {
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
          toast.success('Login successfully');
          router.push('/');
        }
      } else {
        const data = await res.json();
        toast.error(data.error);
      }

    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-slate-700 dark:bg-gray-950 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full relative text-gray-900 dark:text-white">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {isDarkMode ? <IoMoon /> : <IoSunny />}
        </button>
        <div className="flex flex-col justify-center items-center gap-3 md:mb-10 mb-5">
          <Image
            src="/images/d-logo.png"
            width={40}
            height={40}
            alt="d-logo"
          />
          <p className="md:text-xl font-medium text-gray-400 dark:text-gray-600">
            Dashboard Kit
          </p>
        </div>
        <div className="flex flex-col md:gap-3 gap-1 md:mb-10 mb-5 items-center">
          <p className="md:text-2xl text-lg text-black dark:text-white">
            Log In to Dashboard Kit
          </p>
          <p className="md:text-base text-sm text-gray-400 dark:text-gray-600">
            Enter your email and password below
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="EMAIL" />
            </div>
            <TextInput id="email" type="email" placeholder="Email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
              helperText={
                <>
                  {error.email && <small className="text-red-500">{error.email}</small>}
                </>
              }
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 inline-flex justify-between items-center w-full">
              <Label htmlFor="password" value="PASSWORD" />
              <Link href='/forgot-password' className="hover:underline text-sm text-gray-400 ">Forgot password?</Link>
            </div>
            <div className="relative">
              <TextInput id="password" type={isShowPassword ? "text" : "password"}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
                placeholder="Password"
                helperText={
                  <>
                    {error.password && <small className="text-red-500">{error.password}</small>}
                  </>
                }
              />
              <button
                className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${error.password && "mb-8"}`}
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}

              </button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-8 mt-8">
            <Button color={'blue'} type="submit">
              Log In
            </Button>
            <div className="text-gray-400 dark:text-gray-600 text-center text-sm">
              <span>
                Don&apos;t have an account? {' '}
              </span>
              <Link href={'/signup'} className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}
