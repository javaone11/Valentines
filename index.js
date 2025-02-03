document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    let yesRadio = document.getElementById('yes');
    let noRadio = document.getElementById('no');
    let yesLabel = document.querySelector('label[for="yes"]');
    let noLabel = document.querySelector('label[for="no"]');
    let noCount = 0;

    form.addEventListener('change', function(event) {
        if (event.target.name === 'valentine' && event.target.value === 'no') {
            noCount++;
            if (noCount >= 3) {
                // Change all options to "Yes"
                yesLabel.textContent = 'Yes';
                noLabel.textContent = 'Yes';
                yesRadio.value = 'yes';
                noRadio.value = 'yes';

                // Add more "Yes" radio buttons
                for (let i = 0; i < 3; i++) {
                    const newDiv = document.createElement('div');
                    const newLabel = document.createElement('label');
                    const newRadio = document.createElement('input');

                    newLabel.textContent = 'Yes';
                    newLabel.setAttribute('for', `yes${i + 2}`);
                    newRadio.type = 'radio';
                    newRadio.id = `yes${i + 2}`;
                    newRadio.name = 'valentine';
                    newRadio.value = 'yes';
                    newRadio.required = true;
                    newRadio.checked = true; // Pre-select the radio button

                    newDiv.appendChild(newLabel);
                    newDiv.appendChild(newRadio);
                    document.querySelector('.radio-group').appendChild(newDiv);
                }

                // Pre-select the existing radio buttons
                yesRadio.checked = true;
                noRadio.checked = true;
            } else {
                // Swap the labels
                const tempLabel = yesLabel.textContent;
                yesLabel.textContent = noLabel.textContent;
                noLabel.textContent = tempLabel;

                // Swap the radio button values
                yesRadio.value = 'no';
                noRadio.value = 'yes';

                // Swap the IDs
                yesRadio.id = 'no';
                noRadio.id = 'yes';

                // Swap the 'for' attributes of the labels
                yesLabel.setAttribute('for', 'no');
                noLabel.setAttribute('for', 'yes');

                // Reassign the elements to the new IDs
                yesRadio = document.getElementById('yes');
                noRadio = document.getElementById('no');
                yesLabel = document.querySelector('label[for="yes"]');
                noLabel = document.querySelector('label[for="no"]');
            }
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="valentine"]:checked').value;
        if (selectedOption === 'yes') {
            const userName = document.getElementById('name').value;
            form.remove(); // Remove the initial form
            showDateForm(userName);
        } else {
            alert('Think Again');
        }
    });

    function showDateForm(userName) {
        const dateForm = document.createElement('form');
        dateForm.innerHTML = `
            <h2>Set a Date and Time</h2>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required><br><br>
            <label for="time">Time:</label>
            <input type="time" id="time" name="time" required><br><br>
            <label for="place">Where do you want to eat?</label>
            <input type="text" id="place" name="place" required><br><br>
            <input type="submit" value="Submit">
        `;
        document.body.appendChild(dateForm);

        dateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const date = document.getElementById('date').value;
            let time = document.getElementById('time').value;
            const place = document.getElementById('place').value;
            const [hours, minutes] = time.split(':');
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            time = `${formattedHours}:${minutes} ${period}`;
            dateForm.remove(); // Remove the date form
            showReceiptForm(userName, date, time, place);
            sendReceiptEmail(userName, date, time, place);
        });
    }

    function showReceiptForm(userName, date, time, place) {
        const receiptForm = document.createElement('div');
        receiptForm.className = 'receipt';
        receiptForm.innerHTML = `
            <h2>See you!</h2>
            <p>Name: ${userName}</p>
            <p>Date: ${date}</p>
            <p>Time: ${time}</p>
            <p>Place: ${place}</p>
            <p>Thank you for being my Valentine!</p>
        `;
        document.body.appendChild(receiptForm);
    }

    function sendReceiptEmail(userName, date, time, place) {
        fetch('http://localhost:3000/send-receipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, date, time, place })
        })
        .then(response => response.text())
        .then(data => {
            console.log('Email sent:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});