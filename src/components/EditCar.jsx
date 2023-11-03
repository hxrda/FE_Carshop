import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditCar({ cardata, fetchCars }) {
	//States:
	const [car, setCar] = useState({
		brand: "",
		model: "",
		color: "",
		fuel: "",
		year: "",
		price: "",
	});
	const [open, setOpen] = useState(false);

	//Functions:
	const handleClickOpen = () => {
		//console.log(cardata);
		setCar({
			brand: cardata.brand,
			model: cardata.model,
			color: cardata.color,
			fuel: cardata.fuel,
			year: cardata.year,
			price: cardata.price,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		//Incl. validation handling?
		fetch(cardata._links.car.href, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(car),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Error in edit: " + response.statusText);

				fetchCars();
			})
			.catch((err) => console.log(err));

		handleClose();
	};

	//Rendering:
	return (
		<>
			<Button size="small" onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update Car</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Brand"
						value={car.brand}
						onChange={(e) => setCar({ ...car, brand: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Model"
						value={car.model}
						onChange={(e) => setCar({ ...car, model: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Color"
						value={car.color}
						onChange={(e) => setCar({ ...car, color: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Fuel"
						value={car.fuel}
						onChange={(e) => setCar({ ...car, fuel: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Year"
						value={car.year}
						onChange={(e) => setCar({ ...car, year: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Price"
						value={car.price}
						onChange={(e) => setCar({ ...car, price: e.target.value })}
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
