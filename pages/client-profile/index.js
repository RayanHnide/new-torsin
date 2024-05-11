import Layout from "../../src/components/common/MainHeaderFooterLayout";
import Profile from "../../src/components/client-components/profile/Profile";

export default function DashboardPage() {
    return (
        <Layout title={`Profile | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Profile`}>
            <div className="container pt-4 mx-0">
                <Profile />
            </div>
        </Layout>
    );
}