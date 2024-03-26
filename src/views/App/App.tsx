import { ConnectedProducts } from "./Products.tsx";
import { CssBaseline } from "@mui/material";
import { Categories } from "./Categories.tsx";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar.tsx";
import { Fragment, useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal/CheckoutModal.tsx";
import { OrderStateModal } from "./components/OrderStateModal/OrderStateModal.tsx";
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper.tsx";

function App() {
	const [activeCategory, setActiveCategory] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");

	const [openModalState, setOpenModalState] = useState<string>("");

	return (
		<Fragment>
			<BoxWrapper
				style={{
					display: "flex",
					height: "100vh",
					flexDirection: "column",
				}}
			>
				<CssBaseline />
				<SearchAppBar
					setSearchValue={setSearchValue}
					setOpenModalState={setOpenModalState}
				/>
				<BoxWrapper
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "row",
						marginTop: "4rem",
					}}
				>
					<Categories
						setActiveCategory={setActiveCategory}
						activeCategory={activeCategory}
					/>
					<BoxWrapper
						style={{
							flex: 1,
						}}
					>
						<ConnectedProducts
							activeCategory={activeCategory}
							searchValue={searchValue}
						/>
					</BoxWrapper>
				</BoxWrapper>
			</BoxWrapper>
			<CheckoutModal
				isOpen={openModalState === "checkout"}
				onClose={() => setOpenModalState("")}
			/>
			<OrderStateModal />
		</Fragment>
	);
}

export default App;
