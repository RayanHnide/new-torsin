import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../../../src/components/common/mainpage/NavbarComponent';
import { useRouter } from 'next/router';
import { decodeData } from '../../../src/helpers/auth';
import { LazyLoader } from '../../../src/components/common/LazyLoader';
import ViewFeed from '../../../src/components/guest/ViewFeed';

export default function Home() {

    const router = useRouter();
    const { query } = router;
    const { data } = query;
    const item = decodeData(data);

    return (
        <div>
            <Head>
                <title>Torsin Talent Feeds</title>
                <meta name="description" content="Torsin Talent Details" />
                <link rel="icon" href="/images/torsinLogo.png" />
            </Head>
            <main>
                <NavbarComponent />
                {!(query && data && item) ?
                    <LazyLoader />
                    :
                    <ViewFeed query={item} />
                }
                {/* <FooterComponent /> */}
            </main>
        </div>
    )
}
