import "./style/index.css";
import "./mocks/browser.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App/App.tsx";
import { enableMockServiceWorker } from "./mocks/browser.ts";

enableMockServiceWorker().then(() => {
	ReactDOM.createRoot(document.getElementById("root")!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});
