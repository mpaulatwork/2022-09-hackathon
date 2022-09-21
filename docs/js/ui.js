const version = 'v4';
const isDebug = window.location.search.includes('debug');

const $debug = document.getElementById('debug');
$debug.innerHTML += `<b>${version}</b>`;

const $message = document.getElementById('message');

let messageTimeout;
function setMessage(msg, timeoutMS) {
  if (!isDebug) { return; }
  if (messageTimeout) {
    clearTimeout(messageTimeout);
    messageTimeout = undefined;
  }
  if (msg) {
    $message.innerHTML = msg;
    $message.classList.remove('hide');

    if (timeoutMS) {
      messageTimeout = setTimeout(() => setMessage(''), timeoutMS);
    }
  } else {
    $message.classList.add('hide');
  }
}
setMessage('');

if (!isDebug) {
  $debug.classList.add('hide');
  $message.classList.add('hide');
}
