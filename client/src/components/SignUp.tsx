import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

export const SignUpComponent = () => {
  return (
    <SignUp
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
    />
  );
};
