import dynamic from "next/dynamic";
import { LazyLoader } from "../../src/components/common/LazyLoader";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import Dashboard from "../../src/components/dashboard/Dashboard";

const DashboardElement = dynamic(() => import('../../src/components/dashboard/Dashboard'), {
    loading: () => <LazyLoader />,
});

export default function DashboardPage() {
    return (
        <Layout title="Dashboard | Torsin" data={{ layoutType: "HOME" }} description="Torsin Dashboard">
            <div className="container pt-4">
                <DashboardElement />
            </div>
        </Layout>
    );
}
