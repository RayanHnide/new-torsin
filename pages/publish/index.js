import Layout from "../../src/components/common/MainHeaderFooterLayout";
import Publish from "../../src/components/publish/Publish";
import Home from "../../src/components/publish";

export default function DashboardPage() {
    return (

        <Layout title={`Publish a Job | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Publish Job`}>
            <div className="container pt-4 mx-0">
                {/* <Publish /> */}
                <Home />
            </div>
        </Layout>
    );
}