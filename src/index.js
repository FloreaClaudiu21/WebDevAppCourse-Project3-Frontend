import "./index.css";
import App from "./components/App";
import Page404 from "./components/404/Page404";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import MyAccount from "./components/myaccount/MyAccount";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Page404 />,
		children: [
			{
				path: "myaccount",
				element: <MyAccount />,
			},
		],
	},
]);

const firebaseConfig = {
	apiKey: "AIzaSyBfTP5EugnmXROo497o8CMDqViiFtZW74o",
	authDomain: "project3web-28628.firebaseapp.com",
	projectId: "project3web-28628",
	storageBucket: "project3web-28628.appspot.com",
	messagingSenderId: "1047303229094",
	appId: "1:1047303229094:web:4d190a0a9cc9f4db8c2e67",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<RouterProvider router={router} />
	</FirebaseAppProvider>
);
