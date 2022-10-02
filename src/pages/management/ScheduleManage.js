import "./ScheduleManage.scss";
import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { checkExpiredAccesstoken } from "../../hooks/useAuth";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      /* 1. 로딩중이라는 상태이다. 생성자에 상태 변수를 추가한다. */
      loading: true,
      weekendsVisible: true,
      currentEvents: [],
      currendId: "",
    };
  }

  componentDidMount() {
    /* 
    GET 리퀘스트가 성공적으로 리턴하는 경우 loading을 false로 고친다. 
    더 이상 로딩중이 아니라는 뜻이다. */
    let year = new Date().getFullYear() - 1;
    let url = "/no-permit/schedules?start=" + year + "-01-05&end=3000-01-05";
    api.get(url).then((response) => {
      if (response.data.response.length === 0) {
        this.setState({ ites: [], loading: false, currendId: 0 });
      } else {
        this.setState({
          items: response.data.response,
          loading: false,
          currentId:
            response.data.response[response.data.response.length - 1].id,
        });
      }
    });
  }

  render() {
    const ref = React.createRef();
    return (
      <div style={{ visibility: this.props.visible }} className="Calendar">
        <Row>
          <Col lg={9}>
            {this.state.loading ? null : (
              <div className="Calendar-main">
                <FullCalendar
                  ref={ref}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  customButtons={{
                    prev: {
                      text: "Prev",
                      click: function () {
                        // Month 날짜 변경
                        let calendar = ref.current.getApi();

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
                    left: "today",
                    center: "prev title next",
                    right: "dayGridMonth",
                  }}
                  locale="ko"
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  initialEvents={this.state.items} // alternatively, use the `events` setting to fetch from a feed
                  select={this.handleDateSelect}
                  eventContent={renderEventContent} // custom render function
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
          </Col>
          <Col lg={3}>{this.renderSidebar()}</Col>
        </Row>
      </div>
    );
  }
  renderSidebar() {
    return (
      <div className="calendar-sidebar">
        <div className="calendar-sidebar-section">
          <h2>This Month Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleDateSelect = (selectInfo) => {
    // let year = formatDate(selectInfo.endStr, {year:"numeric"})
    // let month = formatDate(selectInfo.endStr, {month:"numeric"});
    // let day = formatDate(selectInfo.endStr, {day:"numeric"});

    // if(formatDate(selectInfo.endStr, {day:"numeric"})==="1"){
    //   if(formatDate(selectInfo.endStr, {month:"numeric"})==="1"){
    //     year -=1;
    //     month = "12";
    //     day = "31";
    //   }
    //   else{
    //     month-=1;
    //     day = new Date(formatDate(selectInfo.endStr, {year:"numeric"}), month, 0).getDate();
    //     console.log(day)
    //   }
    // }
    // else{
    //   day -=1;
    // }
    // month = month.length === 2 ? month: new Array(2).join('0')+month;
    // day = day >= 10 ? day: new Array(2).join('0')+day;
    // let endStr =year+"-"+month+"-"+day;
    checkExpiredAccesstoken().then((response) => {
      if (response) {
        Swal.fire({
          icon: "info",
          title: "일정 정보를 입력해 주세요.",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "저장",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.value && result.isConfirmed) {
            // console.log(title, selectInfo.startStr, selectInfo.endStr, selectInfo.startStr);
            api
              .post("/api/schedules", {
                title: result.value,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                content: "",
              })
              .then((response) => {
                if (
                  response.data !== undefined &&
                  response.data !== "undefined"
                ) {
                  if (response.data.success === true) {
                    this.setState({ currentId: this.state.currentId + 1 });
                    calendarApi.addEvent({
                      id: this.state.currentId,
                      title: result.value,
                      start: selectInfo.startStr,
                      end: selectInfo.endStr,
                      // ,allDay: selectInfo.allDay
                    });
                    Swal.fire({
                      icon: "success",
                      title: result.value + "일정을 저장했습니다.",
                    });
                  }
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "관리자 권한으로 로그인해 주세요.",
                  }).then((result) => {
                    if (result.isConfirmed) window.location.href = "/";
                  });
                }
              });
          }
        });
      }
    });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  };

  handleEventClick = (clickInfo) => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      title: `'${clickInfo.event.title}'일정을 삭제하시겠습니까?`,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete("/api/schedules/" + clickInfo.event._def.publicId)
          .then((response) => {
            if (response.data !== undefined && response.data !== "undefined") {
              if (response.data.success === true) {
                clickInfo.event.remove();
                Swal.fire({
                  icon: "success",
                  title: `'${clickInfo.event.title}'일정을 삭제했습니다.`,
                });
              }
            } else {
              Swal.fire({
                icon: "error",
                title: `'${clickInfo.event.title}'삭제에 실패했습니다. 다시 시도해주세요.`,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/";
                }
              });
            }
          });
      }
    });
  };

  // Events 초기 set
  handleEvents = (events) => {
    if (events.length !== 0 && events !== null) {
      let month = "";
      if (events[0]._context.viewTitle.substr(-3, 1) === " ") {
        month = events[0]._context.viewTitle.substr(-2, 1);
      } else {
        month = events[0]._context.viewTitle.substr(-3, 2);
      }
      let year = events[0]._context.viewTitle.substr(0, 4);
      let endYear = year;
      let endMonth = month;

      let url = "";
      if (Number(month) + 1 === 13) {
        endYear = Number(year) + 1;
        endMonth = 1;
      } else {
        endMonth = Number(month) + 1;
      }

      url =
        "/no-permit/schedules?start=" +
        year +
        "-" +
        month +
        "-01&end=" +
        endYear +
        "-" +
        endMonth +
        "-12";
      api.get(url).then((response) => {
        this.setState({
          currentEvents: response.data.response,
        });
      });
    }
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    // 학사 일정 하단 부분 || 해당 월이 포함되어 있으면 보여주기

    <li key={event.id}>
      <b>
        {formatDate(event.start, { year: "numeric" })}년{" "}
        {formatDate(event.start, { month: "numeric" })}월{" "}
        {formatDate(event.start, { day: "numeric" })}일 ~{" "}
      </b>{" "}
      <br />
      {formatDate(event.end, { day: "numeric" }) === "1" ? (
        formatDate(event.end, { month: "numeric" }) === "1" ? (
          <b>
            {formatDate(event.end, { year: "numeric" }) - 1}년 12월 31일 &nbsp;
          </b>
        ) : (
          <b>
            {formatDate(event.end, { year: "numeric" })}년{" "}
            {formatDate(event.end, { month: "numeric" }) - 1}월{" "}
            {new Date(
              formatDate(event.end, { year: "numeric" }),
              formatDate(event.end, { month: "numeric" }) - 1,
              0
            ).getDate()}
            일 &nbsp;
          </b>
        )
      ) : (
        <b>
          {formatDate(event.end, { year: "numeric" })}년{" "}
          {formatDate(event.end, { month: "numeric" })}월{" "}
          {formatDate(event.end, { day: "numeric" }) - 1}일 &nbsp;
        </b>
      )}
      <i>{event.title}</i>
    </li>
  );
}
