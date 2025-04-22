export class Calendar {
  constructor(options = {}) {
    this.options = {
      container: options.container || '.calendar',
      onDateSelect: options.onDateSelect || null
    };
    
    this.container = document.querySelector(this.options.container);
    this.calendarGridElement = this.container.querySelector('.calendar-grid');
    this.currentMonthElement = this.container.querySelector('.current-month');
    this.prevButton = this.container.querySelector('.prev-btn');
    this.nextButton = this.container.querySelector('.next-btn');
    
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedDate = null;
    this.onDateSelect = this.options.onDateSelect;
    
    this.bindEvents();
    
    this.renderCalendar(this.currentMonth, this.currentYear);
  }
  
  bindEvents() {
    this.prevButton.addEventListener('click', this.handlePrevMonth.bind(this));
    this.nextButton.addEventListener('click', this.handleNextMonth.bind(this));
    
    this.calendarGridElement.addEventListener('click', this.handleDateClick.bind(this));
  }
  
  handlePrevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }
  
  handleNextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }
  
  handleDateClick(event) {
    const dateElement = event.target.closest('.date');
    if (!dateElement) return;
    
    const day = parseInt(dateElement.textContent, 10);
    const isOtherMonth = dateElement.classList.contains('other-month');
    
    let clickedYear = this.currentYear;
    let clickedMonth = this.currentMonth;
    
    if (isOtherMonth) {
      if (day > 20) { 
        clickedMonth--;
        if (clickedMonth < 0) {
          clickedMonth = 11;
          clickedYear--;
        }
      } else { 
        clickedMonth++;
        if (clickedMonth > 11) {
          clickedMonth = 0;
          clickedYear++;
        }
      }
    }
    
    const selectedDate = new Date(clickedYear, clickedMonth, day);
    this.selectedDate = selectedDate;
    
    if (typeof this.onDateSelect === 'function') {
      this.onDateSelect(selectedDate);
    }
    
    this.hide();
  }
  
  renderCalendar(month, year) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.currentMonthElement.innerText = `${monthNames[month]}\n${year}`;
    
    this.calendarGridElement.innerHTML = '';
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
      const weekdayElement = document.createElement('div');
      weekdayElement.classList.add('weekday');
      weekdayElement.textContent = day;
      this.calendarGridElement.appendChild(weekdayElement);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
      const date = prevMonthLastDate - firstDay + i + 1;
      this.renderDateElement(date, 'other-month');
    }
    
    const today = new Date();
    for (let i = 1; i <= lastDate; i++) {
      const classes = [];
      
      const dayOfWeek = new Date(year, month, i).getDay();
      if (dayOfWeek === 0) {
        classes.push('sunday');
      }
      
      if (today.getDate() === i && today.getMonth() === month && today.getFullYear() === year) {
        classes.push('current');
      }
      
      if (this.selectedDate && 
          this.selectedDate.getDate() === i && 
          this.selectedDate.getMonth() === month && 
          this.selectedDate.getFullYear() === year) {
        classes.push('selected');
      }
      
      this.renderDateElement(i, classes.join(' '));
    }
    
    const daysAdded = firstDay + lastDate;
    const totalCells = 42; 
    const nextDays = totalCells - daysAdded;
    
    for (let i = 1; i <= nextDays; i++) {
      this.renderDateElement(i, 'other-month');
    }
  }
  
  renderDateElement(day, className = '') {
    const dateElement = document.createElement('div');
    dateElement.classList.add('date');
    if (className) {
      className.split(' ').forEach(cls => {
        if (cls) dateElement.classList.add(cls);
      });
    }
    dateElement.textContent = day;
    dateElement.setAttribute('data-day', day);
    
    this.calendarGridElement.appendChild(dateElement);
  }
  
  show(initialDate, onDateSelect) {
    document.querySelector('.calendar-wrapper').style.display = 'block';
    
    if (typeof onDateSelect === 'function') {
      this.onDateSelect = onDateSelect;
    }
    
    if (initialDate && initialDate instanceof Date) {
      this.selectedDate = initialDate;
      this.currentMonth = initialDate.getMonth();
      this.currentYear = initialDate.getFullYear();
      this.renderCalendar(this.currentMonth, this.currentYear);
    }
  }
  
  hide() {
    document.querySelector('.calendar-wrapper').style.display = 'none';
  }
}

let calendarInstance = null;

export function initCalendar(options = {}) {
  if (!calendarInstance) {
    calendarInstance = new Calendar(options);
  }
  return calendarInstance;
}
