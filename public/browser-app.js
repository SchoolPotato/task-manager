const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// Load tasks from api/tasks
const showTasks = async ()=>{
    loadingDOM.style.visibility = "visible"
    try{
        const{ data: {task} } = await axios.get("/api/v1/tasks");
        if(task.length < 1){
            tasksDOM.innerHTML = `<h5 class="empty-list">No tasks to show...</h5>`;
            loadingDOM.style.visibility = "hidden";
            return;
        }
        const allTasks = task.map((task) => {
            const {_id, name, completed} = task;
            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            <a href="task.html?id=${_id}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${_id}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`;
        }).join("")
        tasksDOM.innerHTML = allTasks;
    } catch(err){
        tasksDOM.innerHTML = `<h5 class="empty">Something went wrong! Please try again later...</h5>
        <h6 class="empty-list" style="color: #BBD">${err}</h6>`;
    }
    loadingDOM.style.visibility="hidden"
}

showTasks();

// Delete Task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
    const el = e.target;
    if(el.parentElement.classList.contains("delete-btn")){
        loadingDOM.style.visibility = "visible";
        const id= el.parentElement.dataset.id
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch(err){
            console.log(err);
        }
    }
    loadingDOM.style.visibility="hidden";
})

// form
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value

    try{
        await axios.post("/api/v1/tasks", {name});
        showTasks()
        taskInputDOM.value=""
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Success! Task added!";
        formAlertDOM.classList.add("text-success");
    } catch(err){
        formAlertDOM.style.display="block";
        formAlertDOM.innerHTML="Whoops! Something went wrong. Please try again...";
        console.log(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove("text-success");
    }, 5000);
});