import "./Schedule.scss";
import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../utils/api";

class Schedule extends React.Component {
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
    let year = new Date().getFullYear() - 1;
    let url = "/no-permit/schedules?start=" + year + "-01-05&end=3000-01-05";
    api
      .get(url)
      .then((response) =>
        this.setState({ items: response.data.response, loading: false })
      );
  }
  render() {
    const ref = React.createRef();

    return (
      <div className="Schedule">
        <h4>학사 일정</h4>
        {this.state.loading ? (
          <div className="Calendar-main"></div>
        ) : (
          <div className="Calendar-main">
            <FullCalendar
              ref={ref}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              moreLinkContent={(eventInfo) => {
                return eventInfo.shortText;
              }}
              eventContent={(eventInfo) => {
                if (
                  eventInfo.isStart !== true &&
                  formatDate(eventInfo.event.end, {
                    hour: "numeric",
                    minute: "numeric",
                  }) === "11:59 PM"
                ) {
                  return eventInfo.event._def.title + " 종료";
                } else if (eventInfo.isEnd && eventInfo.timeText !== "") {
                  let result = "";
                  let timeText = formatDate(eventInfo.event.end, {
                    hour: "numeric",
                  });

                  if (timeText.slice(-2) === "PM") {
                    result += "오후";
                  } else if (timeText.slice(-2) === "AM") {
                    result += "오전";
                  }
                  result += timeText.substring(0, 2);
                  result += "  ";
                  result += eventInfo.event._def.title;
                  result += "  종료";
                  return result;
                }
              }} // 1+ 내부 내용
              customButtons={{
                prev: {
                  text: "Prev",
                  click: function () {
                    // Month 날짜 변경
                    let calendar = ref.current.getApi();
                    console.log("test");
                    calendar.prev();
                  },
                },
                next: {
                  text: "Next",
                  click: function () {
                    // Month 날짜 변경
                    let calendar = ref.current.getApi();
                    calendar.next();
                  },
                },
              }}
              headerToolbar={{
                left: "",
                center: "prev title next",
                right: "",
              }}
              locale="ko"
              initialView="dayGridMonth"
              editable={true}
              selectable={false}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={this.state.items} // alternatively, use the `events` setting to fetch from a feed
              // select={this.handleDateSelect}
              // eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
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
        )}
      </div>
    );
  }
  // renderSidebar() {
  //   return (
  //     <div className='calendar-sidebar'>

  //       <div className='calendar-sidebar-section'>
  //         <h2>All Events ({this.state.currentEvents.length})</h2>
  //         <ul>
  //           {this.state.currentEvents.map(renderSidebarEvent)}
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }

  handleEventClick = (clickInfo) => {
    window.location.href = "#SchedulDetaile";
  };

  // Events 초기 set
  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
    // console.log(events);
  };
}

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

// function renderSidebarEvent(event) {
//   // console.log("test", event.end);
//   return (
//     // 학사 일정 하단 부분 || 해당 월이 포함되어 있으면 보여주기
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric'})}년 {formatDate(event.start, {month: 'numeric'})}월 {formatDate(event.start, {day: 'numeric'}) }일</b>
//       <i>{event.title}</i>
//     </li>
//   )

// }
