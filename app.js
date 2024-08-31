// Hamburger Menu Function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar__open');
}
toggleSidebar();



// update crops list
function updateCrops() {
    const cropsList = document.getElementById("crops-list");
    const cropsTitle = document.getElementById("crops-title");

    const crops = JSON.parse(localStorage.getItem('cropsData')) || [];
    cropsTitle.innerText = `Total Planted Crops: ${crops.length}`;
    cropsList.innerHTML = "";

    crops.forEach(crop => {
        let listItem = document.createElement("li");
        listItem.innerText = crop.cropName;
        cropsList.appendChild(listItem);
    });
}

updateCrops();



// Function to update fields list
function updateFields() {
    const fieldsList = document.getElementById("fields__list");
    const fieldsTitle = document.getElementById("fields__title");

    const fields = JSON.parse(localStorage.getItem('fieldsData')) || [];
    fieldsTitle.innerText = `Total Fields: ${fields.length}`;
    fieldsList.innerHTML = "";

    fields.forEach(field => {
        let listItem = document.createElement("li");
        listItem.innerText = field.field__name; 
        fieldsList.appendChild(listItem);
    });
}

updateFields(); 


// Function to update tasks list
function updateTasks() {
    const tasksList = document.getElementById("tasks_list");
    const tasksTitle = document.getElementById("tasks__title");

    const tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    tasksTitle.innerText = `Up Coming Tasks: ${tasks.length}`;
    tasksList.innerHTML = "";

    tasks.forEach(task => {
        let listItem = document.createElement("li");
        listItem.innerText = task.name; 
        tasksList.appendChild(listItem);
    });
}

updateTasks(); 


// Update workers information 
document.addEventListener("DOMContentLoaded", function() {
    const workersData = JSON.parse(localStorage.getItem('workersData')) || [];
    const totalMale = workersData.filter(worker => worker.worker__gender === 'Male').length;
    const totalFemale = workersData.filter(worker => worker.worker__gender === 'Female').length;
    const totalWorkers = totalMale + totalFemale;

    document.getElementById('totalWorkers').textContent = totalWorkers;

    const ctx = document.getElementById('workersChart').getContext('2d');

    // pie chart
    const workersChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                label: 'Worker Distribution',
                data: [totalMale, totalFemale],
                backgroundColor: ['#4CAF50', '#FFC107'], 
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = (value / totalWorkers * 100).toFixed(2);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
});


// Get weather updates
document.addEventListener("DOMContentLoaded", function() {
    function fetchWeather(lat, lon) {
        const apiKey = '50a672aa144a8b8027cf3be668ff328a2';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = document.getElementById('weather-info');
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                weatherInfo.innerHTML = `
                    <h3>Current Weather</h3>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-info').innerText = 'Failed to retrieve weather data.';
            });
    }

    function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(lat, lon);
                },
                error => {
                    console.error('Error getting location:', error);
                    document.getElementById('weather-info').innerText = 'Failed to get location.';
                }
            );
        } else {
            document.getElementById('weather-info').innerText = 'Geolocation is not supported by this browser.';
        }
    }


    getWeather();
});


// Function to update tasks list 
function updateTasksFromLocalStorage() {
    const tasksList = document.getElementById('tasks_list');
    const tasksTitle = document.getElementById('tasks__title');

    const tasksData = JSON.parse(localStorage.getItem('tasksData')) || [];

    tasksTitle.innerText = `Up Coming Tasks: ${tasksData.length}`;
    tasksList.innerHTML = "";

    tasksData.forEach(task => {
        let listItem = document.createElement("li");
        listItem.innerText = task.name;
        tasksList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", updateTasksFromLocalStorage);

window.addEventListener('storage', (event) => {
    if (event.key === 'cropsData') {
        updateCrops();
    } else if (event.key === 'fieldsData') {
        updateFields();
    }
});
