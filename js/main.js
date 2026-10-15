// ===========================
// FIle: js/main.js
// Vintage Barbershop Project
// ===========================

// ----- DOM Elements -----
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const siteHeader = document.querySelector(".site-header");
const nav = document.getElementById("nav"); // Add in nav DOM selector
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid");
// Add new DOM elements
const heroSubtext = document.getElementById("heroSubtext");
const ctaText = document.getElementById("ctaText");

// // Add in Services Data Section
// ----- Services Data (Array of Objects) -----
const services = [
	{
		id: 1,
		title: "Classic Haircut",
		text: "Timeless cuts with modern precision tailored to your style.",
		image: "assets/images/feature-1.jpg",
		alt: "Classic haircut",
		price: 25,
		popular: true,
		details: [
			"Consultation with your barber before the cut begins.",
			"Hair sectioning and shape-up based on your preferred style.",
			"Professional clippers, trimmers, and  shears used for precision",
			"Neckline cleanup and finishing touches included.",
			"Light styling product applied for a clean final look.",
		],
	},
	{
		id: 2,
		title: "Beard Trim",
		text: "Shape and line-up your beard for a clean, sharp finish.",
		image: "assets/images/feature-4.jpeg",
		alt: "Beard trim",
		price: 15,
		popular: false,
		details: [
			"Beard assessment and shaping based on face structure.",
			"Line-up around cheeks, jawline, and neckline.",
			"Trimmers and detail tools used for crisp edges.",
			"Conditioning beard product may be applied for softness.",
			"Final symmetry check for a polished finish.",
		],
	},
	{
		id: 3,
		title: "Straight Razor Shave",
		text: "Hot towel treatment with a smooth traditional shave.",
		image: "assets/images/feature-3.jpg",
		alt: "Straight razor shave.",
		price: 30,
		popular: true,
		details: [
			"Hot towel prep to soften facial hair and open pores.",
			"Premium shaving cream or lather applied to protect the skin.",
			"Straight razor shave performed with careful detailing.",
			"Second hot towel may be used for comfort and cleanup.",
			"Aftershave or soothing skin product applied after service.",
		],
	},
	{
		id: 4,
		title: "Fade & Style",
		image: "assets/images/feature-2.jpg",
		alt: "Fade haircut",
		text: "A clean fade with finishing detail for a sharp, modern look.",
		price: 35,
		popular: false,
		details: [
			"Style consultation before clipper work begins.",
			"Fade blended to your preferred level and finish.",
			"Detailing around temples, neckline, and bear area if needed.",
			"Scissors and clipper-over-comb may be used for texture.",
			"Styling product added to complete the final look.",
		],
	},
	{
		id: 5,
		title: "Kids Cut",
		image: "assets/images/feature-5.jpg",
		alt: "Kids haircut",
		text: "Clean, comfortable haircut service for younger clients.",
		price: 20,
		popular: false,
		details: [
			"Simple consultation with child and parent if needed.",
			"Age-appropriate haricut with comfort in mind.",
			"Careful clipper and scissor work for a clean finish.",
			"Light cleanup around the neckline and ears.",
			"Styled neatly before leaving the chair.",
		],
	},
	{
		id: 6,
		title: "Head Shave",
		image: "assets/images/feature-6.jpg",
		alt: "Head shave",
		text: "Smooth head shave with classic barbershop treatment.",
		price: 28,
		popular: true,
		details: [
			"Scalp prep with warm towel treatment.",
			"Protective shave product applied before razor work.",
			"Close shave performed for a smooth finish.",
			"Scalp cleaned and checked for even consistency.",
			"Moisturizing scalp product applied after the shave.",
		],
	},
];
// ----- Navigation Data (Array of objects) -----
// add Navigation Data Section
const navLinks = [
	{ label: "Home", href: "#hero" },
	{ label: "Services", href: "#features" },
	{ label: "Book", href: "#cta" },
	{ label: "Contact", href: "#footer"},
];

// ----- Hours Data -----
// Add business hours
const businessHours = [
	{ day: "Monday", open: 9, close: 19 },
	{ day: "Tuesday", open: 9, close: 19 },
	{ day: "Wednesday", open: 9, close: 19 },
	{ day: "Thursday", open: 9, close: 19 },
	{ day: "Friday", open: 9, close: 19 },
	{ day: "Saturday", open: 10, close: 17 },
	{ day: "Sunday", open: 0, close: 0 },
];

// ----- Modal Elements -----
// Add modal elements
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");

