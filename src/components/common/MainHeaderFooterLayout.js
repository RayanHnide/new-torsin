import Head from 'next/head';
import React, { memo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';
import Sidebar from './Sidebar';
import SidebarToggle from "./SidebarToggle";
import styles from '../../stylesheet/header.module.scss';
import { useSelector } from 'react-redux';

const MainHeaderFooterLayout = memo(({ children, title, data, description }) => {

    const toggle = useSelector((Gstate) => Gstate?.SidebarReducer?.toggle)
    const hide = useSelector((Gstate) => Gstate?.SidebarReducer?.hide)

    return (
        <React.Fragment>
            <Head>
                <title>{title || 'Torsin'}</title>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={description} />
                <link rel="shortcut icon" href="/images/torsinLogo.png" />
            </Head>
            <HeaderComponent />

            <Row className={`${styles.mainBodyWrapper} mx-0`}>
                {
                    /* <Col
                        xs={toggle ? 2 : 1}
                        className={`px-0 ${toggle ? styles.toggleMargin : styles.openMargin}`}
                    > */
                    <Col md={!hide ? toggle ? 2 : 1 : ""} xs={!hide && 1} xxs={!hide && 2} className={`${styles.sidebar} ${!toggle && styles.shortWidth} px-0 ${hide ? "d-none" : ""}`}>
                        {/* <Sidebar /> */}
                        <SidebarToggle />
                    </Col>
                }
                <Col md={!hide ? toggle ? 10 : 11 : 12} sm={!hide ? toggle ? 10 : 12 : 12} xs={!hide ? toggle ? 10 : 12 : 12} className={`${styles.pageContentWrapper}`}>
                    {/* <Container> */}
                    {children}
                    {/* </Container> */}
                </Col>
            </Row>
        </React.Fragment>
    );
});

export default memo(MainHeaderFooterLayout);