import dynamic from "next/dynamic";
import Layout from "../../src/components/common/MainHeaderFooterLayout";
import PaymentMethods from "../../src/components/paymentMethods/index";

export default function DashboardPage() {
    return (
        <Layout title={`Payment Methods | Torsin `} data={{ layoutType: "HOME" }} description={`Torsin Payment Methods`}>
            <div className="container pt-4">
                <PaymentMethods />
            </div>
        </Layout>
    );
}