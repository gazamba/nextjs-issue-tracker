"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <div>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize={60}
              style={{ fill: "var(--accent-9)" }} // keep the color consistent with the rest of the app based on the theme color.
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default IssueChart;
