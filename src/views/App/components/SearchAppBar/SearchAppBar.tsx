import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../../../context/useCart";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled";

export default function SearchAppBar() {
	const { cart } = useCart();

	return (
		<Box>
			<AppBar position="relative">
				<Toolbar>
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
						<ShoppingCartIcon />
					</Badge>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