// ----- Main Shop Object -----
const shopInfo = {
	name: "Vintage Barbershop",
	address: "123 Main St, Your City",
	phoneDisplay: "(555) 123-4567",
	phoneRaw: "5551234567",
	email: "hello@vintagebarbershop.com"
};
// ----- Open / Closed Logic -----
//add open/closed Logic
const checkIfOpen = () => {
	const now = new Date();
	const currentDay = now.getDay();
	const currentHour = now.getHours();

	let schedule;

	if (currentDay === 0) {
		schedule = businessHours[6];
	} else {
		schedule = businessHours[currentDay - 1];
	}

	if (schedule.open === 0 && schedule.close === 0) {
		updateSubtext("We are closed today. Book now for your next sharp look.");
		return;
	}

	if (currentHour >= schedule.open && currentHour < schedule.close) {
		updateSubtext(
			"We're open right now - walk-ins welcome, appointments recommended.",
		);
	}	else {
		updateSubtext(
			"We're currently closed, but you can still book your next appointment.",
		);
	}
};

// ----- Modal Logic -----
// Add Modal Logic
const openServiceModal = (serviceId) => {
	if (
		!serviceModal ||
		!serviceModalTitle ||
		!serviceModalPrice ||
		!serviceModalList
	)
		return;
	const selectedService = services.find(
		(service) => service.id === Number(serviceId),
	);
	if (!selectedService) return;
	serviceModalTitle.textContent = selectedService.title;
	serviceModalPrice.textContent = `$${selectedService.price}`;
	serviceModalList.innerHTML = selectedService.details
		.map((detail) => `<li>${detail}</li>`)
		.join("");
	serviceModal.classList.add("is-open");
	serviceModal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
};
const closeServiceModal = () => {
	if (!serviceModal) return;
	serviceModal.classList.remove("is-open");
	serviceModal.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";
}

// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
	const now = new Date();
	yearEl.textContent = now.getFullYear();
};
// Add hour formatting
const formatHour = (hour) => {
	if (hour === 0) return "Closed";
	if (hour === 12) return "12pm";
	if (hour > 12) return `${hour - 12}pm`;
	return `${hour}am`;
};
// Header Scroll
// Add scroll handling for scroll effects
const handleHeaderOnScroll = () => {
	if (!siteHeader) return;

	if (window.scrollY > 10) {
		siteHeader.classList.add("is-scrolled");
	} else {
		siteHeader.classList.remove("is-scrolled");
	}
};
// Toggle mobile menu open/close
let isMenuOpen = false;
const toggleMobileMenu = () => {
	if (!mobileMenu) return;
	if (isMenuOpen === false) {
		mobileMenu.classList.add("is-open");
		isMenuOpen = true;
	} else {
		mobileMenu.classList.remove("is-open");
		isMenuOpen = false;
	}
};
// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => {
	if (!mobileMenu) return;
	mobileMenu.classList.remove("is-open");
	isMenuOpen = false;
};
// Reusable function with parameters (practice pattern)
const updateHeadingText = (newText) => {
	if (!heading) return;
	heading.textContent = newText;
};
//Add update subtext function
const updateSubtext = (newText) => {
	if (!heroSubtext) return;
	heroSubtext.textContent = newText;
}
// ----- Event Listeners -----
// 1) Set year on page load
setCurrentYear();
// 2) Hamburger menu toggle
if (menuBtn) {
	menuBtn.addEventListener("click", () => {
		toggleMobileMenu();		
	});
}
// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) {
	mobileMenu.addEventListener("click", (event) => {
		// If they clicked on <a> inside the menu, close it
		if (event.target.tagName === "A") {
			closeMobileMenu();
		}
	});
}
// 4) CTA Button: "Book Now" (placeholder behavior)
// Update CTA button
if (ctaBtn) {
	ctaBtn.addEventListener("click", () => {
		const bookingSection = document.getElementById("cta");

		if (bookingSection) {
			bookingSection.scrollIntoView({ behavior: "smooth" });
		}

		updateHeadingText("Choose your date and time below");
	});
}
// 5) Call Button: try to use the phone numnber in the footer
// Update call btn
if (callBtn) {
	callBtn.addEventListener("click", () => {
		window.location.href = `tel:${shopInfo.phoneRaw}`;
	});
}
// Add other helper functions
if (featureGrid) {
	featureGrid.addEventListener("click", (event) => {
		const clickedButton = event.target.closest(".service-details-btn");
		if (!clickedButton) return;
		const serviceId = clickedButton.dataset.serviceId;
		openServiceModal(serviceId);
	});
}
if (serviceModalClose) {
	serviceModalClose.addEventListener("click", closeServiceModal);
}
if (serviceModalOverlay) {
	serviceModalOverlay.addEventListener("click", closeServiceModal);
}
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeServiceModal();
	}
});

