class DatePicker {
  // Public
  // 월 정보 (string array)
  monthDate = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Private
  #calendarDate = {
    data: '', // 달력이 보이는데 사용될 data 정보
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  // 탐색한 element들을 상단 filed에 추가
  datePickerEl;
  dateInputEl;
  calendarEl;
  calendarMonthEl;
  montnContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalendarDate();
    this.assignElement();
    this.addEvent();
  }

  // 날짜 정보 초기화
  initCalendarDate() {
    const data = new Date(); // 현재 정보로 날짜 신규 생성
    const date = data.getDate(); // 며칠인지 정보
    const month = data.getMonth(); // 몇월인지 정보 (1~12월인데, index로 리턴하므로 0~11인 것 유의)
    const year = data.getFullYear(); // 몇년도인지 정보
    // calendarDate 객체에 담아주기
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  // 요소 찾기
  assignElement() {
    this.datePickerEl = document.getElementById('date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('#date-input');
    this.calendarEl = this.datePickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.calendarEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    // date-input을 눌렀을 때 캘린더가 보이는 이벤트
    this.dateInputEl.addEventListener('click', this.toggleCalendar.bind(this));
  }

  // 캘린더를 toggle할 때
  toggleCalendar() {
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }

  updateMonth() {
    // console.log(this.#calendarDate.year);
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  updateDates() {}
}

// 인스턴스
new DatePicker();
