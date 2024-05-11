import Layout from "../../src/components/common/MainHeaderFooterLayout";
import UpdateProfile from "../../src/components/profile/UpdateProfile";

export default function DashboardPage() {
    return (

        <Layout title={`Profile | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Profile`}>
            <div className="container pt-4 mx-0">
                <UpdateProfile />
            </div>
        </Layout>
    );
}