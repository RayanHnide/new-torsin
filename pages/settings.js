import Layout from "../src/components/common/MainHeaderFooterLayout";
import Settings from "../src/components/settings/Settings";

export default function DashboardPage() {
    return (

        <Layout title={`Settings | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Settings />
            </div>
        </Layout>
    );
}