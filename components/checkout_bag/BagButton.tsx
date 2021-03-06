import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { useContext } from "react";
import CheckoutBagContextType from "../../utils/constants/checkout-bag";
import { CheckoutBagContext } from "../../utils/context/checkout";
import { AuthContext } from "utils/context/auth";

const BagButton: React.FC = () => {
  const { authenticated } = useContext(AuthContext);

  const router = useRouter();

  const { showBag, data } = useContext(
    CheckoutBagContext
  ) as CheckoutBagContextType;

  const showBagContainer = () => {
    if (authenticated) {
      showBag(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="main container-sm" onClick={showBagContainer}>
      <div className="row align-items-center justify-content-between">
        <div className="col-8">
          <p>Keranjang Belanja</p>
        </div>
        <div className="col-3">
          <img src="/img/bag.svg" />
        </div>
        <div className="notif">
          <p
            style={{ color: "white", fontWeight: "bold", marginTop: "0.2rem" }}
          >
            {data.length}
          </p>
        </div>
      </div>

      <style jsx>
        {`
          .main {
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
            border-radius: 51px;
            width: 110%;
            cursor: pointer;
            position: relative;
            padding: 0.8rem 2.5rem;
            background: white;
            font-size: 1rem;

            transition: filter 100ms ease-out;
          }

          .main:hover {
            filter: brightness(90%);
          }

          img {
            width: 2rem;
            float: right;
          }

          p {
            margin-block-start: 0;
            margin-block-end: 0;
          }

          .notif {
            border-radius: 100%;
            width: 1.5rem;
            height: 1.5rem;
            background-color: red;
            text-align: center;
            z-index: 1;
            position: absolute;
            right: 0;
            top: -0.5rem;
          }

          @media only screen and (max-width: 576px) {
            .main {
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BagButton;
