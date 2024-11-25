import sidecarData from "./products-sidecar.json";
import * as newman from "newman";
import axios from "axios";

export default () => {
	let data = { ...sidecarData };
	let API_ADDRESS = `http://${process.env.HOST}:${process.env.PORT}`;
	let config = {
		method: "GET",
		url: `${API_ADDRESS}/category/all`,
	};

	axios.request(config)
		.then((response) => {
			if (response.data["Categories"].length == 0) {
				data.variable[0].value = API_ADDRESS;
				newman.run({
					collection: data,
					reporters: "cli"
				});
			}
		})

	return true;
};
