document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.querySelector(".tasks__form form");
    const tasksDetailsBody = document.getElementById("tasksDetailsBody");
    const tasksCards = document.querySelector(".tasks__cards");

    let tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];

    const populateTable = () => {
        tasksDetailsBody.innerHTML = "";
        tasksData.forEach((task, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.name}</td>
                <td><button class="priority__button priority__button--${task.priority.toLowerCase()}">${task.priority}</button></td>
                <td>${task.assignedWorkers}</td>
                <td>${task.startDate} ${task.startTime}</td>
                <td>${task.endDate} ${task.endTime}</td>
                <td>${task.description}</td>
                <td>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </td>
            `;

            row.querySelector(".update").addEventListener("click", () => {
                populateForm(index);
            });

            row.addEventListener("click", () => {
                populateCard(index);
            });

            row.querySelector(".delete").addEventListener("click", () => {
                deleteTask(index);
            });

            tasksDetailsBody.appendChild(row);
        });
    };

    const populateCard = (index) => {
        tasksCards.innerHTML = "";
        const task = tasksData[index];

        const card = document.createElement("div");
        card.className = "task__card";

        card.innerHTML = `
            <button class="priority__button priority__button--${task.priority.toLowerCase()}">${task.priority}</button>
            <h3>Task Name: ${task.name}</h3>
            <p><strong>Assigned Worker:</strong> ${task.assignedWorkers}</p>
            <p><strong>Start:</strong> ${task.startDate} ${task.startTime}</p>
            <p><strong>End:</strong> ${task.endDate} ${task.endTime}</p>
            <textarea>${task.description}</textarea>
        `;

        tasksCards.appendChild(card);
    };

    const populateForm = (index) => {
        const task = tasksData[index];

        document.getElementById("task__name").value = task.name;
        document.getElementById("task__priority").value = task.priority;
        document.getElementById("task__assigned__workers").value = task.assignedWorkers;
        document.getElementById("task__start__date").value = task.startDate;
        document.getElementById("task__start__time").value = task.startTime;
        document.getElementById("task__end__date").value = task.endDate;
        document.getElementById("task__end__time").value = task.endTime;
        document.getElementById("task__description").value = task.description;

        taskForm.dataset.editIndex = index;
    };

    const deleteTask = (index) => {
        tasksData.splice(index, 1);
        localStorage.setItem("tasksData", JSON.stringify(tasksData));
        populateTable();
        tasksCards.innerHTML = ""; 
    };

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const task = {
            name: document.getElementById("task__name").value,
            priority: document.getElementById("task__priority").value,
            assignedWorkers: document.getElementById("task__assigned__workers").value,
            startDate: document.getElementById("task__start__date").value,
            startTime: document.getElementById("task__start__time").value,
            endDate: document.getElementById("task__end__date").value,
            endTime: document.getElementById("task__end__time").value,
            description: document.getElementById("task__description").value,
        };

        if (taskForm.dataset.editIndex) {
            const index = taskForm.dataset.editIndex;
            tasksData[index] = task;
            delete taskForm.dataset.editIndex;
        } else {
            tasksData.push(task);
        }

        localStorage.setItem("tasksData", JSON.stringify(tasksData));
        taskForm.reset();
        populateTable();
    });

    populateTable();
});
