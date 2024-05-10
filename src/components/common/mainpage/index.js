import React from 'react';
import NavbarComponent from './NavbarComponent';
import BannerSection from './BannerSection';
import Blogs from './Blogs';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import Footer from './FooterComponent';

export default function index() {

    return (
        <>
            <NavbarComponent />
            <BannerSection />
            <Blogs />
            <WhyChooseUs />
            <Services />
            <Footer />
        </>
    )
}
