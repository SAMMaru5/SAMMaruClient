import Activity from "./Activity";
import Board from "./Board";
import Schedule from "./Schedule";
import ScheduleDetaile from "./ScheduleDetaile";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ClubIntroduction from "./ClubIntroduction";
import ClubActivities from "./ClubActivities";
import ClubAwards from "./ClubAwards";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="MainPage">
      <div className="container">
        <Navigation />
        <Board />
        <Activity />
        <Schedule />
        <ClubIntroduction />
        <ClubActivities />
        <ScheduleDetaile />
        <ClubAwards />
      </div>
    </div>
  );
}

export default MainPage;
