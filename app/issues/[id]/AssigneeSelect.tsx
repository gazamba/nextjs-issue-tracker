"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
import { get } from "http";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    };
    getUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
