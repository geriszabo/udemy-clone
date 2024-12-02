import { Loader2 } from "lucide-react";
import React from "react";

export const Loading = () => {
  return (
    <div>
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </div>
  );
};
