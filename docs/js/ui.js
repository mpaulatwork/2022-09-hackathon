const version = 'v2';

const $debug = document.getElementById('debug');
$debug.innerHTML += `<b>${version}</b>`

const $message = document.getElementById('message');

let messageTimeout;
function setMessage(msg, timeoutMS) {
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
