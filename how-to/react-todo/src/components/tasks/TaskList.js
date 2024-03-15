import './TaskList.css';

function TaskListItem(task) {
  return <div className='class-list-row'>
    <div>
      <input type="checkbox" defaultChecked={task.done}></input>
    </div>
    <div>{task.description}</div>
  </div>
}

function TaskList({ taskList }) {
  console.log(taskList)
  return <div>
    <h1>Task List</h1>
    { taskList.map(TaskListItem) }
  </div>
}

export default TaskList