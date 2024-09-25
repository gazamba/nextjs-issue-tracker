import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const LoadingUserDetailPage = () => {
  return (
    <Box className="space-y-3 max-w-xl">
      <Skeleton />
      <Flex gap="3" my={"2"}>
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingUserDetailPage;
