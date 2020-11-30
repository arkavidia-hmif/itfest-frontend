import * as React from "react";
import AboutUsContent from "../../../../utils/context/constants/company-profile/about-us-data";

interface Props {
  type: string;
}
const AboutUs: React.FC<Props> = ({type}) => {
  return (
    <>
      {type === "main" ?
        <div className="flex-container">
          <p className="title">Tentang Kami</p>
          <p>{AboutUsContent[0].content}</p>
        </div>
        :
        <div className="flex-container-alt">
          <h2>Tentang Kami</h2>
          <p className="description-text">{AboutUsContent[0].content}</p>
        </div>
      }
      <style jsx>{`
        .flex-container {
            display: flex;
            flex-direction: column;
            margin-top: 1rem;
        }

        .title {
            font-size: 1.8rem;
        }

        .flex-container-alt {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 10%;
            margin-right: 10%;
        }

        .description-text {
            text-align: center;
        }
      `}</style>
    </>
  );
};

export default AboutUs;