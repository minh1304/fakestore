import { Fragment } from 'react'; //Component chỉ để chứa
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './Layout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/app/store';
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Router>
                <div>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
            </PersistGate>

        </Provider>
    );
}

export default App;
