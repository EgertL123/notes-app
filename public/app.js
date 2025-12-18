let token = localStorage.getItem('token');
let editingNoteId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (token) {
    showNotesUI();
  } else {
    showAuthUI();
  }
});

// --- AUTHENTICATION ---
async function handleAuth(type) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill all fields!');
    return;
  }

  try {
    const response = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      if (type === 'login') {
        token = data.token;
        localStorage.setItem('token', token);
        showNotesUI();
      } else {
        alert('User created! You can login.');
      }
    } else {
      alert(data.message || 'There was an error');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// --- NOTE CRUD OPERATIONS ---
async function loadNotes() {
  if (!token) return logout();

  try {
    const response = await fetch('/api/notes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401 || response.status === 403) {
      return logout();
    }

    const notes = await response.json();
    renderNotes(notes);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Updated to handle both CREATE (POST) and UPDATE (PUT)
async function saveNote() {
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');

  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert('Title and description are required!');
    return;
  }

  const method = editingNoteId ? 'PUT' : 'POST';
  const url = editingNoteId ? `/api/notes/${editingNoteId}` : '/api/notes';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: titleInput.value.trim(),
        content: contentInput.value.trim()
      })
    });

    if (response.ok) {
      cancelEdit();
      loadNotes();
    } else {
      const errData = await response.json();
      alert('Server Error: ' + errData.message);
    }
  } catch (err) {
    console.error('FULL ERROR DETAILS:', err);
    alert('Network/JS Error: ' + err.message);
  }
}

async function deleteNote(id) {
  if (!confirm('Are you sure you want to delete this note?')) return;

  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      if (editingNoteId === id) cancelEdit(); // Reset form if we deleted the note we were editing
      loadNotes();
    } else {
      const err = await response.json();
      alert('Deleting failed: ' + err.message);
    }
  } catch (err) {
    alert('Network error');
  }
}

// --- EDIT STATE HELPERS ---
function editNote(id, title, content) {
  editingNoteId = id;

  // Fill inputs
  document.getElementById('title').value = title;
  document.getElementById('content').value = content;

  // Change button appearance to "Edit Mode"
  const btn = document.querySelector('#mainView .btn-success') || document.querySelector('#mainView .btn-warning');
  btn.innerHTML = '<i class="fas fa-save me-2"></i>Update Note';
  btn.className = 'btn btn-warning w-100 fw-bold';
  btn.onclick = saveNote; // Ensure it calls saveNote

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingNoteId = null;
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  // Change button back to "Create Mode"
  const btn = document.querySelector('#mainView .btn-warning') || document.querySelector('#mainView .btn-success');
  btn.innerHTML = '<i class="fas fa-plus me-2"></i>Create';
  btn.className = 'btn btn-success w-100 fw-bold';
  btn.onclick = saveNote;
}

// --- UI RENDERING ---
function renderNotes(notes) {
  const list = document.getElementById('notesList');
  document.getElementById('noteCount').innerText = notes.length;

  if (notes.length === 0) {
    list.innerHTML = `
            <div class="text-center py-5 w-100">
                <i class="fas fa-feather fa-3x text-muted mb-3 opacity-25"></i>
                <p class="text-muted">No notes.</p>
            </div>`;
    return;
  }

  list.innerHTML = notes.map(note => {
    // Escape single quotes for the onclick string to prevent JS errors
    const safeTitle = note.title.replace(/'/g, "\\'");
    const safeContent = note.content.replace(/'/g, "\\'");

    return `
        <div class="col">
            <div class="card note-card h-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="fw-bold m-0 text-dark">${escapeHtml(note.title)}</h6>
                        <div>
                            <button onclick="editNote(${note.id}, '${safeTitle}', '${safeContent}')" class="btn btn-link text-primary p-0 me-2">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteNote(${note.id})" class="btn btn-link text-danger p-0">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <p class="card-text text-secondary small">
                        ${escapeHtml(note.content).replace(/\n/g, '<br>')}
                    </p>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0">
                    <small class="text-muted" style="font-size: 0.7rem;">
                        <i class="far fa-clock me-1"></i> ${new Date(note.createdAt).toLocaleDateString()}
                    </small>
                </div>
            </div>
        </div>
    `}).join('');
}

function showNotesUI() {
  document.getElementById('authView').style.display = 'none';
  document.getElementById('mainView').style.display = 'block';
  loadNotes();
}

function showAuthUI() {
  document.getElementById('authView').style.display = 'block';
  document.getElementById('mainView').style.display = 'none';
}

function logout() {
  token = null;
  localStorage.removeItem('token');
  showAuthUI();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}