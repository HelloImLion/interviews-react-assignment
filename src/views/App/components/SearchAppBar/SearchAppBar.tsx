import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../../../context/useCart";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled";
import { Dispatch, SetStateAction } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";

type SearchBarProps = {
	setSearchValue: Dispatch<SetStateAction<string>>;
	setOpenModalState: Dispatch<SetStateAction<string>>;
};

export default function SearchAppBar({ setSearchValue, setOpenModalState }: SearchBarProps) {
	const { cart } = useCart();
	const { debounce } = useDebounce({ msDelay: 500 });

	return (
		<Box>
			<AppBar position="relative">
				<Toolbar>
					<Box sx={{ maxWidth: 0, maxHeight: 0, overflow: "hidden" }}></Box>
					<Typography
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
					</Typography>
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
					<Box
						display="flex"
						flexDirection="row"
						mx={2}
					>
						<Typography
							variant="h6"
							noWrap
							component="div"
							mr={2}
						>
							Total:
						</Typography>
						<Typography
							variant="h6"
							noWrap
							component="div"
						>
							$ {(cart.totalPrice || 0).toFixed(2)}
						</Typography>
					</Box>
					<Badge
						badgeContent={cart.totalItems || 0}
						color="secondary"
					>
						<IconButton onClick={() => setOpenModalState("checkout")}>
							<ShoppingCartIcon />
						</IconButton>
					</Badge>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
