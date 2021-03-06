import useSWR from "swr";
import { useContext } from "react";
import MerchStoreCarousel from "./MerchStoreCarousel";
import { Dimen } from "styles/dimen";
import { getMerchFromTenant, getMerchFromTenantKey } from "api/merch";
import { Tenant } from "interfaces/tenant";
import { ApiContext } from "utils/context/api";
import Spinner from "components/commons/Spinner";
import Alert from "components/commons/Alert";

interface Props {
  merchant: Tenant;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSnackBar: (input: boolean) => void;
}

const MerchStoreExpanded: React.FC<Props> = ({
  merchant,
  handleClose,
  handleSnackBar,
}) => {
  const apiContext = useContext(ApiContext);

  const { data: itemData, error: itemError } = useSWR(
    getMerchFromTenantKey(merchant),
    () => getMerchFromTenant(apiContext.axios, merchant.id)
  );

  return (
    <div className="w-100 merch-store-container">
      <div className="row">
        <div className="merch-store-cross-button">
          <button onClick={handleClose}>
            <img src="/img/merchstore/cross_button.png" />
          </button>
        </div>
        <div className="col-12 merch-title justify-content-center justify-content-lg-start row">
          <img
            className="col-md-6 ml-0 ml-md-4 my-0 my-md-3"
            src={merchant.logo}
            alt={merchant.name}
          />
          <h2 className="mb-0 col-md-6 mt-3 mt-md-0">
            {merchant.name}&#39;s Shop
          </h2>
        </div>
      </div>

      <hr />

      <div className="px-3">
        <div>
          <h3 className="store-items-title">Merch</h3>
          <Alert error={itemError && "Gagal mengambil item"} />
          <div className="my-4">
            {itemData ? (
              <MerchStoreCarousel
                items={itemData.data}
                handleSnackBar={handleSnackBar}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .merch-store-container {
            position: relative;
            background: white;
            border: 1px solid #b7b7b7;
          }

          .merch-store-cross-button {
            position: absolute;
            right: 1rem;
            top: 1rem;
            z-index: 1;
          }

          .merch-store-cross-button button {
            background: none;
            border: none;
          }

          .merch-store-cross-button img {
            width: 1rem;
          }

          .merch-title {
            display: flex;
            flex-direction: row;
            align-items: center;

            margin: 1rem 0;
          }

          .merch-title h2 {
            font-size: 2rem;
          }

          .merch-title img {
            max-width: min(150px, 50vw);
          }

          .merch-store-search {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .merch-store-search-bar {
            padding: 1rem;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
            border-radius: 0.25rem;
            border: 0px;

            min-width: 250px;
            max-width: 400px;
          }

          .merch-store-search-bar:focus {
            outline-color: lightgray;
          }

          .store-items-title {
            font-size: 1.3rem;
            padding-left: 1.5rem;
            margin-top: 1.2rem;
          }

          @media (max-width: ${Dimen.mdBreakpoint}) {
            .merch-title h2 {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MerchStoreExpanded;
