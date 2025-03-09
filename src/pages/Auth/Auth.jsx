/* eslint-disable no-unused-vars */
import "./Auth.css";
import { Button } from "@/components/ui/button";

import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordForm from "./ForgotPassword";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import CustomeToast from "@/components/custome/CustomeToast";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();

  const [animate, setAnimate] = useState(false);

  const handleNavigation = (path) => {
    // setAnimate(true);
    // setTimeout(() => {
    navigate(path);
    //   setAnimate(false);
    // }, 500);
    // Adjust the delay as needed to match your animation duration
    // setAnimate(false)
  };

  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

console.log("---------- ",auth.error)


  return (
    <div className="authContainer h-screen flex items-center justify-center relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Auth Box */}
      <div className="authBox relative z-50 flex flex-col items-center justify-center p-10 m-4 shadow-lg rounded-xl text-white">
        <CustomeToast show={auth.error} message={auth.error?.error} />

        <h1 className="text-4xl font-bold mb-5 text-blue-400">CryptoQuay</h1>
        <Avatar className="mb-4">
          <AvatarImage src="https://cdn.pixabay.com/photo/2019/04/15/20/42/bitcoin-4130299_1280.png" />
          <AvatarFallback>BTC</AvatarFallback>
        </Avatar>

        {location.pathname === "/signup" ? (
          <section className={`w-full transition-all ${animate ? "slide-down" : "slide-up"}`}>
            <div className="space-y-5 w-full">
              <SignupForm />
              <div className="flex justify-center items-center">
                <span>Already have an account?</span>
                <Button onClick={() => handleNavigation("/signin")} variant="link">
                  Sign In
                </Button>
              </div>
            </div>
          </section>
        ) : location.pathname === "/forgot-password" ? (
          <section className="p-5 w-full">
            <ForgotPasswordForm />
            <div className="flex justify-center mt-5 items-center">
              <span>Back to login?</span>
              <Button onClick={() => navigate("/signin")} variant="link">
                Sign In
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <div className="space-y-5 w-full">
              <LoginForm />
              <div className="flex justify-center items-center">
                <span>New User?</span>
                <Button onClick={() => handleNavigation("/signup")} variant="link">
                  Sign Up
                </Button>
              </div>
              <Button onClick={() => navigate("/forgot-password")} variant="outline" className="w-full bg-red-500 text-black hover:bg-red-600">
                Forgot Password?
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
