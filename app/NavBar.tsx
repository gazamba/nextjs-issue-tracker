"use client";

import Skeleton from "@/app/components/Skeleton";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { ThemeToggle } from "./components/ThemeToggle";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 h-14 p-3 flex items-center">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" gap="4">
            <ThemeToggle />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const { resolvedTheme } = useTheme();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900 dark:!text-white": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="2rem" />;

  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );
  }
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              fallback="?"
              src={session.user!.image!}
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text>{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
