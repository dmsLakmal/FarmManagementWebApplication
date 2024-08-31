function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar__open');
}

toggleSidebar();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.inventory__form form');
    const inventoryTableBody = document.getElementById('inventoryDetailsBody');
    const totalSeeds = document.getElementById('totalSeeds');
    const totalFertilizers = document.getElementById('totalFertilizers');
    const totalTools = document.getElementById('totalTools');
    const totalMachineries = document.getElementById('totalMachineries');

    let currentEditingRow = null; 

    // test data
    const preStoredData = [
        {
            category: 'Seeds',
            name: 'Wheat Seeds',
            purchase__date: '2024-01-10',
            expire__date: '2025-01-10',
            item__count: 100
        },
        {
            category: 'Fertilizers',
            name: 'Nitrogen Fertilizer',
            purchase__date: '2024-02-15',
            expire__date: '2025-02-15',
            item__count: 50
        },
        {
            category: 'Machinery',
            name: 'Tractor',
            purchase__date: '2023-12-01',
            expire__date: '',
            item__count: 2
        }
    ];

    // Function to add a row to the table
    function addTableRow(item, index = null) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.name}</td>
            <td>${item.purchase__date}</td>
            <td>${item.expire__date ? item.expire__date : 'N/A'}</td>
            <td>${item.item__count}</td>
            <td>
                <button class="update__button">Update</button>
                <button class="delete__button">Delete</button>
            </td>
        `;
        inventoryTableBody.appendChild(row);

        // delete function
        row.querySelector('.delete__button').addEventListener('click', function() {
            inventoryTableBody.removeChild(row);
            if (currentEditingRow === row) {
                form.reset();
                currentEditingRow = null;
            }
            updateCardTotals(); 
        });

        // Add update 
        row.querySelector('.update__button').addEventListener('click', function() {
            form.querySelector('#category').value = item.category;
            form.querySelector('#name').value = item.name;
            form.querySelector('#purchase__date').value = item.purchase__date;
            form.querySelector('#expire__date').value = item.expire__date;
            form.querySelector('#item__count').value = item.item__count;
            currentEditingRow = row;
        });

        updateCardTotals();
    }

    function updateCardTotals() {
        let seedsTotal = 0;
        let fertilizersTotal = 0;
        let toolsTotal = 0;
        let machineriesTotal = 0;

        Array.from(inventoryTableBody.querySelectorAll('tr')).forEach(row => {
            const cells = row.children;
            const category = cells[0].textContent.trim();
            const itemCount = parseInt(cells[4].textContent.trim(), 10);

            switch (category) {
                case 'Seeds':
                    seedsTotal += itemCount;
                    break;
                case 'Fertilizers':
                    fertilizersTotal += itemCount;
                    break;
                case 'Tools and Equipment':
                    toolsTotal += itemCount;
                    break;
                case 'Machinery':
                    machineriesTotal += itemCount;
                    break;
                default:
                    break;
            }
        });

        totalSeeds.textContent = seedsTotal;
        totalFertilizers.textContent = fertilizersTotal;
        totalTools.textContent = toolsTotal;
        totalMachineries.textContent = machineriesTotal;
    }


    preStoredData.forEach(item => addTableRow(item));


    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const newItem = {
            category: form.querySelector('#category').value,
            name: form.querySelector('#name').value,
            purchase__date: form.querySelector('#purchase__date').value,
            expire__date: form.querySelector('#expire__date').value,
            item__count: form.querySelector('#item__count').value
        };

        if (currentEditingRow) {
            const cells = currentEditingRow.children;
            cells[0].textContent = newItem.category;
            cells[1].textContent = newItem.name;
            cells[2].textContent = newItem.purchase__date;
            cells[3].textContent = newItem.expire__date ? newItem.expire__date : 'N/A';
            cells[4].textContent = newItem.item__count;

            currentEditingRow = null; 


            updateCardTotals();
        } else {

            addTableRow(newItem);
        }


        form.reset();
    });


    updateCardTotals();
});
