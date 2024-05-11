  import { createWrapper } from "next-redux-wrapper";
  import { Provider } from 'react-redux';
  import store from "../src/store/index";
  import { SSRProvider, ThemeProvider } from 'react-bootstrap';
  import '../styles/globals.css';
  import "bootstrap/dist/css/bootstrap.min.css";
  import { UserAuthContextProvider } from "../src/firebase_setup/auth/UserAuthContext";

  function MyApp({ Component, pageProps }) {
    return (
      <ThemeProvider>
        <SSRProvider>
          <Provider store={store}>
            <UserAuthContextProvider>
              <Component {...pageProps} />
            </UserAuthContextProvider>
          </Provider>
        </SSRProvider>
      </ThemeProvider>
    )
  }

  const makeStore = () => store;
  const wrapper = createWrapper(makeStore, { debug: false });

  export default wrapper.withRedux(MyApp);
