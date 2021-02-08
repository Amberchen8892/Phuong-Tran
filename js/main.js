/*----------navigation-----------*/
(() => {
  const hambugerBtn = document.querySelector('.hamburger-btn'),
    navMenu = document.querySelector('.nav-menu'),
    closeNavMenu = document.querySelector('.close-nav-menu');

  hambugerBtn.addEventListener('click', () => {
    navMenu.classList.add('open');
    bodyScrollingToggle();
  });
  closeNavMenu.addEventListener('click', hideNavMenu);
  function hideNavMenu() {
    navMenu.classList.remove('open');
    fadeOutEffect();
    bodyScrollingToggle();
  }
  // closeNavMenu.addEventListener('click', () => {
  //   navMenu.classList.remove('open');
  //   fadeOutEffect();
  //   bodyScrollingToggle();
  // });
  function fadeOutEffect() {
    console.log('fade out');
    document.querySelector('.fade-out-effect').classList.add('active');
    console.log('check', document.querySelector('.fade-out-effect'));
    setTimeout(() => {
      document.querySelector('.fade-out-effect').classList.remove('active');
    }, 200);
  }
  // attach an event handler to document
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('link-item')) {
      if (event.target.hash !== '') {
        event.preventDefault();
        const hash = event.target.hash;
        // deactive existing active section
        document.querySelector('.section.active').classList.add('hide');
        document.querySelector('.section.active').classList.remove('active');
        // active new section
        document.querySelector(hash).classList.add('active');
        document.querySelector(hash).classList.remove('hide');
        // deactive existing active navigation menu link item
        navMenu
          .querySelector('.active')
          .classList.add('outer-shadow', 'hover-in-shadow');
        navMenu
          .querySelector('.active')
          .classList.remove('active', 'inner-shadow');
        if (navMenu.classList.contains('open')) {
          //activate new navigation menu link item
          event.target.classList.add('active', 'inner-shadow');
          event.target.classList.remove('hover-in-shadow', 'outer-shadow');
          // hide navi menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll('.link-item');
          navItems.forEach((item) => {
            if (hash === item.hash) {
              //activate new navigation menu link item
              item.classList.add('active', 'inner-shadow');
              item.classList.remove('hover-in-shadow', 'outer-shadow');
            }
          });
          fadeOutEffect();
        }
        //add hash to url
        window.location.hash = hash;
      }
    }
  });
})();
// about section tabs
(() => {
  const aboutSection = document.querySelector('.about-section'),
    tabsContainer = document.querySelector('.about-tabs');

  tabsContainer.addEventListener('click', (event) => {
    console.log('tab');
    if (
      event.target.classList.contains('tab-item') &&
      !event.target.classList.contains('active')
    ) {
      const target = event.target.getAttribute('data-target');
      //   deactive existing active tab-item
      tabsContainer
        .querySelector('.active')
        .classList.remove('outer-shadow', 'active');
      // active new tab-item
      event.target.classList.add('active', 'outer-shadow');
      //   deactive existing active tab-content
      aboutSection
        .querySelector('.tab-content.active')
        .classList.remove('active');
      // active new tab-content
      aboutSection.querySelector(target).classList.add('active');
    }
  });
})();
function bodyScrollingToggle() {
  document.body.classList.toggle('stop-scrolling');
}
// -----------portfolio filter and popup-------------
(() => {
  const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainers = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector('.portfolio-popup'),
    prevBtn = popup.querySelector('.pp-prev'),
    nextBtn = popup.querySelector('.pp-next'),
    closeBtn = popup.querySelector('.pp-close'),
    projectDetailsContainer = popup.querySelector('.pp-details'),
    projectDetailsBtn = popup.querySelector('.pp-project-details-btn');
  let itemIndex, slideIndex, screenshots;
  // filter project
  filterContainer.addEventListener('click', () => {
    if (
      event.target.classList.contains('filter-item') &&
      !event.target.classList.contains('active')
    ) {
      //  deactive existing active "filter-item"
      filterContainer
        .querySelector('.active')
        .classList.remove('outer-shadow', 'active');
      // active new filter item
      event.target.classList.add('active', 'outer-shadow');
      const target = event.target.getAttribute('data-target');
      // console.log(target);
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove('hide');
          item.classList.add('show');
          console.log('check show-hide', item);
        } else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
    }
  });
  portfolioItemsContainers.addEventListener('click', (event) => {
    if (event.target.closest('.portfolio-item-inner')) {
      const portfolioItem = event.target.closest('.portfolio-item-inner')
        .parentElement;
      // console.log('check el', portfolioItem);

      // get pportfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector('.portfolio-item-img img')
        .getAttribute('data-screenshots');
      // convert screenshots into array
      screenshots = screenshots.split(',');
      console.log(screenshots);
      if (screenshots.length === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
      }
      slideIndex = 0;

      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  });
  closeBtn.addEventListener('click', () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains('active')) {
      popupDeatilsToggle();
    }
  });
  function popupToggle() {
    popup.classList.toggle('open');
    bodyScrollingToggle();
  }
  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector('.pp-img');
    //activate loader until popupImg loaded
    popup.querySelector('.pp-loader').classList.add('active');

    popupImg.src = imgSrc;

    popupImg.onload = () => {
      // deactivate loader
      popup.querySelector('.pp-loader').classList.remove('active');
    };

    popup.querySelector('.pp-counter').innerHTML =
      slideIndex + 1 + ' ' + 'of' + ' ' + screenshots.length;
  }
  // next slide
  nextBtn.addEventListener('click', () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    console.log('slideindex', slideIndex);
    popupSlideShow();
  });
  // prev slide
  prevBtn.addEventListener('click', () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    console.log('slideindex', slideIndex);
    popupSlideShow();
  });
  function popupDetails() {
    if (!portfolioItems[itemIndex].querySelector('.portfolio-item-details')) {
      projectDetailsBtn.style.display = 'none';
      return; /* end function*/
    }
    projectDetailsBtn.style.display = 'block';
    // get the projects details
    const details = portfolioItems[itemIndex].querySelector(
      '.portfolio-item-details'
    ).innerHTML;
    popup.querySelector('.pp-project-details').innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector('.portfolio-title')
      .innerHTML;
    popup.querySelector('.pp-title h2').innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute('data-category');
    popup.querySelector('.pp-project-category').innerHTML = category;
    console.log(title);
    console.log(category);
  }
  projectDetailsBtn.addEventListener('click', () => {
    popupDeatilsToggle();
  });
  function popupDeatilsToggle() {
    if (projectDetailsContainer.classList.contains('active')) {
      projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
      projectDetailsBtn.querySelector('i').classList.add('fa-plus');
      projectDetailsContainer.classList.remove('active');
      projectDetailsContainer.style.maxHeight = 0 + 'px';
    } else {
      projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
      projectDetailsBtn.querySelector('i').classList.add('fa-minus');
      projectDetailsContainer.classList.add('active');
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + 'px';
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();
/*------------hide all sections except active---------*/
// (() => {
//   const sections = document.querySelectorAll('.section');
//   sections.forEach((section) => {
//     if (!section.classList.contains('active')) {
//       section.classList.add('hide');
//     }
//     console.log(section);
//   });
// })();

window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('fade-out');
  setInterval(() => {
    document.querySelector('.preloader').style.display = 'none';
  }, 600);
});

// send email
var form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', contact, false);
function contact(e) {
  // Prevent Default Form Submission
  e.preventDefault();

  var target = e.target || e.srcElement;
  var i = 0;
  var message = '';

  // Loop Through All Input Fields
  for (i = 0; i < target.length; ++i) {
    // Check to make sure it's a value. Don't need to include Buttons
    if (target[i].type != 'text' && target[i].type != 'textarea') {
      // Skip to next input since this one doesn't match our rules
      continue;
    }

    // Add Input Name and value followed by a line break
    message += target[i].name + ': ' + target[i].value + '\r\n';
  }
  // Modify the hidden body input field that is required for the mailto: scheme
  target.elements['body'].value = message;

  // Submit the form since we previously stopped it. May cause recursive loop in some browsers? Should research this.
  this.submit();
}
