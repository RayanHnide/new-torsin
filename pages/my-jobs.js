import dynamic from "next/dynamic";
import Layout from "../src/components/common/MainHeaderFooterLayout";
// import Jobs from "../src/components/jobs/index";
import { LazyLoader } from "../src/components/common/LazyLoader";

const Jobs = dynamic(() => import("../src/components/jobs/index"), {
    loading: () => <LazyLoader />,
});

export default function JobsPage() {
    return (

        <Layout title={`My Jobs | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Jobs />
            </div>
        </Layout>
    );
}