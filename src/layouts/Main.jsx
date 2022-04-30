import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

function Main({children}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Main;