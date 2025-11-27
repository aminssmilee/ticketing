"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export default function StatusBadge({ status }) {
    const normalized = status?.toLowerCase();

    let color = "bg-gray-200 text-gray-700"; // default

    switch (normalized) {
        case "open":
            color = "bg-blue-100 text-blue-700";
            break;
        case "update":
            color = "bg-yellow-100 text-yellow-700";
            break;
        case "assign":
            color = "bg-purple-100 text-purple-700";
            break;
        case "close":
            color = "bg-green-100 text-green-700";
            break;
    }

    return (
        <Badge className={`${color} px-3 py-1 rounded-md capitalize`}>
            {status}
        </Badge>
    );
}
