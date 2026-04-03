const api = "http://localhost:3000/tasks";

// Add Task
function addTask() {
    const topic = document.getElementById("topic").value;
    const duration = document.getElementById("duration").value;

    if (!topic || !duration) {
        alert("Please fill all fields");
        return;
    }

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            topic: topic,
            duration: duration
        })
    })
    .then(res => res.text())
    .then(() => {
        document.getElementById("topic").value = "";
        document.getElementById("duration").value = "";
        loadTasks();
    })
    .catch(err => console.log("Error:", err));
}

// Load Tasks
function loadTasks() {
    fetch(api)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        if (!data || data.length === 0) {
            list.innerHTML = "<p>No tasks added</p>";
            return;
        }

        data.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span>${task.topic} (${task.duration} mins)</span>
                <button onclick="addTask()">Add Task</button>
            `;

            list.appendChild(li);
        });
    })
    .catch(err => console.log("Error:", err));
}

// Delete Task
function deleteTask(id) {
    fetch(`${api}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTasks())
    .catch(err => console.log("Error:", err));
}

// Load when page starts
window.onload = loadTasks;