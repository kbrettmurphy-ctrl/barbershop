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
// // Add in Services Data Section
// ----- Services Data (Array of Objects) -----
const services = [
	{
		title: "Classic Haircut",
		text: "Timeless cuts with modern precision tailored to your style.",
		image: "assets/images/feature-1.jpg",
	},
	{
		title: "Beard Trim",
		text: "Shape and line-up your beard for a clean, sharp finish.",
		image: "assets/images/feature-2.jpg",
	},
	{
		title: "Straight Razor Shave",
		text: "Hot towel treatment with a smooth traditional shave.",
		image: "assets/images/feature-3.jpg",
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

// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
	const now = new Date();
	yearEl.textContent = now.getFullYear();
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
if (ctaBtn) {
	ctaBtn.addEventListener("click", () => {
		updateHeadingText("Booking coming next - great choice!");
	});
}
// 5) Call Button: try to use the phone numnber in the footer
if (callBtn) {
	callBtn.addEventListener("click", () => {
		// If you later set phoneLink href to tel:, this will work perfectly.
		// For now, this is a beginner-friendly placeholder.
		if (phoneLink) {
			updateHeadingText("Call us at " + phoneLink.textContent);
		} else {
			updateHeadingText("Call feature coming nextx!");
		}
	});
}
// 6) Window Listens for scroll
window.addEventListener("scroll", handleHeaderOnScroll);
// Run once on page load in case user refreshes mid-scroll
handleHeaderOnScroll();

// ----- Render Features using forEach -----
// Add render features function
const renderFeatures = () => {
	if (!featureGrid) return;
	services.forEach((service) => {
		const card = document.createElement("article");
		card.classList.add("feature-card");
		card.innerHTML = `
			<img 
				src="${service.image}" 
				alt="${service.title}" 
				class="feature-img" 
				${service.image.endsWith("feature-1.jpg")
					? 'style="object-position: center 5%;"'
					: ""}
			/>
			<h3 class="feature-title">${service.title}</h3>
			<p class="feature-text">${service.text}</p>
		`;
		featureGrid.appendChild(card);
	});
};

// ----- Render Navigation using map()
// Add Navigation render
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

// Render features with map() (teaching)
// const renderFeaturesMap = () => {
// 	const cardsHTML = services
// 		.map((service) => {
// 			return `
// 			<article class="feature-card">
// 				<img src="${service.image}" alt="${service.title}" class="feature-img" />
// 				<h3 class="feature-title">${servcice.title}</h3>
// 				<p class="feature-text">${service.text}</p>
// 			</article>
// 		`;
// 		})
// 		.join(""); // Join the array of strings into a single string
// 	featureGrid.innerHTML = cardsHTML;
// };

renderFeatures(); // Call features render
renderNavigation(); // Call Navigation render