import "@/styles/globals.scss";
import Banners from "../components/Banners";
import { Component } from "react";
import { AppProps } from "next/app";

export default function App(pageProps: AppProps) {
    return (
        <>
            {/* <Header /> */}
            <div className="content">
                <Component {...pageProps} />
            </div>
            <Banners />
        </>
    );
} 