document.addEventListener("DOMContentLoaded", function(){

    dataUrl = "https://api.jsonbin.io/b/5ad39830003aec63328d456f/1"
    // dataUrl = "./working-files/schedule.json";

    fetch(dataUrl, {
        headers: {
            'secret-key': '$2a$10$rat/5tTRtPM.bmsfMTEha.anz6i2uMLObCBxDam6b.Aqet8kxgBgy'
        },
        method: 'GET'
    })
        .then( data => {
            console.log(data);
            let promise = data.json()
            promise.then(promise =>
                generateSchedule(promise)
            )
        }).catch( error => console.log("Error fetching data."));
    
    function generateSchedule(data){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const dayNamesFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        let rootNode = document.getElementsByClassName("schedule")[0];
        let currentMonthNum = -1;
        let currentMonthTxt = null;
        let currentMonthNode = null;
        let scheduleGridNode = null;
        for(let day of data) {
            // console.log(day);
            let date = new Date(day.date);
            // if it's a new month
            let monthNum = date.getMonth();
            if(monthNum != currentMonthNum) {
                currentMonthNum = monthNum;
                currentMonthTxt = monthNames[monthNum];
                currentMonthNode = document.createElement('div');
                currentMonthNode.className = currentMonthTxt;
                currentMonthNode.classList.add("month");
    
                // month title
                let monthTitleNode = document.createElement('h2');
                monthTitleNode.appendChild(document.createTextNode(currentMonthTxt));
    
                // day of the week labels
                let daysOfWeekNode = document.createElement('ul');
                daysOfWeekNode.className = "doW-label-container";
                for (let dayName of dayNames) {
                    let labelNode = document.createElement('li');
                    labelNode.className = "doW-label";
                    labelNode.appendChild(document.createTextNode(dayName));
                    daysOfWeekNode.appendChild(labelNode);
                }
    
                // new grid div
                scheduleGridNode = document.createElement('div');
                scheduleGridNode.className = "grid";
    
                currentMonthNode.appendChild(monthTitleNode);
                currentMonthNode.appendChild(daysOfWeekNode);
                currentMonthNode.appendChild(scheduleGridNode);
    
                // grid placeholder divs
                for (let i = 1; i < date.getDay(); i++) {
                    let placeholderNode = document.createElement('div');
                    placeholderNode.className = "grid-placeholder";
                    scheduleGridNode.appendChild(placeholderNode);
                }
                rootNode.appendChild(currentMonthNode);
            }
    
            let dayNode = document.createElement('div');
            let dateStr = currentMonthTxt + ' ' + date.getDate() + ', ' + date.getFullYear();
            let dowStr = dayNamesFull[date.getDay()-1];
            let dowSpan = document.createElement('p');
            dowSpan.appendChild(document.createTextNode(dowStr));
            dowSpan.className = "dow";
            let dateSpan = document.createElement('h4');
            dateSpan.appendChild(document.createTextNode(dateStr));
            dateSpan.className = "date";
            let courseSpan = document.createElement('p');
            courseSpan.appendChild(document.createTextNode(day.course));
            courseSpan.className = "course";
            let notesSpan = document.createElement('p');
            notesSpan.appendChild(document.createTextNode(day.notes));
            notesSpan.className = "notes";
            let instructorSpan = document.createElement('p');
            instructorSpan.appendChild(document.createTextNode(day.instructor));
            instructorSpan.className = "instructor";
    
            dayNode.appendChild(dowSpan);
            dayNode.appendChild(dateSpan);
            dayNode.appendChild(courseSpan);
            dayNode.appendChild(notesSpan);
            dayNode.appendChild(instructorSpan);
            dayNode.className = "day";
            
            scheduleGridNode.appendChild(dayNode);

            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date.getTime() == today.getTime()) {
                dayNode.classList.add('today');
            }
        }
    };

    // toggle view button
    let toggleBtn = document.querySelector('.view-toggle');
    let schedule = document.querySelector('.schedule');
    let isList = false;
    toggleBtn.onclick = function() {
        schedule.classList.toggle('list-view');
        isList = !isList;
        if (isList) {
            toggleBtn.textContent = "# Grid View";
        } else {
            toggleBtn.textContent = String.fromCharCode(9776) + " List View";
        }
    }

    // jump to today
    let todayBtn = document.querySelector('.today-btn');
    todayBtn.onclick = function() {
        let todayDiv = document.querySelector('.today');
        todayDiv.scrollIntoView({behavior: 'smooth'});
    }
});