// Save journal entry
document.getElementById('entryForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (title && content) {
    const entry = {
      title,
      content,
      date: new Date().toLocaleString()
    };

    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.unshift(entry); // latest first
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    document.getElementById('entryForm').reset();
    displayEntries();
  }
});

// Display saved entries
function displayEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const container = document.getElementById('entries');
  container.innerHTML = '';

  if (entries.length === 0) {
    container.innerHTML = '<p>No entries yet.</p>';
    return;
  }

  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<h3>${entry.title}</h3><small>${entry.date}</small><p>${entry.content}</p>`;
    container.appendChild(div);
  });
}

// On page load
window.onload = displayEntries;
