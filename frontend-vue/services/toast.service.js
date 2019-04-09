export default class ToastService {
  toast(icon, message) {
    const toast = document.createElement('div');
    toast.innerHTML = (icon ? '<img src="assets/icons/' + icon + '.svg">' : '') + message;
    toast.setAttribute('class', 'toast');
    toast.setAttribute('id', 'toast');
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.setAttribute('class', 'toast fade');
    }, 2000);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}