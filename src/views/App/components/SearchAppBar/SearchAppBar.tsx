import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../../../context/useCart";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled";
import { Dispatch, SetStateAction } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import { TypographyWrapper } from "../../../../components/TypographyWrapper/TypographyWrapper";

type SearchBarProps = {
	setSearchValue: Dispatch<SetStateAction<string>>;
	setOpenModalState: Dispatch<SetStateAction<string>>;
};

export default function SearchAppBar({ setSearchValue, setOpenModalState }: SearchBarProps) {
	const { cart } = useCart();
	const { debounce } = useDebounce({ msDelay: 500 });

	return (
		<BoxWrapper
			style={{
				position: "fixed",
				width: "100vw",
				top: 0,
				left: 0,
				zIndex: 100,
			}}
		>
			<AppBar position="relative">
				<Toolbar>
					<TypographyWrapper
						variant="h6"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: {
								xs: "none",
								sm: "block",
							},
						}}
					>
						FreshCart Market
					</TypographyWrapper>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							onChange={(e) => debounce(() => setSearchValue(e.target.value))}
							placeholder="Search…"
							inputProps={{
								"aria-label": "search",
							}}
						/>
					</Search>
					<BoxWrapper
						style={{
							display: "flex",
							flexDirection: "row",
							margin: "auto 2rem",
						}}
					>
						<TypographyWrapper
							variant="h6"
							noWrap
							component="div"
							mr={2}
						>
							Total:
						</TypographyWrapper>
						<TypographyWrapper
							variant="h6"
							noWrap
							component="div"
						>
							$ {(cart.totalPrice || 0).toFixed(2)}
						</TypographyWrapper>
					</BoxWrapper>
					<Badge
						badgeContent={cart.totalItems || 0}
						color="secondary"
					>
						<IconButton
							disabled={cart.totalItems === 0}
							onClick={() => cart.totalItems > 0 && setOpenModalState("checkout")}
						>
							<ShoppingCartIcon />
						</IconButton>
					</Badge>
				</Toolbar>
			</AppBar>
		</BoxWrapper>
	);
}
