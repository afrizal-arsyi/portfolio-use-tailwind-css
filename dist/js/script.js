// navbar

window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;
  const top = document.querySelector('#top');

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
    top.classList.remove('hidden');
    top.classList.add('flex');
  } else {
    header.classList.remove('navbar-fixed');
    top.classList.add('hidden');
    top.classList.remove('flex');
  }
};

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

window.addEventListener('click', function (e) {
  if (e.target != hamburger && e.targer != navMenu) {
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
  }
});

// darkmode toggle
const darktoggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darktoggle.addEventListener('click', function () {
  if (darktoggle.checked) {
    html.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light';
  }
});

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  darktoggle.checked = true;
} else {
  darktoggle.checked = false;
}

// fungsi up data ke spreadsheet
const btnkirim = document.querySelector('#kirim');
const btnButton = document.querySelector('#button');
const scriptURL = 'https://script.google.com/macros/s/AKfycbx_21-VIwtS5Py2PfYRFNt3Kh0fBc_c5iSJu1Mk1quth4bHdtzOYvhZQ_uKHDkbVFQlww/exec';
const form = document.forms['submit-contact'];

form.addEventListener('submit', (e) => {
  btnkirim.classList.add('hidden');
  btnButton.classList.remove('hidden');
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pesan Anda Telah Terkirim.',
        width: '20rem',
        heightAuto: true,
        showConfirmButton: false,
        timer: 2500,
      });
      form.reset();
      console.log('Success!', response);
      btnkirim.classList.remove('hidden');
      btnButton.classList.add('hidden');
    })
    .catch((error) => console.error('Error!', error.message));
});
