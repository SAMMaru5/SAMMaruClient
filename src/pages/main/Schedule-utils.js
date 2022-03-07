
let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// 초기 event 값 설정
//  id auto increasement

// post
// request year  || start와 end에서 해당 년도가 포함된 데이터를 요청
//response id, title, start, end, 

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'event 4',
    start: '2022-02-16T13:00:00',
    end: '2022-02-20T18:00:00',
  },
  {
    id: createEventId(),
    title: '축제',
    start: '2022-02-11',
    end: '2022-02-18T23:59:00',
  },
  {
    id: createEventId(),
    title: 'event 2',
    start: '2022-02-16',
    end: '2022-02-16',
  },
  { 
    id: createEventId(), 
    title: '점심', 
    start: '2022-02-17', 
    end: '2022-02-18' },
]

export function createEventId() {
  return String(eventGuid++)
}
