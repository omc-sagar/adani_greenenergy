function fnbannerSlider() {

  let data = [];
  var BannerItemId = document.getElementById("spotlight-banner-home").getAttribute("data-itemid");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/handlers/adaniv1/get-spotlights.ashx?itemid="+BannerItemId, true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText); // Parse JSON data
        console.log("Data loaded successfully:", data);

        document.getElementById("bannerFirstTitle").innerHTML = data[0].title;
  


if(data[0].bannerType != "vid")
  {
    if(data[0].ctaText  == "")
    {
      document.getElementById("bannerFirstCta").innerHTML = "";
  
    }
    else{
      document.getElementById("bannerFirstCta").innerHTML = "<div class='cta'><a href='"+ data[0].ctaUrl+"'>"+ data[0].ctaText +"</a></div>";
  
    }
  
  }
  else{
    document.getElementById("bannerFirstCta").innerHTML = "<div class='cta'><a class='watch-btn open-video-btn' data-video-src='"+data[0].bigVideoUrl +"' href='javaScript:void()'>Watch Now</a></div>";
  
  }
        

      } else {
        console.error("Error loading data. Status:", xhr.status);
      }
    }
  };
  
  xhr.onerror = function() {
    console.error("Request failed");
  };
  
  xhr.send();
  
setTimeout(function(){
	function pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
}



  const _ = (id)=>document.getElementById(id)

const cards = data.map((i, index)=>`

<div class="card" id="card${index}" style="background-image:url(${i.image})">
	${i.bannerType === 'vid' ? `<div class="video-box">

	<video width="320" height="240" loop muted>
  <source src="${i.videoUrl}" type="video/mp4">
 
		Your browser does not support the video tag.
</video>

	</div> `: ''}
	

	</div>`).join('')







const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">

<div class="content-start"></div>

<div class="content-place">${i.place}</div>

<div class="content-title-1">${i.title}</div>

<div class="content-title-2">${i.title2}</div>



</div>`).join('');





const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')

_('demo').innerHTML =  cards //+ cardContents

//_('slide-numbers').innerHTML =  sildeNumbers





const range = (n) =>

  Array(n)

    .fill(0)

    .map((i, j) => i + j);

const set = gsap.set;



function getCard(index) {

  return `#card${index}`;

}

function getCardContent(index) {

  return `#card-content-${index}`;

}

function getSliderItem(index) {

  return `#slide-item-${index}`;

}



function animate(target, duration, properties) {

  return new Promise((resolve) => {

    gsap.to(target, {

      ...properties,

      duration: duration,

      onComplete: resolve,

    });

  });

}

let order = Array.from({ length: data.length }, (_, index) => index);
console.log(order);

let detailsEven = true;



let offsetTop = 200;

let offsetLeft = 700;

let cardWidth = 180;

let cardHeight = 260;

let gap = 20;

let numberSize = 50;

const ease = "sine.inOut";



function init() {

	document.addEventListener('DOMContentLoaded', function() {
  const demoElement = document.getElementById('demo');
  if (demoElement) {
    demoElement.click();
  }
});


  const [active, ...rest] = order;

  const detailsActive = detailsEven ? "#details-even" : "#details-odd";

  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

  const { innerHeight: height, innerWidth: width } = window;

  offsetTop = height - 410;

  offsetLeft = width - 730;



  gsap.set("#pagination", {

    top: offsetTop + 330,

    left: offsetLeft,

    y: 200,

    opacity: 0,

    zIndex: 60,

  });

  //gsap.set("nav", { y: -200, opacity: 0 });



  gsap.set(getCard(active), {

    x: 0,

    y: 0,

    width: window.innerWidth,

    height: window.innerHeight,

  });

  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });

  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });

  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });

  gsap.set(`${detailsInactive} .text`, { y: 100 });

  gsap.set(`${detailsInactive} .title-1`, { y: 100 });

  gsap.set(`${detailsInactive} .title-2`, { y: 100 });

  gsap.set(`${detailsInactive} .desc`, { y: 50 });

  gsap.set(`${detailsInactive} .cta-box`, { y: 60 });



  gsap.set(".progress-sub-foreground", {

    width: 500 * (1 / order.length) * (active + 1),

  });



  rest.forEach((i, index) => {

    gsap.set(getCard(i), {

      x: offsetLeft + 400 + index * (cardWidth + gap),

      y: offsetTop,

      width: cardWidth,

      height: cardHeight,

      zIndex: 30,

      borderRadius: 0,

    });

    gsap.set(getCardContent(i), {

      x: offsetLeft + 400 + index * (cardWidth + gap),

      zIndex: 40,

      y: offsetTop + cardHeight - 100,

    });

    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });

  });



  gsap.set(".indicator", { x: -window.innerWidth });



  const startDelay = 0.5;



  gsap.to(".cover", {

    x: width + 400,

    delay: 0.5,

    ease,

    onComplete: () => {

      setTimeout(() => {

        loop();  // comment this line for stop autplay

      }, 100);  // slider time set

    },

  });

  rest.forEach((i, index) => {

    gsap.to(getCard(i), {

      x: offsetLeft + index * (cardWidth + gap),

      zIndex: 30,

      delay: 0.05 * index,

      ease,

      delay: startDelay,

    });

    gsap.to(getCardContent(i), {

      x: offsetLeft + index * (cardWidth + gap),

      zIndex: 40,

      delay: 0.05 * index,

      ease,

      delay: startDelay,

    });

  });

  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });

  //gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });

  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

}



