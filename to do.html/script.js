document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("task-input");
    const reminderTimeInput = document.getElementById("reminder-time");
    const taskList = document.getElementById("task-list");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        const reminderTime = reminderTimeInput.value;

        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="important-btn">Mark Important</button>
            <button class="delete-btn">Delete</button>
        `;
        
        taskList.appendChild(li);

        // Mark Important/Unimportant
        const importantBtn = li.querySelector(".important-btn");
        importantBtn.addEventListener("click", function () {
            if (li.classList.contains("important")) {
                li.classList.remove("important");
                importantBtn.textContent = "Mark Important";
            } else {
                li.classList.add("important");
                importantBtn.textContent = "Mark Unimportant";
            }
        });

        // Delete Task
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        // Set Reminder
        if (reminderTime) {
            const reminderDate = new Date(reminderTime).getTime();
            const now = new Date().getTime();
            const delay = reminderDate - now;

            if (delay > 0) {
                setTimeout(() => {
                    new Notification("Task Reminder", {
                        body: `Reminder for task: ${taskText}`,
                    });
                }, delay);
            }
        }

        taskInput.value = "";
        reminderTimeInput.value = "";
    });

    // Request notification permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
