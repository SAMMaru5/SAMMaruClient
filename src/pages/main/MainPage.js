import MainActivity from './MainActivity'
import MainBoard from './MainBoard'
import MainSchedule from './MainSchedule'
import MainScheduleDetaile from './MainScheduleDetaile'
import Footer from '../../components/Footer'
import Navigation from '../../components/Navigation'

function MainPage() {

    return(
        <div className='MainPage'>
            <Navigation />
            <MainBoard />
            <MainSchedule />
            <MainActivity />

            {/* 동아리 소개 */}
            {/* 개강총회, 소규모프젝 */}
            <MainScheduleDetaile />

            {/* 동아리 수상실적 */}
            <Footer />
        </div>
    )
}

export default MainPage;