import Activity from "./Activity";
import Board from "./Board";
import Schedule from "./Schedule";
import ScheduleDetaile from "./ScheduleDetaile";
import ClubIntroduction from "./ClubIntroduction";
import ClubActivities from "./ClubActivities";
import ClubAwards from "./ClubAwards";
import PhotoList from "../photo/PhotoList";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="MainPage">
      <div className="container">
        <Board />
        <Activity />
        <Schedule />
        <ClubIntroduction />
        <ClubActivities />
        <ScheduleDetaile />
        <ClubAwards />
        <PhotoList />
      </div>
    </div>
  );
}

export default MainPage;
