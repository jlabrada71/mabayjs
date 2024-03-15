import './App.css';
import TaskList from './components/tasks/TaskList'
import NoteList from './components/notes/NoteList'
import tasks from './tasks';
import notes from './notes';

function getTasksFromAPI() {
  return tasks;
}

function getNotesFromAPI() {
  return notes;
}

function App() {
  return (
    <div className="App">
        <TaskList taskList={getTasksFromAPI()}></TaskList>
        <NoteList noteList={getNotesFromAPI()}></NoteList>
    </div>
  );
}

export default App;
