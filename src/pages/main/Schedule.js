import './Schedule.scss'
import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './Schedule-utils'


export default class Schedule extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
  }

  render() {
    
    const ref = React.createRef()
    
    return (
      <div className='Schedule'>
        <h4>학사 일정</h4>
          <div className='Calendar-main'>
          <FullCalendar
            ref={ref}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            moreLinkContent= {(eventInfo)=>{return eventInfo.shortText}}
            eventContent = {(eventInfo)=>{
              if(eventInfo.isStart !== true && formatDate(eventInfo.event.end, {hour: 'numeric', minute:'numeric'}) === "11:59 PM"){
                return eventInfo.event._def.title + " 종료"
              }
              else if(eventInfo.isEnd && eventInfo.timeText !==""){
                let result = "";
                let timeText = formatDate(eventInfo.event.end, {hour: 'numeric'})

                if(timeText.slice(-2) === "PM"){
                  result += "오후";
                }
                else if(timeText.slice(-2) === "AM"){
                  result += "오전"
                }
                result += timeText.substring(0, 2)
                result += "  "
                result += eventInfo.event._def.title
                result += "  종료"
                return result;
              }
    
            
            }}  // 1+ 내부 내용
            customButtons={{
              prev: {
                  text: 'Prev',
                  click: function() {
                    // Month 날짜 변경
                    let calendar = ref.current.getApi();
                    console.log("test")
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
            editable={true}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
      </div>
    )
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


  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      // console.log(title, selectInfo.startStr, selectInfo.endStr, selectInfo.startStr);
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
        // ,allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    window.location.href="#SchedulDetaile"
  }

  // Events 초기 set
  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
    // console.log(events);
  }


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
