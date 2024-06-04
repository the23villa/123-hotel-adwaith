/**
 * Title: Write a program using JavaScript on Index
.
 * Date: 01, November 2023
 */

import Banner from "@/components/tours/Banner";
import Destinations from "@/components/tours/Destinations";
import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";

const Tours = () => {
  return (
    <main>
      <Head>
        <title>123 Hotel Booking</title>
      </Head>
      <Main>
        <Banner />
        <Destinations />
      </Main>
    </main>
  );
};

export default Tours;
