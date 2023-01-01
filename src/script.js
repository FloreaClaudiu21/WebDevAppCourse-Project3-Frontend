const HOST_URL = "https://webappcourse-project3-backend.onrender.com";

const prettier_error = (error) => {
	return error.message
		.replace("Firebase: ", "")
		.replace("auth/", "")
		.replace("(", "")
		.replace(")", "")
		.replace("-", " ")
		.replace("Error ", "");
};

const validate_text = (text) => {
	if (text.length <= 0 || text.trim() === "") {
		return false;
	}
	return true;
};

const validate_username = (username) => {
	let nameRegex = /^[a-zA-Z0-9 ]+$/;
	if (!nameRegex.test(username)) {
		return false;
	}
	return true;
};

const validate_password = (pass) => {
	if (!pass || pass.length < 5) {
		return false;
	}
	const regularExpression =
		/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	if (!regularExpression.test(pass)) {
		return false;
	}
	return true;
};

const validate_email = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export {
	HOST_URL,
	validate_text,
	validate_email,
	validate_password,
	validate_username,
	prettier_error,
};
