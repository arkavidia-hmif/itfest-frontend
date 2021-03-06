import { useState } from "react";
import ProfileSidebar from "./sidebar/ProfileSidebar";
import PrimaryField from "./PrimaryField";
import PersonalField from "./PersonalField";
import ProfileHeader from "./ProfileHeader";

const ProfileWrapper: React.FC = () => {
  const [selection, setSelection] = useState(0);
  const getComponent = () => {
    if (selection === 0) {
      return <PrimaryField />;
    }
    if (selection === 1) {
      return <PersonalField />;
    }
  };

  return (
    <div className="container main-profile mb-5">
      <div className="row">
        <ProfileHeader />
        <div className="col-lg-4 col-xs-12 mt-4">
          <ProfileSidebar setSelection={setSelection} selection={selection} />
        </div>
        <div className="col-lg-8 col-xs-12 mt-4">{getComponent()}</div>
        <style jsx>{`
          .main-profile {
            height: 90vh;
            background: url(/img/bg-white.png);
            background-position: center 13em;
            background-repeat: no-repeat;
            background-size: 60%;
          }
          @media screen and (max-width: 991px) {
            .main-profile {
              background: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProfileWrapper;
