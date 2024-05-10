import Layout from "../../src/components/common/MainHeaderFooterLayout";
import SuccessPage from "../../src/components/paymentMethods/SuccessPage";

export default function Index() {

    return (
        <Layout title={`Payment Success | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Payment Method Success`}>
            <div className="container pt-4">
                <SuccessPage />
            </div>
        </Layout>
    );
}