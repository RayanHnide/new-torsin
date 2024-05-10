import dynamic from "next/dynamic";
import Layout from "../src/components/common/MainHeaderFooterLayout";
// import PaymentMethods from "../src/components/paymentMethods/index";
import { LazyLoader } from "../src/components/common/LazyLoader";

const PaymentMethods = dynamic(import('../src/components/paymentMethods/index'), {
    loading: () => <LazyLoader />
})

export default function DashboardPage() {
    return (

        <Layout title={`Payment Methods | Torsin `} data={{ layoutType: "HOME" }} description={`Torsin Payment Methods`}>
            <div className="container pt-4">
                <PaymentMethods />
            </div>
        </Layout>
    );
}