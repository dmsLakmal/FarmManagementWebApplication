function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar__open');
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.fields__form form');
    const fieldsTableBody = document.getElementById('fieldsDetailsBody');
    const totalFieldsCard = document.getElementById('totalFields');
    const harvestedFieldsCard = document.getElementById('totalHarvestedFields');
    const notHarvestedFieldsCard = document.getElementById('totalNotHarvestedFields');

    let currentEditingRow = null;

    const preStoredData = JSON.parse(localStorage.getItem('fieldsData')) || [];

    function addTableRow(field) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${field.field__name}</td>
            <td>${field.field__size}</td>
            <td>${field.soil__type}</td>
            <td>${field.field__status}</td>
            <td>${field.field__notes}</td>
            <td>
                <button class="update__button">Update</button>
                <button class="delete__button">Delete</button>
            </td>
        `;
        fieldsTableBody.appendChild(row);

        row.querySelector('.delete__button').addEventListener('click', function() {
            fieldsTableBody.removeChild(row);
            if (currentEditingRow === row) {
                form.reset();
                currentEditingRow = null;
            }
            updateCardTotals(); 
            updateLocalStorage(); 
        });

        // Add update
        row.querySelector('.update__button').addEventListener('click', function() {
            form.querySelector('#field__name').value = field.field__name;
            form.querySelector('#field__size').value = field.field__size;
            form.querySelector('#soil__type').value = field.soil__type;
            form.querySelector('#field__status').value = field.field__status;
            form.querySelector('#field__notes').value = field.field__notes;
            currentEditingRow = row;
        });

        updateCardTotals(); 
    }

    function updateCardTotals() {
        let fieldsTotal = 0;
        let harvestedFieldsTotal = 0;
        let notHarvestedFieldsTotal = 0;

        Array.from(fieldsTableBody.querySelectorAll('tr')).forEach(row => {
            const cells = row.children;
            const status = cells[3].textContent.trim();

            fieldsTotal++;
            if (status === 'Harvested') {
                harvestedFieldsTotal++;
            } else if (status === 'Not Harvested') {
                notHarvestedFieldsTotal++;
            }
        });

        if (totalFieldsCard) totalFieldsCard.textContent = fieldsTotal;
        if (harvestedFieldsCard) harvestedFieldsCard.textContent = harvestedFieldsTotal;
        if (notHarvestedFieldsCard) notHarvestedFieldsCard.textContent = notHarvestedFieldsTotal;
    }

    preStoredData.forEach(field => addTableRow(field));

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const newField = {
            field__name: form.querySelector('#field__name').value,
            field__size: form.querySelector('#field__size').value,
            soil__type: form.querySelector('#soil__type').value,
            field__status: form.querySelector('#field__status').value,
            field__notes: form.querySelector('#field__notes').value
        };

        if (currentEditingRow) {
            // Update the current editing row
            const cells = currentEditingRow.children;
            cells[0].textContent = newField.field__name;
            cells[1].textContent = newField.field__size;
            cells[2].textContent = newField.soil__type;
            cells[3].textContent = newField.field__status;
            cells[4].textContent = newField.field__notes;

            currentEditingRow = null;
        } else {
            
            addTableRow(newField);
        }
        
        
        updateLocalStorage();
        
       
        form.reset();

        
        updateCardTotals();
    });

    // Function to update local storage with current table data
    function updateLocalStorage() {
        const fields = Array.from(fieldsTableBody.querySelectorAll('tr')).map(row => {
            const cells = row.children;
            return {
                field__name: cells[0].textContent.trim(),
                field__size: cells[1].textContent.trim(),
                soil__type: cells[2].textContent.trim(),
                field__status: cells[3].textContent.trim(),
                field__notes: cells[4].textContent.trim()
            };
        });
        localStorage.setItem('fieldsData', JSON.stringify(fields));
    }


    updateCardTotals();
});
