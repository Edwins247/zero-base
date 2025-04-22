import { formatDate, parseDate } from "../utils.js";
import { initCalendar } from "../calendar/calendar.js";

export class DatePicker {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || ".date-picker",
      format: options.format || "yyyy-mm-dd",
      onChange: options.onChange || null,
    };

    this.input = document.querySelector(this.options.selector);
    if (!this.input) {
      throw new Error(
        `DatePicker: Element with selector "${this.options.selector}" not found.`
      );
    }

    this.calendar = initCalendar({
      onDateSelect: this.handleDateSelect.bind(this),
    });

    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener("click", this.handleInputClick.bind(this));

    document.addEventListener("click", this.handleOutsideClick.bind(this));
  }

  handleInputClick(event) {
    event.stopPropagation();

    const currentValue = this.input.value;
    let initialDate = null;

    if (currentValue) {
      initialDate = parseDate(currentValue);
    }

    this.calendar.show(initialDate, this.handleDateSelect.bind(this));
  }

  handleDateSelect(selectedDate) {
    this.input.value = formatDate(selectedDate);

    if (typeof this.options.onChange === "function") {
      this.options.onChange(selectedDate, this.input.value);
    }
  }

  handleOutsideClick(event) {
    const calendarWrapper = document.querySelector(".calendar-wrapper");

    if (
      !this.input.contains(event.target) &&
      !calendarWrapper.contains(event.target)
    ) {
      this.calendar.hide();
    }
  }

  setValue(value) {
    if (typeof value === "string") {
      this.input.value = value;
    } else if (value instanceof Date) {
      this.input.value = formatDate(value);
    }
  }

  getValue() {
    return this.input.value;
  }

  getDate() {
    return parseDate(this.input.value);
  }
}

export function initDatePicker(options = {}) {
  return new DatePicker(options);
}
