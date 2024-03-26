import "./style/index.css";
import "./mocks/browser.ts";
import ReactDOM from "react-dom/client";
import App from "./views/App/App.tsx";
import { enableMockServiceWorker } from "./mocks/browser.ts";
import { CartProvider } from "./context/useCart.tsx";
import { SnackbarProvider } from "./context/useSnackbar.tsx";

enableMockServiceWorker().then(() => {
	ReactDOM.createRoot(document.getElementById("root")!).render(
		<SnackbarProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</SnackbarProvider>
	);
});
