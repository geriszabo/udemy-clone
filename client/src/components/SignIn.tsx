"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useSearchParams } from "next/navigation";
import React from "react";

export const SignInComponent = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("id");

  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : "/signup";

  const getRedirectUrl = () => {
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}`;
    }
    const userType = user?.publicMetadata?.userType as "teacher" | "student";
    if (userType === "teacher") {
      return "/teacher/courses";
    }
    return "/user/courses";
  };

  const forceRedirectUrl = getRedirectUrl();
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        elements: {
          rootBox: "flex justify-center items-center py-5",
          cardBox: "shadow-none",
          card: "bg-customgreys-secondarybg w-full sahdow-none",
          formFieldLabel: "text-white-50 font-normal",
          footer: {
            background: "#25262F",
            padding: "0rem 2.5rem",
            "& > div > div:nth-child(1)": {
              background: "#25262F",
            },
          },
          formButtonPrimary:
            "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
          formFieldInput:
            "bg-customgreys-primartybg text-white-50 !shadow-none",
          footerActionLink: "text-primary-750 hover:text-primarty-600",
        },
      }}
      signUpUrl={signUpUrl}
      forceRedirectUrl={forceRedirectUrl}
      routing="hash"
      afterSignOutUrl="/"
    />
  );
};
