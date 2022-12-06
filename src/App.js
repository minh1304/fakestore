import { createContext, useState } from 'react';
import { Fragment } from 'react'; //Component chỉ để chứa
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './Layout';
function App() {
    // const [song, setSong] = useState(Data[0]);
    // console.log(Data.length);
    // const handleSetSong = (idSong) => {
    //     const song = Data.find((song) => song.id === idSong);
    //     if (!song) setSong(Data[Data.length - 1]);
    //     // else if()
    //     else setSong(song);
    // };
    return (
        // <DataMusics.Provider value={{ Data, song, handleSetSong }}>
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
        // </DataMusics.Provider>
    );
}

export default App;
