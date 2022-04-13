export function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    // todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    // todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    todayDate.setTime(todayDate.getTime() + (expiredays * 1000)); 
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

export function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x === cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
  }

  export function delCookie(key){
    // let todayDate = new Date();
    document.cookie = key + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';

    // document.cookie = key + "=; path=/; expires=" +  todayDate.toGMTString()-1 + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}