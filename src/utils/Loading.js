import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function Loading() {
  return (
    <ArrowPathIcon className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-5 w-5"></ArrowPathIcon>
  );
}

export default Loading;
