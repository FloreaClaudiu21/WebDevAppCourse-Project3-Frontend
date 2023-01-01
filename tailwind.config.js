/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				black1: "rgba(0,0,0,0.1)",
				black2: "rgba(0,0,0,0.2)",
				black3: "rgba(0,0,0,0.3)",
				black4: "rgba(0,0,0,0.4)",
				black5: "rgba(0,0,0,0.5)",
				black6: "rgba(0,0,0,0.6)",
				black7: "rgba(0,0,0,0.7)",
				black8: "rgba(0,0,0,0.8)",
			},
			backgroundImage: {
				"404BG": "url('./assets/404BG.jpg')",
			},
		},
	},
	plugins: [],
};
