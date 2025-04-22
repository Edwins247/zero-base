import { initDatePicker } from "./datepicker/datepicker.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const datePicker = initDatePicker({
      selector: ".date-picker",
      onChange: (date, formattedDate) => {
        console.log(formattedDate);
      },
    });
  } catch (error) {
    console.error(error);
  }
});
