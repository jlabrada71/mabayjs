import './NoteList.css';

function NoteListItem(note) {
  return <div className='class-list-row'>
    <div>{ note.id }</div>
<div>{ note.title }</div><div>{ note.author }</div><div>{ note.description }</div><div>
  <input type="checkbox" defaultChecked={ note.finished }></input>
</div>

  </div>
}

function NoteList({ noteList }) {
  console.log(noteList)
  return <div>
    <h1>Note List</h1>
    { noteList.map(NoteListItem) }
  </div>
}

export default NoteList