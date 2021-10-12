// Slider 輪播
// 先抓到所有的圖
const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slide-container");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
// 抓到點點的容器
const dotContainer = document.querySelector(".dots");
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.3)";
// slider.style.overflow = "visible";

// 這個是要與當下的index去作用
let curSlide = 0;
// 當點到底就不能再繼續translate
const maxSlide = slides.length;

// 切換功能
const goToSlide = function (slide) {
  // slidesContainer.style.transform = `translateX(50rem)`;
  // 所有slides相連
  // translateX（0%）,100%,200%,300%
  slides.forEach(function (item, index) {
    slidesContainer.style.transform = `translateX(${-50 * slide}rem)`;
  });
};
goToSlide(0);

// 創建點點
const createDots = function () {
  slides.forEach(function (item, index) {
    // 創建點點insertAdjacentHTML
    dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
  });
};
createDots();

// 指定白點點顯示
const activateDot = function (slide) {
  // 移除所有active
  document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};
activateDot(0);

// 點擊下一張功能 let curSlide = 0; const maxSlide = slides.length;
const nextSlide = function () {
  // 與slides長度減一相同時
  if (curSlide === maxSlide - 1) {
    slidesContainer.style.transition = `none`;
    curSlide = 0;
  } else {
    slidesContainer.style.transition = `transform .8s`;
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
// 點擊上一張功能
const preslide = function () {
  if (curSlide === 0) {
    slidesContainer.style.transition = `none`;
    curSlide = maxSlide - 1;
  } else {
    slidesContainer.style.transition = `transform .8s`;
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// 點擊事件
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", preslide);
// keydown事件
document.addEventListener("keydown", function (e) {
  // console.log(e);
  // if (e.key === "ArrowRight") nextSlide();
  // 簡化
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && preslide();
});

// 點擊點點切換至對應圖片
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // 讓我的slide ＝ 點點相對應的數字
    // console.log(e.target.dataset);
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
