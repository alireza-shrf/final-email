  const messages = {
    Borge: {
      subject: "Remember Me",
      from: "Borge Refsnes",
      date: "Sep 27, 2015",
      avatar: "images/one.jpg",
      content: `
        <hr />
        <p>Hello, i just wanted to let you know that i'll be home at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Best Regards, <br />Borge Refsnes</p>
      `
    },
    Jane: {
      subject: "None",
      from: "Jane Doe",
      date: "Sep 25, 2015",
      avatar: "images/two.jpg",
      content: `
        <hr />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Forever yours,<br />Jane</p>
      `
    },
    John: {
      subject: "None",
      from: "John Doe",
      date: "Sep 23, 2015",
      avatar: "images/three.jpg",
      content: `
        <hr />
        <p>Welcome.</p>
        <p>That's it!</p>
      `
    },
    Sent: {
      isFolder: true,
      icon: "fa-paper-plane",
      iconColor: "text-danger",
      title: "Sent Messages",
      subtitle: "You have sent 2 messages.",
      content: `
        <hr />
        <p>Message 1: Sent to John Doe - Thank you!</p>
        <p>Message 2: Sent to Jane Doe - Meeting tomorrow.</p>
      `
    },
    Drafts: {
      isFolder: true,
      icon: "fa-hourglass-end",
      iconColor: "text-warning",
      title: "Draft Messages",
      subtitle: "You have 1 draft message.",
      content: `
        <hr />
        <p>Draft 1: Work on the project proposal...</p>
      `
    },
    Trash: {
      isFolder: true,
      icon: "fa-trash",
      iconColor: "text-secondary",
      title: "Trash",
      subtitle: "Deleted messages.",
      content: `
        <hr />
        <p>Message deleted on May 21, 2025.</p>
        <p>Another deleted message.</p>
      `
    }
  };

 
  function showMessage(personId) {
    const contentDiv = document.getElementById('content');
    const messageData = messages[personId];
    
    
    const oldMessage = document.getElementById('message-container');
    if (oldMessage) {
      oldMessage.remove();
    }
    
 
    const messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.className = 'person active';
    
   
    if (messageData.isFolder) {
      messageContainer.innerHTML = `
        <div class="d-flex align-items-center mb-3">
          <i class="fa-solid ${messageData.icon} fa-3x me-3 ${messageData.iconColor}"></i>
          <div>
            <h5>${messageData.title}</h5>
            <small class="text-muted">${messageData.subtitle}</small>
          </div>
        </div>
        ${messageData.content}
      `;
    } else {
      messageContainer.innerHTML = `
        <div class="d-flex align-items-center mb-3">
          <img
            src="${messageData.avatar}"
            alt="${messageData.from}"
            class="rounded-circle me-3"
            style="width:100px; height:100px; object-fit: cover;"
          />
          <div>
            <h5>Subject: ${messageData.subject}</h5>
            <small class="text-muted"><i class="fa-regular fa-clock"></i> From ${messageData.from}, ${messageData.date}.</small>
          </div>
        </div>
        ${messageData.content}
      `;
    }
    
  
    contentDiv.appendChild(messageContainer);
    
  
    messageContainer.scrollIntoView({ behavior: 'smooth' });
  }


  const sidebar = document.getElementById('sidebar');
  const btnToggleSidebar = document.getElementById('btnToggleSidebar');

  btnToggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

 
  const btnInbox = document.getElementById('btnInbox');
  const inboxList = document.getElementById('inboxList');

  btnInbox.addEventListener('click', () => {
    const bsCollapse = bootstrap.Collapse.getInstance(inboxList) || new bootstrap.Collapse(inboxList);
    if (inboxList.classList.contains('show')) {
      bsCollapse.hide();
      btnInbox.querySelector('i.fa-caret-down').style.transform = 'rotate(-90deg)';
    } else {
      bsCollapse.show();
      btnInbox.querySelector('i.fa-caret-down').style.transform = 'rotate(0deg)';
    }
  });


  const inboxItems = document.querySelectorAll('.inbox-item');
  const folderItems = document.querySelectorAll('.folder-item');

  function clearActive() {
    inboxItems.forEach(item => item.classList.remove('active'));
    folderItems.forEach(item => item.classList.remove('active'));
  }

  inboxItems.forEach(item => {
    item.addEventListener('click', () => {
      clearActive();
      item.classList.add('active');
      const personId = item.getAttribute('data-person');
      showMessage(personId);
      if(window.innerWidth < 992) sidebar.classList.remove('show');
    });
  });


  folderItems.forEach(item => {
    item.addEventListener('click', () => {
      clearActive();
      item.classList.add('active');
      const folderId = item.getAttribute('data-person');
      showMessage(folderId);
      if(window.innerWidth < 992) sidebar.classList.remove('show');
    });
  });


  const btnNewMessage = document.getElementById('btnNewMessage');
  const btnOpenNewMessage = document.getElementById('btnOpenNewMessage');
  const newMessageModal = new bootstrap.Modal(document.getElementById('newMessageModal'));

  btnNewMessage.addEventListener('click', () => newMessageModal.show());
  btnOpenNewMessage.addEventListener('click', () => newMessageModal.show());


  const sendBtn = document.getElementById('sendBtn');
  sendBtn.addEventListener('click', () => {
    document.getElementById('messageForm').reset();
    newMessageModal.hide();
  });


  document.addEventListener('DOMContentLoaded', () => {
    const firstInboxItem = document.getElementById('firstInboxItem');
    if (firstInboxItem) {
      firstInboxItem.classList.add('active');
      showMessage('Borge');
    }
  });