function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar__open');
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.workers__form form');
    const workersTableBody = document.getElementById('workersDetailsBody');
    const totalWorkers = document.getElementById('totalWorkers');
    const totalMaleWorkers = document.getElementById('totalMaleWorkers');
    const totalFemaleWorkers = document.getElementById('totalFemaleWorkers');

    let currentEditingRow = null; 

    const preStoredData = JSON.parse(localStorage.getItem('workersData')) || [];

    // Function to add a row to the table
    function addTableRow(worker) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.worker__name}</td>
            <td>${worker.worker__gender}</td>
            <td>${worker.joined__date}</td>
            <td>${worker.assigned__field}</td>
            <td>
                <button class="update__button">Update</button>
                <button class="delete__button">Delete</button>
            </td>
        `;
        workersTableBody.appendChild(row);


        row.querySelector('.delete__button').addEventListener('click', function() {
            workersTableBody.removeChild(row);
            if (currentEditingRow === row) {
                form.reset();
                currentEditingRow = null;
            }
            updateCardTotals(); 
            updateLocalStorage(); 
        });

        row.querySelector('.update__button').addEventListener('click', function() {
            form.querySelector('#worker__name').value = worker.worker__name;
            form.querySelector('#worker__gender').value = worker.worker__gender;
            form.querySelector('#joined__date').value = worker.joined__date;
            form.querySelector('#assigned__field').value = worker.assigned__field;
            currentEditingRow = row;
        });

        updateCardTotals(); 
    }

    // Function to calculate and update card totals
    function updateCardTotals() {
        let workersTotal = 0;
        let maleWorkersTotal = 0;
        let femaleWorkersTotal = 0;

        Array.from(workersTableBody.querySelectorAll('tr')).forEach(row => {
            const cells = row.children;
            const gender = cells[1].textContent.trim();

            workersTotal++;
            if (gender === 'Male') {
                maleWorkersTotal++;
            } else if (gender === 'Female') {
                femaleWorkersTotal++;
            }
        });

        totalWorkers.textContent = workersTotal;
        totalMaleWorkers.textContent = maleWorkersTotal;
        totalFemaleWorkers.textContent = femaleWorkersTotal;
    }

    preStoredData.forEach(worker => addTableRow(worker));

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const newWorker = {
            worker__name: form.querySelector('#worker__name').value,
            worker__gender: form.querySelector('#worker__gender').value,
            joined__date: form.querySelector('#joined__date').value,
            assigned__field: form.querySelector('#assigned__field').value
        };

        if (currentEditingRow) {
            const cells = currentEditingRow.children;
            cells[0].textContent = newWorker.worker__name;
            cells[1].textContent = newWorker.worker__gender;
            cells[2].textContent = newWorker.joined__date;
            cells[3].textContent = newWorker.assigned__field;

            currentEditingRow = null;
        } else {
            addTableRow(newWorker);
        }
        
        updateLocalStorage();
        
        form.reset();

        updateCardTotals();
    });

    // Function to update local storage with current table data
    function updateLocalStorage() {
        const workers = Array.from(workersTableBody.querySelectorAll('tr')).map(row => {
            const cells = row.children;
            return {
                worker__name: cells[0].textContent.trim(),
                worker__gender: cells[1].textContent.trim(),
                joined__date: cells[2].textContent.trim(),
                assigned__field: cells[3].textContent.trim()
            };
        });
        localStorage.setItem('workersData', JSON.stringify(workers));
    }

    updateCardTotals();
});
