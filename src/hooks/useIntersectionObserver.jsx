import { useCallback, useRef } from "react";

const useIntersectionMethod = (entries) => {
	let new_entry = "";
	entries.forEach((entry) => {
		const cl = entry.target;
		if (entry.isIntersecting) {
			new_entry = cl;
		}
	});
	if (new_entry === undefined || new_entry === "") {
		return;
	}
	const nav = document.querySelector(".horizontal_menu");
	if (nav === undefined || nav === null) return;
	if (new_entry.id.includes("hero")) {
		nav.classList.add("horizontal_hide");
	} else {
		nav.classList.remove("horizontal_hide");
	}
	const links = document.querySelectorAll(".h_linkmenu");
	for (let i = 0; i < links.length; i++) {
		const kid = links[i];
		const href = kid.getAttribute("href");
		if (
			!href.includes(new_entry.id) &&
			kid.classList.contains("h_linkmenu-active")
		) {
			kid.classList.remove("h_linkmenu-active");
			kid.parentElement.style.backgroundColor = "";
		}
		if (
			href.includes(new_entry.id) &&
			!kid.classList.contains("h_linkmenu-active")
		) {
			kid.classList.add("h_linkmenu-active");
			kid.parentElement.style.backgroundColor = "#523eeb";
		}
	}
};

const useIntersectionObserver = (options, cb) => {
	const observer = useRef(null);
	return useCallback((node) => {
		if (!node) {
			if (observer.current) {
				observer.current.disconnect();
			}
			return;
		}

		observer.current = new window.IntersectionObserver(cb, options);
		observer.current.observe(node);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export { useIntersectionObserver, useIntersectionMethod };
