import dynamic from "next/dynamic";
import Layout from "../../../src/components/common/MainHeaderFooterLayout";
import { LazyLoader } from "../../../src/components/common/LazyLoader";
import { useRouter } from "next/router";
import { decodeData } from "../../../src/helpers/auth";

const PaymentElement = dynamic(
    () => import('../../../src/components/transaction/TransactionDetails'),
    {
        loading: () => <LazyLoader />
    }
)

export default function Payment() {

    const router = useRouter()
    const { query } = router
    const { data } = query;
    const decodedData = decodeData(data);

    return (

        <Layout title={`Payment Detail | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                {!(query && data && decodedData) ?
                    <LazyLoader />
                    :
                    <PaymentElement
                        query={decodedData}
                    />
                }
            </div>
        </Layout>
    );
}