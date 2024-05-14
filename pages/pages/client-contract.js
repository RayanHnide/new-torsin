import { useRouter } from "next/router";
import Layout from "../src/components/common/MainHeaderFooterLayout";
import Contracts from "../src/components/client-components/contracts";
import { decodeData } from "../src/helpers/auth";

export default function ContractsPage() {

    const router = useRouter()
    const { query } = router;

    return (

        <Layout title={`My Contracts | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Contracts`}>
            <div className="container pt-4 mx-0">
                <Contracts queryDetails={query} />
            </div>
        </Layout>
    );
}
