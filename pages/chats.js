import Layout from "../src/components/common/MainHeaderFooterLayout";
// import Chat from '../src/components/chats/index'
import { useRouter } from "next/router";
import { decodeData } from "../src/helpers/auth";
import { LazyLoader } from "../src/components/common/LazyLoader";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import('../src/components/chats/index'), {
    loading: () => <LazyLoader />
})

export default function chats() {

    const router = useRouter();
    const { query } = router;
    const id = decodeData(query?.id);

    return (
        <Layout title={`Chats | Torsin`} data={{ layoutType: "HOME" }} description={`Torsin Dashboard`}>
            <div className="container pt-4">
                <Chat id={id} />
            </div>
        </Layout>
    );
} 