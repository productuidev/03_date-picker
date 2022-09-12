class DatePicker {
  // Public
  // 월 정보 (string array)
  monthData = [
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

  // 업데이트 될 때 해당 월 동적 생성
  updateMonth() {
    // console.log(this.#calendarDate.year);
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  // 업데이트 될 때 해당 날짜 동적 생성
  updateDates() {
    this.calendarDatesEl.innerHTML = ''; // 업데이트 될 때 캘린더에 들어간 날짜를 비우기 (새로 생성해야 하므로)

    // 날짜가 며칠 있는지 확인
    const numberofDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1, // index 0~11이라서 +1
      0,
    ).getDate();

    // 총 날짜를 기반으로 element 생성

    // console에서 월별 날짜 확인
    // new Date(2022,1,0).getDate() // 31
    // new Date(2022,2,0).getDate() // 28
    // new Date(2022,3,0).getDate() // 31 ...

    // fragment 생성
    const fragment = new DocumentFragment();

    for (let i = 0; i < numberofDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1; // for문이 0부터 돌게되므로 +1
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl); // append
    }

    // 그 달에서 첫번째로 시작해야 하는 날짜의 컬럼 구하기
    // new Date(2022, 0, 1) // Sat Jan 01 2022 00:00:00 GMT+0900 (한국 표준시)
    // new Date(2022, 0, 1).getDay() // 6
    // new Date(2022, 0, 1).getDay()+1 // 7
    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1;
    this.calendarDatesEl.appendChild(fragment);
  }
}

// 인스턴스
new DatePicker();
