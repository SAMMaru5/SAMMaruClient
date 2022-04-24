import "./ScheduleDetaile.scss";
import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { call } from "../../hooks/useFetch";
export default class ScheduleDetaile extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      /* 1. 로딩중이라는 상태이다. 생성자에 상태 변수를 추가한다. */
      loading: true,
      weekendsVisible: true,
      currentEvents: [],
    };
  }

  componentDidMount() {
    /* 
    GET 리퀘스트가 성공적으로 리턴하는 경우 loading을 false로 고친다. 
    더 이상 로딩중이 아니라는 뜻이다. */
    let year = new Date().getFullYear()-1;
    let url = "/no-permit/schedules?start="+year+"-01-05&end=3000-01-05";
    call(url, "GET", null).then((response) =>
      this.setState({ items: response.response, loading: false })
    );
  }

  render() {
    
    const ref = React.createRef()


    return (
    <div className="ScheduleDetaile" id="SchedulDetaile" name="SchedulDetaile">
      {this.state.loading ? 
      <div className="ScheduleFrame"> </div>
    :
    <div className="ScheduleFrame">
    <div className="ScheduleLeft">
    <div className='Calendar-main'>
        <FullCalendar
          ref={ref}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          moreLinkContent= {(eventInfo)=>{return eventInfo.shortText}}
          customButtons={{
            prev: {
                text: 'Prev',
                click: function() {
                  // Month 날짜 변경
                  let calendar = ref.current.getApi();
                  calendar.prev();
                },
            },
              next: {
                  text: 'Next',
                  click: function() {
                  // Month 날짜 변경
                  let calendar = ref.current.getApi();
                  calendar.next();
                  
                  },
              },
        }}

          headerToolbar={{
            left:'',
            center: 'prev title next',
            right:'',
          }}

        
          
          locale='ko'
          initialView='dayGridMonth'
          editable={false}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={this.state.items} // alternatively, use the `events` setting to fetch from a feed
          // select={this.handleDateSelect}
          eventContent={renderEventContent} // custom render function
          // eventClick={this.handleEventClick}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed

          // you can update a remote database when these fire:
          // eventAdd={function(event){
          //   console.log("eventTest", event.event.title,event.event.startStr, event.event.endStr )
          // }}
        //   eventChange={function(){
           
        // }}
          // eventRemove={function(){}}
          
        />
      </div>
    </div>
    <div className="ScheduleRight">
      <div className="ScheduleContent">
        <div className="ScheduleContentText">
           {this.renderSidebar()}
        </div>
      </div>
    </div>
    </div>
     }
      
    </div>
  )
}
renderSidebar() {
  return (
    <div className='calendar-sidebar'>
     
    
      <div className='calendar-sidebar-section'>
        {/* <h2>All Events ({this.state.currentEvents.length})</h2> */}
        <ul>
          {this.state.currentEvents.map(renderSidebarEvent)}
        </ul>
      </div>
    </div>
  )
}


// Events 초기 set
handleEvents = (events) => {
  if(events.length !== 0 && events !==null){
    let month = "";
    if(events[0]._context.viewTitle.substr(-3, 1) === " "){
      month = events[0]._context.viewTitle.substr(-2, 1);
    }
    else{
      month = events[0]._context.viewTitle.substr(-3, 2);
    }
    let year = events[0]._context.viewTitle.substr(0, 4);
    let endYear = year;
    let endMonth = month;

    let url = "";
    if(Number(month)+1 ===13){
      
      endYear = Number(year)+1
      endMonth = 1
    }
    else{
      endMonth = Number(month) + 1;        
    }

    url = "/no-permit/schedules?start="+year+"-"+month+"-01&end="+endYear+"-"+endMonth+"-12";
    call(url, "GET", null).then((response) =>{
      this.setState({
        currentEvents: response.response
      })
    }
    );
  }
}
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    // 학사 일정 하단 부분 || 해당 월이 포함되어 있으면 보여주기
    
    <li key={event.id}>
      <b>{formatDate(event.start, {month: 'numeric'})}월 {formatDate(event.start, {day: 'numeric'}) }일 {event.end !==null && "~ "  + formatDate(event.end, {month: 'numeric'})+ "월 " + formatDate(event.end, {day: 'numeric'}) + "일"} &nbsp;: &nbsp;</b> 
      <i>{event.title}</i>
    </li>
  )

}
