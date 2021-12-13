const TaskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompleteDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showTask = async () => {
    try{
        const { data: {task},} = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, name, completed } = task;

        TaskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        tempName = name;
        if(completed){
            taskCompleteDOM.checked = true;
        }
    } catch(err) {
        console.error(err);
    }
}
showTask();

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
        console.log(id);
    e.preventDefault();
    try{
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompleteDOM.checked;

        const { data: {task}, } = await axios.patch(`/api/v1/tasks/${id}?name=${taskName}&completed=${taskCompleted}`)

        const {_id, completed, name} = task;
        TaskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        tempName = name;
        if(completed){
            taskCompleteDOM.checked = true;
        }
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Success! Task edited.`;
        formAlertDOM.classList.add('text-success');
    } catch (err) {
        console.error(err);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = 'Failed to edit task... Please try again.';
    }
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
});