import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
// import Profile from "../src/components/profile/Profile";
import { LazyLoader } from "../../src/components/common/LazyLoader";

const UpdateProfile = dynamic(
    () => import('../../src/components/profile/UpdateProfile'),
    {
        loading: () => <LazyLoader />
    })

export default function DashboardPage() {
    return (

        <Layout title={`Update Profile | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Update Profile`}>
            <div className="container pt-4">
                <UpdateProfile />
            </div>
        </Layout>
    );
}