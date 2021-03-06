import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import { useState, useCallback } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Logo from "components/commons/company-profile/LogoTitle/logo-title";
import LogoAlt from "components/commons/company-profile/LogoTitle/logo-title-alt";
import AboutUsAlt from "components/commons/company-profile/AboutUs/about-us-alt";
import ButtonsAlt from "components/commons/company-profile/Buttons/buttonscombinedAlt";
import CombinedMain from "components/commons/company-profile/combinedmain";
import CombinedAlt from "components/commons/company-profile/combinedalt";
import GalleryMain from "components/commons/company-profile/Gallery/gallery";
import GalleryAlt from "components/commons/company-profile/Gallery/galleryAlt";
import ChallengeDone from "components/commons/company-profile/Challenge/challenge";
import Tenants from "utils/constants/tenants";
import Layout from "components/commons/Layout";
import { Tenant } from "interfaces/tenant";
import { getGameByTenant, GET_GAME_URL, playGame } from "api/game";
import Alert from "components/commons/Alert";
import { ApiContext } from "utils/context/api";
import { getLiveTenant, TENANT_LIVE_URL } from "api/tenant";

const Game = dynamic(() => import("components/game"), {
  ssr: false,
});
interface Props {
  tenant: Tenant;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const CompanyProfile: React.FC<Props> = ({ tenant }) => {
  const apiContext = React.useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<number>(0);
  const [prize, setPrize] = useState<number>(0);

  const { data: game, error: errorFetching } = useSWR(
    tenant.id !== undefined
      ? `${GET_GAME_URL}${GET_GAME_URL}tenant/${tenant.id}`
      : null,
    () => getGameByTenant(apiContext.axios, String(tenant.id))
  );

  const { data: liveData } = useSWR(TENANT_LIVE_URL,
    () => getLiveTenant(apiContext.axios)
  );

  let liveTenantUrl;
  if (liveData) {
    const selected = liveData.data.filter(el => el.id === tenant.id);
    if (selected.length === 1) {
      liveTenantUrl = selected[0].liveURL;
    }
  }


  const gameId = game?.data?.gameid;
  React.useEffect(() => {
    game?.data && setAttempted(game?.data?.attempt);
  }, [game]);

  const postChallenge = useCallback(async () => {
    if (gameId && attempted === 0) {
      setLoading(true);
      try {
        const res = await playGame(apiContext.axios, String(gameId));
        if (res) {
          setAttempted(1);
          setError(null);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
  }, [gameId, attempted]);

  return (
    <Layout title={tenant.name}>
      {tenant.pageType === 0 ? (
        <div className="container pb-4">
          <Logo logo={tenant.logo} title={tenant.name} />
          <div>
            <CombinedMain
              done={attempted === 2}
              aboutUs={tenant.aboutUs}
              videoUrl={tenant.videoUrl}
              hiring={tenant.hiring}
              socialMedia={tenant.socialMedia}
              contactLink={tenant.contactLink}
              liveUrl={liveTenantUrl}
              isApplyRegister={tenant.isApplyRegister}
            />
          </div>
          <GalleryMain items={tenant.gallery} />
          <ChallengeDone
            ongoing={attempted === 1}
            prize={prize}
            done={attempted === 2}
            loading={loading}
            startGame={postChallenge}
            additionalChallenge={tenant.additionalChallenge}
          />
          {attempted === 1 &&
            <div className="game-area">
              {errorFetching && <Alert error={errorFetching.message} />}
              {error && <Alert error={error} />}
              {gameId && attempted === 1 && (
                <Game
                  setAttempted={setAttempted}
                  gameId={gameId}
                  setPrize={setPrize}
                />
              )}
            </div>
          }
        </div>
      ) :
        (
          <div className="container pb-4">
            <LogoAlt logo={tenant.logo} title={tenant.name} />
            <CombinedAlt videoUrl={tenant.videoUrl} contactLink={tenant.contactLink} />
            <AboutUsAlt aboutUs={tenant.aboutUs} />
            <ButtonsAlt
              done={attempted === 2}
              hiring={tenant.hiring}
              socialMedia={tenant.socialMedia}
              liveUrl={liveTenantUrl}
              isApplyRegister={tenant.isApplyRegister}
            />
            <GalleryAlt items={tenant.gallery} galleryText={tenant.galleryText} />
            <ChallengeDone
              ongoing={attempted === 1}
              prize={prize}
              done={attempted === 2}
              loading={loading}
              startGame={postChallenge}
              additionalChallenge={tenant.additionalChallenge}
            />
            {attempted === 1 &&
              <div className="game-area">
                {errorFetching && <Alert error={errorFetching.message} />}
                {error && <Alert error={error} />}
                {gameId && attempted === 1 && (
                  <Game
                    setAttempted={setAttempted}
                    gameId={gameId}
                    setPrize={setPrize}
                  />
                )}
              </div>
            }
          </div>
        )}
      <style jsx>{`
          .game-area {
            padding: 2rem;
            border-radius: 2rem;
            background-color: #ffffff50;
          }
      `}</style>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(Tenants).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const data = Tenants[slug];

  return {
    props: {
      tenant: data,
    },
  };
};

export default CompanyProfile;
