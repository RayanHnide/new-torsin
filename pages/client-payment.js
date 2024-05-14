import Layout from "../src/components/common/MainHeaderFooterLayout";
import Payments from "../src/components/client-components/payments/index";

export default function DashboardPage() {
    return (

        <Layout title={`Payment | Torsin `} data={{ layoutType: "HOME" }} description={`Torsin Payment`}>
            <div className="container pt-4 mx-0">
                <Payments />
            </div>
        </Layout>
    );
}