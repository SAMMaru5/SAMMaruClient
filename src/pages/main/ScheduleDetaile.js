import "./ScheduleDetaile.scss";
import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './Schedule-utils'
export default class ScheduleDetaile extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    
    const ref = React.createRef()


    return (
    <div className="ScheduleDetaile" id="SchedulDetaile" name="SchedulDetaile">
      <div className="ScheduleFrame">
      <div className="ScheduleLeft">
      <div className='Calendar-main'>
          <FullCalendar
            ref={ref}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            customButtons={{
              prev: {
                  text: 'Prev',
                  click: function() {
                    // Month 날짜 변경
                    let calendar = ref.current.getApi();
                    console.log("Left Btn Click Event")
                    calendar.prev();
                  },
              },
                next: {
                    text: 'Next',
                    click: function() {
                    // Month 날짜 변경
                    let calendar = ref.current.getApi();
                    console.log("Right Btn Click Event")
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
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

// Events 초기 set
handleEvents = (events) => {
  this.setState({
    currentEvents: events
  })
  // console.log(events);
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
  console.log("start : ", event.start, "ebd : ", event.start);
  return (
    // 학사 일정 하단 부분 || 해당 월이 포함되어 있으면 보여주기
    
    <li key={event.id}>
      <b>{formatDate(event.start, {month: 'numeric'})}월 {formatDate(event.start, {day: 'numeric'}) }일&nbsp;&nbsp;:&nbsp; </b>
      <i>{event.title}</i>
    </li>
  )

}
