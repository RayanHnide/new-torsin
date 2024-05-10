// DashboardPage.js
import React from "react";
import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import DashboardContent from "../../src/components/client-dashboard/Dashboard";

export default function DashboardPage() {
    return (
        <Layout title={`Dashboard | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4 mx-0">
                <DashboardContent />
            </div>
        </Layout>
    );
}
