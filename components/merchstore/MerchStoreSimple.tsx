import MerchStoreMerchSimple from "./MerchStoreMerchSimple";
import { MerchStorePlaceholderItems } from "utils/constants/merch-store-placeholder";
import { Dimen } from "styles/dimen";
import FilledButton from "components/commons/FilledButton";

interface Props {
  merchantName: string;
  handleMore: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MerchStoreSimple: React.FC<Props> = ({ merchantName, handleMore }) => {
  const { storeLogo } = {
    storeLogo: "/img/merchstore/store_logo.png",
  };

  return (
    <div className="merch-store-container">
      <div className="row merch-store-container-top">
        <div className="w-100 merch-title">
          <div className="merch-store-top-left">
            <img className="" src={storeLogo} alt={merchantName} />
            <h2 className="">{merchantName}&#39;s Shop</h2>
          </div>
          <div className="merch-store-top-right">
            <FilledButton
              text="More"
              padding=".5rem 2.25rem"
              fontSize="1.25rem"
              onClick={handleMore}
            />
          </div>
        </div>
      </div>

      <div className="px-3 merch-store-container-bottom d-flex justify-content-center">
        <div className="merch-store-bottom ">
          <div>
            <h3 className="store-items-title">Top Merch</h3>
            <div className="mt-4 mb-2">
              <MerchStoreMerchSimple items={MerchStorePlaceholderItems} />
            </div>
          </div>
          <div>
            <h3 className="store-items-title">Merch Lain</h3>
            <div className="mt-4 mb-2">
              <MerchStoreMerchSimple items={MerchStorePlaceholderItems} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .merch-store-container {
            width: 100%;
          }
          .merch-store-container-top {
            background: white;
            border: 1px solid #000000;
            border-radius: 50px;
          }

          .merch-store-container-bottom {
            width: 100%;
          }

          .merch-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 1rem 0;
          }

          .merch-title h2 {
            font-size: 1.65rem;
            margin: 2px 2rem 0 2rem;
          }

          .merch-title img {
            max-width: min(75px, 50vw);
          }

          .merch-title button {
            margin: 0;
            outline: none;
            border: none;
            background: none;
          }

          .merch-title {
            display: flex;
          }

          .merch-store-top-left {
            display: flex;
            align-items: center;
            margin: 0 0 0 1rem;
          }
          .merch-store-top-right {
            margin-right: 1.5rem;
          }

          .merch-store-bottom {
            width: 95%;
            background: #ffffff;
            box-shadow: 2px 2px 11px rgba(0, 0, 0, 0.25);
            border-radius: 0 0 20px 20px;
          }

          .store-items-title {
            font-size: 1.9rem;
            padding-left: 1.5rem;
            margin-top: 2.5rem;
          }

          @media (max-width: ${Dimen.mdBreakpoint}) {
            .merch-title h2 {
              text-align: center;
            }
          }

          @media (max-width: ${Dimen.smBreakpoint}) {
            
            .merch-title h2 {
              text-align: center;
              font-size: 1.25rem;
            }

            .merch-title {
              display: inline;
            }

            .merch-store-top-left {
              display: flex;
              justify-content: center
              margin: 0;
            }

            .merch-store-top-right {
              display: flex;
              justify-content: center;
              margin: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MerchStoreSimple;