// ----- Render Functions -----
//Update Render Functions
const renderFeatures = () => {
	if (!featureGrid) return;
	const servicesHTML = services
		.map((service) => {
			let badgeHTML = "";
			if (service.popular) {
				badgeHTML = `<p class="service-badge">Popular Choice</p>`;
			}	else {
				badgeHTML = `<p class="service-badge alt-badge">Barber Favorite</p>`;
			}
			return ` <article class="feature-card">
				<img src="${service.image}" alt="${service.alt}" class="feature-img" ${service.image.endsWith("feature-1.jpg") ? 'style="object-position: center 5%;"' : ""} />
				<h3 class="feature-title">${service.title}</h3>
				<p class="feature-text">${service.text}</p>
				${badgeHTML} 
				<p class="service-price">$${service.price}</p>
				<div class="service-actions">
					<button class="service-details-btn" type="button" data-service-id="${service.id}" > View Details </button>
				</div>
			</article> `;
		})
		.join("");
	featureGrid.innerHTML = servicesHTML;
};
const renderNavigation = () => {
	// Desktop Nav
	if (nav) {
		const navHTML = navLinks
			.map((link) => {
				return `<a href="${link.href}" class="nav-link"> ${link.label} </a> `;
			})
			.join("");

		nav.innerHTML = navHTML;	
	}

	// Mobile Nav
	if (mobileMenu) {
		const mobileHTML = navLinks
			.map((link) => {
				return ` <a href="${link.href}" class="mobile-link"> ${link.label} </a> `;
			})
			.join("");

		mobileMenu.innerHTML = mobileHTML;
	}
};
// Add hours render
const renderHours = () => {
	if (!hoursList) return;
	const hoursHTML = businessHours
		.map((item) => {
			if (item.open === 0 && item.close === 0) {
				return `<li>${item.day}: Closed</li>`;
			}
			return `<li>${item.day}: ${formatHour(item.open)} - ${formatHour(item.close)}</li>`;
		})
		.join("");
	hoursList.innerHTML = hoursHTML;
};
// Add contact render
const renderContactInfo = () => {
	if (phoneLink) {
		phoneLink.textContent = shopInfo.phoneDisplay;
		phoneLink.href = `tel:${shopInfo.phoneRaw}`;
	}
	if (addressLink) {
		addressLink.textContent = shopInfo.address;
		addressLink.href = "#";
	}
	if (emailLink) {
		emailLink.textContent = shopInfo.email;
		emailLink.href = `mailto:${shopInfo.email}`;
	}
};

// // Optional scroll shift effect
// const setupScrollShiftCards = () => {
//   if (!featureGrid) return;
//   let lastScrollY = window.scrollY;
//   let currentX = 0;
//   let ticking = false;
//   const getVisibleWidth = () => {
//     const parent = featureGrid.parentElement;
//     return parent ? parent.clientWidth : window.innerWidth;
//   };
//   const getMaxShift = () => {
//     return Math.max(0, featureGrid.scrollWidth - getVisibleWidth());
//   };
//   const updateCardTrack = () => {
//     const currentScrollY = window.scrollY;
//     const scrollDelta = currentScrollY - lastScrollY;
//     if (scrollDelta === 0) {
//       ticking = false;
//       return;
//     }
//     currentX -= scrollDelta * 0.5;
//     const maxShift = getMaxShift();
//     if (currentX < -maxShift) currentX = -maxShift;
//     if (currentX > 0) currentX = 0;
//     featureGrid.style.transform = `translateX(${currentX}px)`;
//     lastScrollY = currentScrollY;
//     ticking = false;
//   };
//   window.addEventListener("scroll", () => {
//     if (!ticking) {
//       window.requestAnimationFrame(updateCardTrack);
//       ticking = true;
//     }
//   });
//   window.addEventListener("resize", () => {
//     const maxShift = getMaxShift();
//     if (currentX < -maxShift) currentX = -maxShift;
//     if (currentX > 0) currentX = 0;
//     featureGrid.style.transform = `translateX(${currentX}px)`;
//   });
// };

renderFeatures(); // Call features render
renderNavigation(); // Call Navigation render
renderHours();
checkIfOpen();
renderContactInfo();