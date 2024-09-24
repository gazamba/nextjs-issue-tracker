import React from "react";
import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingUserNewPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default LoadingUserNewPage;
