"use client";

import * as React from "react";
import { CardIcons, MetricSelectCardV4 } from "./card4";

type Key = "total" | "pending" | "approved" | "rejected";

export default function DashboardCards4() {
  const [selected, setSelected] = React.useState<Key>("approved");

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
      {/* <MetricSelectCardV4
        title="Total"
        value="3"
        subtext="All requests"
        icon={CardIcons.total}
        tone="indigo"
        selected={selected === "total"}
        onSelect={() => setSelected("total")}
        aria-label="Total"
      /> */}
      <MetricSelectCardV4
        title="Total"
        value="1"
        subtext="Awaiting action"
        icon={CardIcons.total}
        tone="blue"
        selected={selected === "total"}
        onSelect={() => setSelected("total")}
        aria-label="Total"
      />

      <MetricSelectCardV4
        title="Pending Review"
        value="0"
        subtext="Past 7 days"
        icon={CardIcons.pending}
        tone="amber"
        selected={selected === "pending"}
        onSelect={() => setSelected("pending")}
        aria-label="Pending Review"
      />
      <MetricSelectCardV4
        title="Approved"
        value="2"
        subtext="Past 7 days"
        icon={CardIcons.approved}
        tone="teal"
        selected={selected === "approved"}
        onSelect={() => setSelected("approved")}
        aria-label="Approved"
      />
      <MetricSelectCardV4
        title="Rejected"
        value="0"
        subtext="Past 7 days"
        icon={CardIcons.rejected}
        tone="red"
        selected={selected === "rejected"}
        onSelect={() => setSelected("rejected")}
        aria-label="Rejected"
      />

      {/* <MetricSelectCardV4
        title="Rejected"
        value="0"
        subtext="Past 7 days"
        icon={CardIcons.rejected}
        tone="neutral"
        selected={selected === "rejected"}
        onSelect={() => setSelected("rejected")}
        aria-label="Rejected"
      /> */}
    </div>
  );
}
