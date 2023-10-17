import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

function FullLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default FullLayout;
