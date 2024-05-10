import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
// import Profile from "../src/components/profile/Profile";
import { LazyLoader } from "../../src/components/common/LazyLoader";

const Support = dynamic(
    () => import('../../src/components/support/index'),
    {
        loading: () => <LazyLoader />
    })

export default function HelpSupport() {
    return (

        <Layout title={`Help and Support | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Support />
            </div>
        </Layout>
    );
}