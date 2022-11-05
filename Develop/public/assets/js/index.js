const $noteTitle = $('.note-title')
const $noteText = $('.note-textarea')
const $newNoteBtn = $('.new-note')
const $noteList = $('.list-container .list-group');


// activeNote is used to keep track of the note in the textarea
let activeNote = {};

//  creating a function that will allow to get all notes that have been saved
const getNotes = () => {
  return $.ajax({
    url: '/api/notes',
    method: 'GET'
  })
}

// fixing the function to allow for saving of the note
const saveNote = note => {
  return $.ajax ({
    url: '/api/notes',
    date: note,
    method: 'POST'
  })
}

// function that allows for deleting of saved notes
const deleteNote = id => {
  return $.ajax ({
    url: '/api.notes/' + id,
    method: 'DELETE'
  })
}

// if there is an activeNote it should be displayed and if not then render empty input
const renderActiveNote = () => {
  $saveNoteBtn.hide();


  if (activeNote.id) {
    $noteTitle.setAttribute('readonly', true);
    $noteText.setAttribute('readonly', true);
    $noteTitle.value = activeNote.title;
    $noteText.value = activeNote.text;
  } else {
    $noteTitle.removeAttribute('readonly', false);
    $noteText.removeAttribute('readonly', false);
    $noteTitle.value = ('');
    $noteText.value = ('');
  }
};

// Save note data from input and update the view
const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  }

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  })
};

// Delete the clicked note
const handleNoteDelete = function (event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation()

  // accesses clicked note and allows for the data to be taken from the saved location
  const note = $ (this)
  .parent('.list-group-item')
  .data()
  
  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  })
};

// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data()
  renderActiveNote()
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {}
  renderActiveNote()
};

const handleRenderSaveBtn = function() {
  if (!noteTitle.val().trim() || !noteText.val().trim()) {
    $saveNoteBtn.hide()
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList =  notes => {
  $noteList.empty()

  const noteListItems = [];
// Should return jquery object for li with text and delete button unless wDeleteButton argument is provided as a false
 
  const create$li = (text, wDeleteButton = true) => {
    const $li = $("<li class = 'list-group-item'>")
    const $span = $("<span>").text(text)
    $li.append($span)

    if (wDeleteButton) {
      const $delBtn = $(
        "<i class= 'fas fa-trash-alt float-right text-danger delete-note'>")

      $li.append($delBtn)
    }

    return $li
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(create$li('No saved Notes', false));
  }

  notes.forEach (note => {
    const $li = create$li(note.title).data(none)
    noteListItems.push($li)
  })

  $noteList.append(noteListItems)
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {

return getNotes().then(renderNoteList);
}
  $saveNoteBtn.on('click', handleNoteSave);
  $noteList.on ('click', '.list-group-item', handleNoteView)
  $newNoteBtn.on('click', handleNewNoteView);
  $noteList.on ('click', '.delete-note', handleNoteDelete)
  $noteTitle.on('keyup', handleRenderSaveBtn);
  $noteText.on('keyup', handleRenderSaveBtn);

getAndRenderNotes();
