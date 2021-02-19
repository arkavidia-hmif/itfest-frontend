import * as React from "react";
import MerchStore from "components/merchstore/MerchStore";
import MerchStoreTop from "components/merchstore/MerchStoreTop";
import Layout from "components/commons/Layout";
import ColorfulHeader from "components/ColorfulHeader";
import { Theme } from "styles/theme";
import GradientSeparator from "components/auth/GradientSeparator";
import CheckoutBagProvider from "provider/CheckoutBagProvider";


const MerchStoreMain: React.FC = () => {
  const title = "Merch Store";
  return (
    <Layout title={title}>
      <CheckoutBagProvider>
        <div className="container">
          <ColorfulHeader color={Theme.headerColors.pipl} headingLevel={1} size="3rem">{title}</ColorfulHeader>
          <GradientSeparator />
          <div className="mb-5" />
          <div className="mt-3 mb-5">
            <MerchStoreTop />
          </div>
          <div className="pt-5">
            <MerchStore />
          </div>
          <div className="mb-5 pb-5" />
        </div>
        <style jsx>{`
        p { 
          color: #7446a1;
        }  
      `}</style>
      </CheckoutBagProvider>
    </Layout>

  );
};

export default MerchStoreMain;
