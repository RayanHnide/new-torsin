import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
// import Profile from "../src/components/profile/Profile";
import { LazyLoader } from "../../src/components/common/LazyLoader";

const Profile = dynamic(
    () => import('../../src/components/profile/Profile'),
    {
        loading: () => <LazyLoader />
    })

export default function DashboardPage() {
    return (

        <Layout title={`Profile | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Profile />
            </div>
        </Layout>
    );
}