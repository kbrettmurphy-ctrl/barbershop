// ===========================
// File: js/calendar.js
// Vintage Barbershop Booking
// ===========================

// ----- DOM Elements -----
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const selectedDateText = document.getElementById("selectedDateText");
const timeSlots = document.getElementById("timeSlots");
const bookingForm = document.getElementById("bookingForm");
const customerName = document.getElementById("customerName");
const customerService = document.getElementById("customerService");
const selectedTimeInput = document.getElementById("selectedTimeInput");
const bookingMessage = document.getElementById("bookingMessage");

// ----- Calendar State -----
const today = new Date();

// Set time to midnight so we can compare dates.
today.setHours(0, 0, 0, 0);

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectedDate = null;
let selectedTime = "";

// ----- Calendar Data -----
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdayTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
];

const saturdayTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
];

// Store appointments while the page is open.
const bookings = [];

// ----- Helpers / Functions -----

// Create a consistent date string for comparing bookings.
const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// Show a success or error message.
const showBookingMessage = (message, type) => {
    bookingMessage.textContent = message;
    bookingMessage.classList.remove("success", "error");
    bookingMessage.classList.add(type);
};

// Clear the booking message.
const clearBookingMessage = () => {
    bookingMessage.textContent = "";
    bookingMessage.classList.remove("success", "error");
};

// Check whether a date and time are already booked.
const isTimeBooked = (date, time) => {
    const dateKey = getDateKey(date);

    return bookings.some((booking) => {
        return booking.date === dateKey && booking.time === time;
    });
};

// Build the calendar for the displayed month.
const renderCalendar = () => {
    calendarGrid.innerHTML = "";

    calendarMonthLabel.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;

    // Weekday of the first date: Sunday = 0, Saturday = 6.
    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    // Day zero of next month gives the last date of this month.
    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    // Add empty spaces before the first date.
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("calendar-empty");
        calendarGrid.appendChild(empty);
    }

    // Create a button for each date.
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);

        const dayButton = document.createElement("button");
        dayButton.type = "button";
        dayButton.classList.add("calendar-day");
        dayButton.textContent = day;

        // Highlight today's date.
        if (date.getTime() === today.getTime()) {
            dayButton.classList.add("today");
        }

        // Highlight the selected date.
        if (
            selectedDate !== null &&
            date.getTime() === selectedDate.getTime()
        ) {
            dayButton.classList.add("selected");
        }

        // Disable past dates and Sundays.
        if (date < today || date.getDay() === 0) {
            dayButton.classList.add("disabled");
            dayButton.disabled = true;
        }

        dayButton.addEventListener("click", () => {
            selectDate(date);
        });

        calendarGrid.appendChild(dayButton);
    }
};

// Update the selected date and show its time slots.
const selectDate = (date) => {
    selectedDate = date;

    // Reset the time whenever a new date is chosen.
    selectedTime = "";
    selectedTimeInput.value = "";

    selectedDateText.textContent = selectedDate.toDateString();

    clearBookingMessage();
    renderCalendar();
    renderTimeSlots();
};

// Build the time buttons for the selected date.
const renderTimeSlots = () => {
    timeSlots.innerHTML = "";

    if (selectedDate === null) {
        timeSlots.textContent = "Choose a date to see available times.";
        return;
    }

    let availableTimes = weekdayTimes;

    if (selectedDate.getDay() === 6) {
        availableTimes = saturdayTimes;
    }

    availableTimes.forEach((time) => {
        const timeButton = document.createElement("button");
        timeButton.type = "button";
        timeButton.classList.add("time-slot-btn");
        timeButton.textContent = time;

        if (time === selectedTime) {
            timeButton.classList.add("selected");
        }

        if (isTimeBooked(selectedDate, time)) {
            timeButton.classList.add("disabled");
            timeButton.disabled = true;
        }

        timeButton.addEventListener("click", () => {
            selectedTime = time;
            selectedTimeInput.value = time;

            clearBookingMessage();
            renderTimeSlots();
        });

        timeSlots.appendChild(timeButton);
    });
};

// ----- Event Listeners -----

// Show the previous month.
prevMonthBtn.addEventListener("click", () => {
    currentMonth--;

    // Moving backward from January goes to December.
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
});

// Show the next month.
nextMonthBtn.addEventListener("click", () => {
    currentMonth++;

    // Moving forward from December goes to January.
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
});

// Validate and confirm a booking.
bookingForm.addEventListener("submit", (event) => {
    // Prevent the form from refreshing the page.
    event.preventDefault();

    const name = customerName.value.trim();
    const service = customerService.value;

    if (selectedDate === null) {
        showBookingMessage("Please choose a date.", "error");
        return;
    }

    if (selectedTime === "") {
        showBookingMessage("Please choose a time.", "error");
        return;
    }

    if (name === "") {
        showBookingMessage("Please enter your name.", "error");
        return;
    }

    if (service === "") {
        showBookingMessage("Please choose a service.", "error");
        return;
    }

    if (isTimeBooked(selectedDate, selectedTime)) {
        showBookingMessage(
            "That time is already booked. Please choose another.",
            "error"
        );
        return;
    }

    // Save the appointment as an object in our array.
    const booking = {
        name: name,
        service: service,
        date: getDateKey(selectedDate),
        time: selectedTime,
    };

    bookings.push(booking);

    showBookingMessage(
        `Thanks, ${name}! Your ${service} is booked for ` +
        `${selectedDate.toDateString()} at ${selectedTime}.`,
        "success"
    );

    // Clear the form and selected time after booking.
    bookingForm.reset();
    selectedTime = "";
    selectedTimeInput.value = "";

    // Refresh the buttons so the booked time becomes disabled.
    renderTimeSlots();
});

// ----- Initialize -----
renderCalendar();
renderTimeSlots();