let clicks = 0;



function step() {

  return new Promise((resolve) => {

    order.push(order.shift());

    detailsEven = !detailsEven;



    const detailsActive = detailsEven ? "#details-even" : "#details-odd";

    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    if(data[0].bannerType != "vid")
      {
        if(data[0].ctaText  == "")
        {
          document.getElementById("bannerFirstCta").innerHTML = "";
      
        }
        else{
          document.getElementById("bannerFirstCta").innerHTML = "<div class='cta'><a href='"+ data[0].ctaUrl+"'>"+ data[0].ctaText +"</a></div>";
      
        }
      
      }
      else{
        document.getElementById("bannerFirstCta").innerHTML = "<div class='cta'><a class='watch-btn open-video-btn' data-video-src='"+data[0].bigVideoUrl +"' href='javaScript:void()'>Watch Now</a></div>";
      
      }

if(data[order[0]].bannerType != "vid")
{
  if(data[order[0]].ctaText  == "")
  {
    document.querySelector(`${detailsActive} .cta-box`).innerHTML ="";

  }
  else{
    document.querySelector(`${detailsActive} .cta-box`).innerHTML = "<div class='cta'><a href='"+ data[order[0]].ctaUrl+"'>"+ data[order[0]].ctaText +"</a></div>";

  }

}
else{
  document.querySelector(`${detailsActive} .cta-box`).innerHTML = "<div class='cta'><a class='watch-btn open-video-btn' data-video-src='"+data[order[0]].bigVideoUrl +"' href='javaScript:void()'>Watch Now</a></div>";

}



    document.querySelector(`${detailsActive} .title-1`).innerHTML =

      data[order[0]].title;

  //  document.querySelector(`${detailsActive} .title-2`).textContent =

  //    data[order[0]].title2;

    document.querySelector(`${detailsActive} .desc`).textContent =

      data[order[0]].description;



    gsap.set(detailsActive, { zIndex: 22 });

    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });

    gsap.to(`${detailsActive} .text`, {

      y: 0,

      delay: 0.1,

      duration: 0.7,

      ease,

    });

    gsap.to(`${detailsActive} .title-1`, {

      y: 0,

      delay: 0.15,

      duration: 1.2,

      ease,

    });

    gsap.to(`${detailsActive} .title-2`, {

      y: 0,

      delay: 0.15,

      duration: 0.7,

      ease,

    });

    gsap.to(`${detailsActive} .desc`, {

      y: 0,

      delay: 0.3,

      duration: 0.4,

      ease,

    });

    gsap.to(`${detailsActive} .cta-box`, {

      y: 0,

      delay: 0.56,

      duration: 0.9,

      onComplete: resolve,

      ease,

    });

    gsap.set(detailsInactive, { zIndex: 12 });



    const [active, ...rest] = order;

    const prv = rest[rest.length - 1];



    gsap.set(getCard(prv), { zIndex: 10 });

    gsap.set(getCard(active), { zIndex: 20 });

    gsap.to(getCard(prv), { scale: 1.5, ease });



    gsap.to(getCardContent(active), {

      y: offsetTop + cardHeight - 10,

      opacity: 0,

      duration: 0.3,

      ease,

    });

    gsap.to(getSliderItem(active), { x: 0, ease });

    gsap.to(getSliderItem(prv), { x: -numberSize, ease });

    gsap.to(".progress-sub-foreground", {

      width: 500 * (1 / order.length) * (active + 1),

      ease,

    });



    gsap.to(getCard(active), {

      x: 0,

      y: 0,

      ease,

      width: window.innerWidth,

      height: window.innerHeight,

      borderRadius: 0,

      onComplete: () => {

      	console.log("call back"+ getCard(active));

      	var CardSelector = getCard(active);

// Get all elements with the class 'video-box'
const videoBoxes = document.querySelectorAll(".video-box");

// Check if any elements with the class 'video-box' exist
if (videoBoxes.length > 0) {
  // Remove the 'active' class from all elements with the class 'video-box'
  videoBoxes.forEach(function(element) {
    element.classList.remove("active");
  });
}

// Select the specific 'video-box' element within the 'CardSelector'
const selectedVideoBox = document.querySelector(CardSelector + " .video-box");

// Check if the selected 'video-box' element exists
if (selectedVideoBox) {
  // Add the 'active' class to the specific 'video-box' element within the 'CardSelector'
  selectedVideoBox.classList.add("active");
}


      	pauseAllVideos();

// Find the parent element
const parentElement = document.querySelector(CardSelector+ " .video-box");

// Check if the parent element exists
if (parentElement) {
  // Find the video element within the parent element
  const videoElement = parentElement.querySelector("video");

  // Check if the video element exists and play the video
  if (videoElement) {
    videoElement.play(); // play particluer video
  }
}
//adding thumb class on all thumb and remove thumb from selcted one

const allThumbSelector = document.querySelectorAll(".card");
const bigThumbSelector = document.querySelector(CardSelector);
if(allThumbSelector.length > 0)
{
 // document.getElementsByClassName("card").classList.add("cardThumb");
 allThumbSelector.forEach(function(element){
    element.classList.add('cardThumb')
});
  bigThumbSelector.classList.remove("cardThumb");
}
// thumb hide and show 
setTimeout(function(){ 
  gsap.to('.cardThumb', { opacity: 0, duration: 0.5 });
}, 1000);

setTimeout(function(){ 
  gsap.to('.cardThumb', { opacity: 1, duration: 0.5 });
},5000);



        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);

        gsap.set(getCard(prv), {

          x: xNew,

          y: offsetTop,

          width: cardWidth,

          height: cardHeight,

          zIndex: 30,

          borderRadius: 0,

          scale: 1,

        });



        gsap.set(getCardContent(prv), {

          x: xNew,

          y: offsetTop + cardHeight - 100,

          opacity: 1,

          zIndex: 40,

        });

        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });



        gsap.set(detailsInactive, { opacity: 0 });

        gsap.set(`${detailsInactive} .text`, { y: 100 });

        gsap.set(`${detailsInactive} .title-1`, { y: 100 });

        gsap.set(`${detailsInactive} .title-2`, { y: 100 });

        gsap.set(`${detailsInactive} .desc`, { y: 50 });

        gsap.set(`${detailsInactive} .cta-box`, { y: 60 });

        clicks -= 1;

        if (clicks > 0) {

          step();

        }

      },

    });



    rest.forEach((i, index) => {

      if (i !== prv) {

        const xNew = offsetLeft + index * (cardWidth + gap);

        gsap.set(getCard(i), { zIndex: 30 });

        gsap.to(getCard(i), {

          x: xNew,

          y: offsetTop,

          width: cardWidth,

          height: cardHeight,

          ease,

          delay: 0.1 * (index + 1),

        });



        gsap.to(getCardContent(i), {

          x: xNew,

          y: offsetTop + cardHeight - 100,

          opacity: 1,

          zIndex: 40,

          ease,

          delay: 0.1 * (index + 1),

        });

        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });

      }

    });

  });

}



async function loop() {

  await animate(".indicator", 6, { x: 0 });

 // await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });

  set(".indicator", { x: -window.innerWidth });

  await step();

  loop();

}



async function loadImage(src) {

  return new Promise((resolve, reject) => {

    let img = new Image();

    img.onload = () => resolve(img);

    img.onerror = reject;

    img.src = src;

  });

}



async function loadImages() {

  const promises = data.map(({ image }) => loadImage(image));

  return Promise.all(promises);

}



async function start() {

  try {

    await loadImages();

    init();

  } catch (error) {

    console.error("One or more images failed to load", error);

  }

}

const leftArrow = document.querySelector(".arrow-left");

const rightArrow = document.querySelector(".arrow-right");



leftArrow.addEventListener("click", () => {

  clicks++;

  step();

});



rightArrow.addEventListener("click", () => {

  clicks--;

  step();

});

start();  
},1000)

}
