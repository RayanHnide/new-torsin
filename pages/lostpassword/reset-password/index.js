import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from '../../../src/components/common/lostpassword/ResetPassword';
import { useRouter } from 'next/router';
import { decodeData } from '../../../src/helpers/auth';

export default function Home() {

    const router = useRouter();
    const { query } = router;
    const data = query?.user;
    const decodedData = decodeData(data);

    return (
        <div>
            <Head>
                <title>Torsin | Reset Password</title>
                <meta name="description" content="Torsin talent app reset password screen" />
                <link rel="icon" href="/images/torsinLogo.png" />
            </Head>
            <main>
                {query && data && decodedData &&
                    <ResetPassword
                        query={decodedData}
                    />
                }
            </main>
        </div>
    )
}
