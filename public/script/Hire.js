function hireUser(button) {
    const userId = button.dataset.user;

    fetch('/api/notification/hire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            hired_id: userId,
            explanation: document.getElementById('explanation').value,
            wage: document.getElementById('wage').value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.notification) {
                alert(
                    "You have successfully sent a request to hire the user. They will be notified, and when they respond, you will be notified as well."
                );
                window.location.href = '/Main';
            } else {
                alert('Failed to send hire request. Please try again.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred while sending the hire request.');
        });
}
