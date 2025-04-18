// ハンバーガーメニュー
const drawerIcon = document.querySelector('.drawer-icon');
const drawerContent = document.querySelector('.drawer-content');
const drawerBackground = document.querySelector('.drawer-background');

if (drawerIcon) {
  drawerIcon.addEventListener('click', (e) => {
    e.preventDefault();
    drawerIcon.classList.toggle('is-active');
    drawerContent.classList.toggle('is-active');
    drawerBackground.classList.toggle('is-active');
  });
}

// スムーススクロール
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    const position = target ? target.offsetTop - headerHeight : 0;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});

// スクロール時のto-top表示
const toTopBtn = document.querySelector('.to-top');
if (toTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      toTopBtn.classList.add('is-show');
    } else {
      toTopBtn.classList.remove('is-show');
    }
  });

  // to-top ボタンを押したときにトップに戻る
  toTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

const navLinks = document.querySelectorAll('.header-nav li a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // ページ内リンク（#）ならスムーススクロール、そうでなければそのまま遷移させる
    const href = link.getAttribute('href');
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const position = target ? target.offsetTop - headerHeight : 0;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }

    // アクティブ状態だけは切り替えたい場合
    navLinks.forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

// スクロールで表示する要素（fade-in）を一括監視
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeEls.forEach(el => observer.observe(el));
// ドロワーメニュー内のリンククリックでドロワーを閉じる
const drawerLinks = document.querySelectorAll('.drawer-content a');
drawerLinks.forEach(link => {
  link.addEventListener('click', () => {
    drawerIcon.classList.remove('is-active');
    drawerContent.classList.remove('is-active');
    drawerBackground.classList.remove('is-active');
  });
});

const qaQuestions = document.querySelectorAll('.qa-box_q');

qaQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const qaBox = question.closest('.qa-box');
    const icon = question.querySelector('.qa-box_icon');
    const isOpen = answer.classList.contains('is-open');

    // 他をすべて閉じる
    document.querySelectorAll('.qa-box_a').forEach(a => {
      a.classList.remove('is-open');
      a.style.maxHeight = null; // ←★コレが重要！
    });
    document.querySelectorAll('.qa-box').forEach(b => b.classList.remove('is-open'));
    document.querySelectorAll('.qa-box_icon').forEach(i => i.classList.remove('is-open'));

    // 今クリックしたやつを開く
    if (!isOpen) {
      answer.classList.add('is-open');
      qaBox.classList.add('is-open');
      icon.classList.add('is-open');

      answer.style.maxHeight = answer.scrollHeight + 40 + "px";
    }
  });
});
