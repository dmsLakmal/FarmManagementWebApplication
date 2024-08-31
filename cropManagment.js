document.addEventListener('DOMContentLoaded', function() {
    const cropForm = document.getElementById('cropForm');
    const cropDetailsBody = document.getElementById('cropDetailsBody');
    const cropSelect = document.getElementById('cropSelect');
    const currentDateInput = document.getElementById('currentDate');
    const showStageButton = document.querySelector('.check__stage');
    const dynamicText1 = document.getElementById('dynamicText1');
    const dynamicText2 = document.getElementById('dynamicText2');
    const recommendationText = document.getElementById('recommendationText');

    // Function to add a new crop to the table
    function addCropToTable(crop) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${crop.name}</td>
            <td>${crop.category}</td>
            <td>${crop.plantedDate}</td>
            <td>${crop.plantedTime}</td>
            <td>
                <button onclick="updateCrop('${crop.name}')">Update</button>
                <button class="delete__button" onclick="deleteCrop('${crop.name}')">Delete</button>
            </td>
        `;
        cropDetailsBody.appendChild(row);
        updateCropSelect();
        storeCropData(crop);
    }

    // Function to update the crop select dropdown
    function updateCropSelect() {
        cropSelect.innerHTML = '<option value="" disabled selected>Select crop</option>';
        const rows = cropDetailsBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const cropName = row.cells[0].textContent;
            const option = document.createElement('option');
            option.value = index;
            option.textContent = cropName;
            cropSelect.appendChild(option);
        });
    }

    cropForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCrop = {
            name: document.getElementById('cropName').value,
            category: document.getElementById('category').value,
            plantedDate: document.getElementById('plantedDate').value,
            plantedTime: document.getElementById('plantedTime').value
        };
        addCropToTable(newCrop);
        cropForm.reset();
    });

    // Function to populate form with crop data for updating
    window.updateCrop = function(cropName) {
        const row = Array.from(cropDetailsBody.rows).find(row => row.cells[0].textContent === cropName);
        if (row) {
            document.getElementById('cropName').value = row.cells[0].textContent;
            document.getElementById('category').value = row.cells[1].textContent;
            document.getElementById('plantedDate').value = row.cells[2].textContent;
            document.getElementById('plantedTime').value = row.cells[3].textContent;

            row.remove();
            updateCropSelect();
        }
    };

    // Function to delete a crop
    window.deleteCrop = function(cropName) {
        const row = Array.from(cropDetailsBody.rows).find(row => row.cells[0].textContent === cropName);
        if (row) {
            row.remove();
            updateCropSelect();
        }
    };

    // Function to calculate days between two dates
    function calculateDaysBetweenDates(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays;
    }

    // Function to display messages in the dynamicText1 textarea
    function displayMessage(message) {
        dynamicText1.value = message;
    }

    // Function to store selected crop data in localStorage
    function storeSelectedCropData(cropName) {
        localStorage.setItem('selectedCrop', cropName);
    }

    // Function to store crop data in localStorage
    function storeCropData(crop) {
        const cropsData = JSON.parse(localStorage.getItem('cropsData')) || [];
        cropsData.push({ cropName: crop.name });
        localStorage.setItem('cropsData', JSON.stringify(cropsData));
        window.dispatchEvent(new Event('storage')); // Trigger storage event
    }

    // Function to determine crop stage
    function determineCropStage(daysSincePlanting) {
        if (daysSincePlanting <= 14) return { number: 1, name: "Germination Stage" };
        if (daysSincePlanting <= 42) return { number: 2, name: "Seedling Stage" };
        if (daysSincePlanting <= 70) return { number: 3, name: "Vegetative Stage" };
        if (daysSincePlanting <= 90) return { number: 4, name: "Reproductive Stage" };
        return { number: 5, name: "Maturity and Harvest Stage" };
    }

    cropSelect.addEventListener('change', function() {
        const selectedCropIndex = this.value;
        if (selectedCropIndex !== "") {
            const selectedRow = cropDetailsBody.rows[selectedCropIndex];
            const cropName = selectedRow.cells[0].textContent;
            const plantedDate = selectedRow.cells[2].textContent;
            storeSelectedCropData(cropName);
            currentDateInput.min = plantedDate;
            currentDateInput.value = "";
        }
    });

    if (showStageButton) {
        showStageButton.addEventListener('click', function() {
            const selectedCropIndex = cropSelect.value;
            const currentDate = currentDateInput.value;

            if (selectedCropIndex === "") {
                displayMessage("Please select a crop.");
                return;
            }

            if (!currentDate) {
                displayMessage("Please select a current date.");
                return;
            }

            const selectedRow = cropDetailsBody.rows[selectedCropIndex];
            const plantedDate = selectedRow.cells[2].textContent;
            
            if (new Date(currentDate) < new Date(plantedDate)) {
                displayMessage("The selected date cannot be before the planted date.");
                return;
            }

            const daysSincePlanting = calculateDaysBetweenDates(plantedDate, currentDate);
            const stage = determineCropStage(daysSincePlanting);

            dynamicText1.value = `Stage: ${stage.number}\n${daysSincePlanting} days`;

            let recommendations;
            let details;
            switch(stage.name) {
                case "Germination Stage":
                    recommendations = `
                        <li>Use High-Quality Seeds: Ensure seeds are fresh and from a reliable source to improve germination rates.</li>
                        <li>Maintain Optimal Moisture: Keep the soil consistently moist but not waterlogged to encourage seed sprouting.</li>
                        <li>Provide Adequate Temperature: Maintain the ideal temperature for the specific crop type to enhance germination.</li>
                        <li>Avoid Excessive Light: While some seeds require light to germinate, most prefer darkness or minimal light during this stage.</li>
                        <li>Monitor for Disease: Keep an eye out for mold or fungal infections, which can hinder germination.</li>
                    `;
                    details = `Seeds absorb water and begin sprouting. The duration depends on the crop type, soil temperature, and moisture levels.`;
                    break;
                case "Seedling Stage":
                    recommendations = `
                        <li>Provide Balanced Nutrition: Use a balanced fertilizer to support early growth without overloading the seedlings.</li>
                        <li>Ensure Proper Light: Provide sufficient light to promote healthy leaf development and strong growth.</li>
                        <li>Water Wisely: Water the seedlings regularly but ensure good drainage to prevent root rot.</li>
                        <li>Transplant Carefully: When moving seedlings, handle them gently to avoid damaging the delicate roots.</li>
                        <li>Control Temperature: Maintain a stable temperature to support steady growth and avoid stress on the seedlings.</li>
                    `;
                    details = `The seedling develops its root system and first true leaves. The duration varies with crop type and environmental conditions.`;
                    break;
                case "Vegetative Stage":
                    recommendations = `
                        <li>Optimize Light Conditions: Ensure plants receive adequate light for photosynthesis and healthy growth.</li>
                        <li>Fertilize Appropriately: Use a high-nitrogen fertilizer to promote robust leaf and stem development.</li>
                        <li>Prune When Necessary: Prune excess growth to improve air circulation and light penetration.</li>
                        <li>Maintain Proper Watering: Water consistently but avoid overwatering, which can lead to root problems.</li>
                        <li>Monitor for Pests: Check regularly for pests and diseases, which can rapidly affect plant health during this stage.</li>
                    `;
                    details = `The plant experiences rapid growth in leaves, stems, and roots. The duration depends on the type of crop and its growth rate.`;
                    break;
                case "Reproductive Stage":
                    recommendations = `
                        <li>Provide Adequate Nutrition: Use phosphorus-rich fertilizers to promote flowering and fruit/seed development.</li>
                        <li>Control Pollination: If necessary, assist with pollination to ensure a good yield.</li>
                        <li>Prune Unnecessary Growth: Remove excess foliage to direct energy towards flower and fruit production.</li>
                        <li>Maintain Water Levels: Water adequately to support the high metabolic demands during flowering and fruiting.</li>
                        <li>Monitor Pests and Diseases: Be vigilant for pests that target flowers or developing fruits and seeds.</li>
                    `;
                    details = `The plant develops flowers, fruits, or seeds, focusing energy on reproduction. Timing varies with crop type and growth conditions.`;
                    break;
                case "Maturity and Harvest Stage":
                    recommendations = `
                        <li>Monitor Ripeness: Harvest at the correct maturity stage for the best quality and yield.</li>
                        <li>Prepare for Storage: Use proper methods to store harvested crops, maintaining their freshness and quality.</li>
                        <li>Clean Tools and Equipment: Sanitize all tools and equipment used during the harvest to prevent contamination.</li>
                        <li>Plan Crop Rotation: Consider rotating crops to maintain soil health and prevent disease buildup.</li>
                        <li>Analyze Yield: Evaluate the yield to plan for future planting seasons and identify any issues during growth.</li>
                    `;
                    details = `The plant reaches full maturity, ready for harvesting. The timing varies with the crop type and environmental conditions.`;
                    break;
                default:
                    recommendations = "No recommendations available.";
                    details = "";
                    break;
            }

            dynamicText2.innerHTML = `Stage: ${stage.name}\n\n${details}`;
            recommendationText.innerHTML = recommendations;
        });
    }
});
