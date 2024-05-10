import dynamic from "next/dynamic";
import Layout from "../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../src/components/common/LazyLoader";
// import Proposals from "../src/components/proposals/index";

const Proposals = dynamic(() => import('../src/components/proposals/index'), {
    loading: () => <LazyLoader />
})

export default function DashboardPage() {
    return (

        <Layout title={`Proposals | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Proposals />
            </div>
        </Layout>
    );
}