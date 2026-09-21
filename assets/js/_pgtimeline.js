function pageTimeline() {
	if($('.section-timeline').length > 0){
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};
	}

	var winWT = window.innerWidth || document.documentElement.clientWidth;
	var winHT = window.innerHeight || document.documentElement.clientHeight;

	document.querySelectorAll(".tlVideo video").forEach(function (video) {
		if (winWT > 769) {
			video.src = video.getAttribute("data-video-desktop");
			video.poster = video.getAttribute("data-poster-desktop");
		} else {
			video.src = video.getAttribute("data-video-mobile");
			video.poster = video.getAttribute("data-poster-mobile");
		}
	});

	if (winWT <= 1080) {

		const dropdownHeader = document.querySelector(".milestone-header");
		const dropdownContent = document.querySelector(".milestone-nav ul");
		const dropdownItems = document.querySelectorAll(".milestone-nav ul li");
		const milestoneNavHolder = document.querySelector('.milestone-nav-holder');
		const offsetPosition = milestoneNavHolder.offsetTop;
		const offsetFromTop = 120;
	
		// Handle sticky navigation
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > offsetPosition) {
				milestoneNavHolder.classList.add('fixed');
			} else {
				milestoneNavHolder.classList.remove('fixed');
			}
		});
	
		// Handle dropdown functionality
		dropdownHeader.addEventListener("click", function () {
			dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
			dropdownHeader.classList.toggle("active");
		});
	
		dropdownItems.forEach(item => {
			item.addEventListener("click", function () {
				dropdownItems.forEach(i => i.classList.remove('active'));
				item.classList.add('active');
	
				const selectedText = item.querySelector('a').textContent;
				dropdownHeader.textContent = selectedText;
	
				dropdownContent.style.display = "none";
				dropdownHeader.classList.remove("active");
			});
		});
	
		// Close dropdown when clicking outside
		document.addEventListener("click", function (e) {
			if (!dropdownHeader.contains(e.target) && !dropdownContent.contains(e.target)) {
				dropdownContent.style.display = "none";
				dropdownHeader.classList.remove("active");
			}
		});
	
		// Smooth scrolling to section on nav click
		const navLinks = document.querySelectorAll('.milestone-nav a');
		const milestoneDivs = document.querySelectorAll('.milestone-div');
	
		navLinks.forEach(link => {
			link.addEventListener('click', function (event) {
				event.preventDefault();
	
				const targetId = this.getAttribute('href').substring(1);
				const targetSection = document.getElementById(targetId);
	
				if (targetSection) {
					const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
					const offsetPosition = elementPosition - offsetFromTop;
	
					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			});
		});
	
		// Highlight nav item when section reaches 70% of viewport height
		function highlightCurrentNav() {
			const triggerHeight = window.innerHeight * 0.7; // 70% of viewport height
	
			milestoneDivs.forEach((section, index) => {
				const sectionTop = section.getBoundingClientRect().top;
				const sectionBottom = section.getBoundingClientRect().bottom;
	
				// Check if the section's top is within 70% of viewport height
				if (sectionTop <= triggerHeight && sectionBottom >= triggerHeight) {
					dropdownItems.forEach(item => item.classList.remove('active'));
					dropdownItems[index].classList.add('active');
	
					const selectedText = dropdownItems[index].querySelector('a').innerHTML;
					dropdownHeader.innerHTML = selectedText;
				}
			});
		}
	
		window.addEventListener('scroll', highlightCurrentNav);
	
	}
		

	if (winWT >= 1081) {

		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

		ScrollTrigger.defaults({
			toggleActions: "reverse pause",
			invalidateOnRefresh: true,
			scrub: false,
		});

		// create the smooth scroller
		let smoother = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			normalizeScroll: true,
			ignoreMobileResize: false,
		});

		/* 1st */
		$('.nextPager a[href^="#"]').click(function (event) {
			var id = $(this).attr("href");
			var offset = 0;
			var target = $(id).offset().top - offset;
			$('html, body').animate({ scrollTop: target }, 1000, function () {
				//ScrollTrigger.getAll().forEach(trigger => trigger.enable());
			});
			event.preventDefault();
		});

		imagesLoaded(document.querySelector('.section-timeline'), function () {
			ScrollTrigger.create({
				trigger: '.section-timeline',
				start: "top top",
				end: "bottom bottom",
				pin: '.milestone-nav-holder',
				pinSpacing: false,
				invalidateOnRefresh: true,
				markers: false
			});
			ScrollTrigger.refresh();
		});

		document.querySelectorAll('.milestone-div').forEach((milestone, index, milestones) => {
			const yearNavs = milestone.querySelector('.year-nav');
			const yearNavUl = milestone.querySelector('.year-nav ul');
			const yearContentPan = milestone.querySelector('.year-content-pan');
			const milestoneIntroDivs = milestone.querySelector('.milestone-intro-div');
			const nextMilestone = milestones[index];
			const prevMilestone = milestones[index - 1];
			const nextTimelineContent = nextMilestone ? nextMilestone.querySelector('.timeline-content') : null;
			const prevTimelineContent = prevMilestone ? prevMilestone.querySelector('.timeline-content') : null;

			let isIntroOpened = false;
			let isScrolling = false;

			function scrollToMilestone(targetMilestone) {
				if (!isScrolling && targetMilestone) {
					isScrolling = true;
					gsap.to(window, {
						scrollTo: { y: targetMilestone, offsetY: 0 },
						duration: 1,
						ease: 'power2.inOut',
						onComplete: () => { isScrolling = false; }
					});
				}
			}

			document.querySelectorAll('.milestone-nav a').forEach(milestonelink => {
				milestonelink.addEventListener('click', (e) => {
					e.preventDefault();
					const targetId = e.currentTarget.getAttribute('href').replace('#', '');
					const targetElement = document.getElementById(targetId);
					//const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
					const targetPosition = targetElement.offsetTop;

					if (!targetElement) return;

					gsap.to(window, {
						scrollTo: { y: targetPosition },
						duration: 1,
						ease: 'power2.out',
						onComplete: () => ScrollTrigger.refresh() // Refresh after scroll animation
					});
				});
			});

			function highlightMilestoneNav(milestone) {
				const milestoneId = milestone.id;
				const milestoneNavItems = document.querySelectorAll('.milestone-nav ul li');

				milestoneNavItems.forEach((mileNavItem, index) => {
					const mileAnchorLink = mileNavItem.querySelector('a');
					const mileName = mileNavItem.getAttribute('data-mileName');
					const href = mileAnchorLink ? mileAnchorLink.getAttribute('href') : '';

					if (mileAnchorLink && mileAnchorLink.getAttribute('href') === `#${milestoneId}`) {
						mileNavItem.classList.add('active');
					} else {
						mileNavItem.classList.remove('active');
					}
				});
			}

			/* milestone.querySelectorAll('.milestone-intro').forEach(milestoneIntro => {
				ScrollTrigger.create({
					trigger: milestoneIntro,
					start: "top bottom",
					end: "bottom bottom",
					pinSpacing: false,
					onEnter: () => {
						openMilestoneIntro(milestone);
						//scrollToMilestone(nextMilestone);
						
						if (nextMilestone && !isScrolling) {
							isScrolling = true;
							gsap.to(window, {
								scrollTo: { y: nextMilestone, offsetY: 0 },
								duration: 1,
								ease: 'power2.inOut',
								onComplete: () => {
									isScrolling = false;
								}
							});
						}
					},
					onEnterBack: () => {
						//scrollToMilestone(nextMilestone);

						if (nextMilestone && !isScrolling) {
							isScrolling = true;
							gsap.to(window, {
								scrollTo: { y: nextMilestone[index - 1], offsetY: 0 },
								duration: 1,
								ease: 'power2.inOut',
								onComplete: () => {
									isScrolling = false;
								}
							});
						}
					}
				});
			}); */

			milestone.querySelectorAll('.timeline-content').forEach(timelinecontent => {
				const yearnavholder = timelinecontent.querySelector('.year-nav-holder');
				const bgmileImgPan = timelinecontent.querySelector('.bgmileImgPan');

				ScrollTrigger.create({
					trigger: timelinecontent,
					start: "top top",
					end: "bottom bottom",
					pin: yearnavholder,
					pinSpacing: false
				});

				ScrollTrigger.create({
					trigger: timelinecontent,
					start: "top top",
					end: "bottom bottom",
					pin: bgmileImgPan,
					pinSpacing: false
				});

				/* ScrollTrigger.create({
					trigger: timelinecontent,
					start: "top bottom",
					end: "bottom bottom",
					pinSpacing: false,
					onEnter: () => {
						if (nextTimelineContent && !isScrolling) {
							isScrolling = true;
							gsap.to(window, {
								scrollTo: { y: nextTimelineContent, offsetY: 0 },
								duration: 1,
								ease: 'power2.inOut',
								onComplete: () => {
									isScrolling = false;
								}
							});
						}
					}
				}); */
			});

			ScrollTrigger.create({
				trigger: milestone,
				start: 'top bottom',
				end: 'bottom bottom',
				pinSpacing: false,
				markers: false,
				scrub: 1,
				onEnter: () => {
					highlightMilestoneNav(milestone);
				},
				onEnterBack: () => {
					highlightMilestoneNav(milestone);
				}
			});

			milestone.querySelectorAll('.year-content').forEach(yearContent => {
				const yearNum = yearContent.querySelector('.year-num');
				const yearTitle = yearContent.querySelector('.year-title');
				const everyfirstYearContentDiv = yearContent.querySelector('.year-content-div');

				const divHeight = everyfirstYearContentDiv.offsetHeight;

				if (yearNum && yearTitle) {
					const li = document.createElement('li');
					const yearAnchorLink = document.createElement('a');
					yearAnchorLink.href = yearNum.dataset.yeartarget;

					const numSpan = document.createElement('span');
					numSpan.className = 'year-num';
					numSpan.textContent = yearNum.textContent;

					const titleSpan = document.createElement('span');
					titleSpan.className = 'year-title';
					titleSpan.textContent = yearTitle.textContent;

					yearAnchorLink.append(numSpan, titleSpan);
					li.appendChild(yearAnchorLink);
					yearNavUl.appendChild(li);

					yearAnchorLink.addEventListener('click', (e) => {
						const targetPosition = everyfirstYearContentDiv.getBoundingClientRect().top + window.scrollY;
						const windowHeight = window.innerHeight;
						const verticalCenterPosition = targetPosition - (windowHeight / 2) + (divHeight / 2);
						gsap.to(window, {
							scrollTo: verticalCenterPosition,
							duration: 1,
							ease: 'power2.out'
						});
						e.preventDefault();
					});

					ScrollTrigger.create({
						trigger: yearContent,
						start: 'top center',
						end: 'bottom center',
						markers: false,
						pinSpacing: false,
						//scrub: 1,
						toggleClass: { targets: li, className: 'active' },

						onEnter: () => {
							highlightMilestoneNav(milestone);
							//gsap.to(yearNavUl, { marginTop: "-=65px", duration: 0.1, ease: 'power2.out' });

							// const activeLi = yearNavUl.querySelector('.active');
							// const activeLiHeight = activeLi.offsetHeight / 2;
							// gsap.to(yearNavUl, { marginTop: `-=${activeLiHeight}px`, duration: 0.1, ease: 'power2.out'});
							
							const yearNavHeight = yearNavUl.offsetHeight;
							const liCount = yearNavUl.querySelectorAll('li').length;
							const dividedHeight = yearNavHeight / liCount;
							const currentMarginTop = parseFloat(window.getComputedStyle(yearNavUl).marginTop);
							const newMarginTop = currentMarginTop - dividedHeight;
					
							gsap.to(yearNavUl, { marginTop: `${newMarginTop}px`, duration: 0.1, ease: 'power2.out' });
						},
					
						onLeaveBack: () => {
							//gsap.to(yearNavUl, { marginTop: "+=65px", duration: 0.1, ease: 'power2.out' });

							// const activeLi = yearNavUl.querySelector('.active');
							// const activeLiHeight = activeLi.offsetHeight / 2;
							// gsap.to(yearNavUl, { marginTop: `-=${activeLiHeight}px`, duration: 0.1, ease: 'power2.out'});

							const yearNavHeight = yearNavUl.offsetHeight;
							const liCount = yearNavUl.querySelectorAll('li').length;
							const dividedHeight = yearNavHeight / liCount;
							const currentMarginTop = parseFloat(window.getComputedStyle(yearNavUl).marginTop);
							const newMarginTop = currentMarginTop + dividedHeight;
				
							gsap.to(yearNavUl, { marginTop: `${newMarginTop}px`, duration: 0.1, ease: 'power2.out' });
						}
					});
				}
			});

			ScrollTrigger.create({
				trigger: yearContentPan,
				start: "top bottom",
				end: "bottom bottom",
				pinSpacing: false,
				markers: false,
				scrub: 1,
				onEnter: () => {
					document.querySelectorAll('.year-nav').forEach(yearNav => yearNav.classList.remove('active'));
					yearNavs.classList.add('active');
					yearNavUl.style.marginTop = "0";
				},
				onEnterBack: () => {
					document.querySelectorAll('.year-nav').forEach(yearNav => yearNav.classList.remove('active'));
					yearNavs.classList.add('active');
					//yearNavUl.style.marginTop = "0";
				}
			});

			function openMilestoneIntro(milestone) {
				return tl = gsap.timeline()
					.fromTo('.milestone-intro-text', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
				isIntroOpened = true;
				console.log("Intro Opened");
			}
		});

	}
}

