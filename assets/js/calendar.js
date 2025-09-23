document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('timeline');
    const calendarIcon = document.querySelector('.calendar-icon');
    const calendar = document.getElementById('calendar');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const currentMonthElement = document.querySelector('.current-month');
    const calendarDaysElement = document.querySelector('.calendar-days');

    let currentDate = new Date();
    let selectedDate = null;

    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    function updateCalendar() {
        currentMonthElement.textContent = formatDate(currentDate);

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        let calendarHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += '<div class="calendar-day disabled"></div>';
        }

        // Add the days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            
            calendarHTML += `
                <div class="calendar-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}" 
                     data-date="${date.toISOString()}">
                    ${day}
                </div>
            `;
        }

        calendarDaysElement.innerHTML = calendarHTML;

        // Add click event listeners to the days
        document.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
            day.addEventListener('click', () => {
                const date = new Date(day.dataset.date);
                selectedDate = date;
                input.value = date.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                calendar.classList.remove('show-calendar');
                updateCalendar();
            });
        });
    }

    // Event listeners
    calendarIcon.addEventListener('click', () => {
        calendar.classList.toggle('show-calendar');
    });

    prevMonthBtn.addEventListener('click', () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Close calendar when clicking outside
    document.addEventListener('click', (e) => {
        if (!calendar.contains(e.target) && !calendarIcon.contains(e.target)) {
            calendar.classList.remove('show-calendar');
        }
    });

    // Initialize calendar
    updateCalendar();
});