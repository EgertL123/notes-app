let currentUser = {
  id: null,
  role: null
};

function login() {
  currentUser.id = document.getElementById('userId').value;
  currentUser.role = document.getElementById('role').value || 'USER';

  if (!currentUser.id) {
    alert('Please enter User ID');
    return;
  }

  alert(`Logged in as ${currentUser.role} (ID ${currentUser.id})`);
  loadNotes();
}

async function createNote() {
  if (!currentUser.id) {
    alert('Please login first');
    return;
  }

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    alert('Title and content required');
    return;
  }

  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': currentUser.id,
        'x-user-role': currentUser.role
      },
      body: JSON.stringify({ title, content })
    });

    if (!response.ok) {
      const error = await response.text();
      alert(`Failed to create note: ${error}`);
      return;
    }

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';

    loadNotes();
  } catch (err) {
    alert('Network error: ' + err.message);
  }
}

async function loadNotes() {
  const response = await fetch('/api/notes', {
    headers: {
      'x-user-id': currentUser.id,
      'x-user-role': currentUser.role
    }
  });

  const notes = await response.json();
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  notes.forEach(note => {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';

    item.innerHTML = `
      <div>
        <strong>${note.title}</strong><br>
        <small>${note.content}</small>
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteNote(${note.id})">
        Delete
      </button>
    `;

    list.appendChild(item);
  });
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-id': currentUser.id,
      'x-user-role': currentUser.role
    }
  });

  loadNotes();
}
