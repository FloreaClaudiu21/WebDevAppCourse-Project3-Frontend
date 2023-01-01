import { memo } from "react";
import Band from "./Band";
import Intro from "./Intro";
import uuid from "react-uuid";
import { Container, Stack } from "@mui/material";

const Bands = ({ bands }) => {
	return (
		<Container
			maxWidth="xl"
			className="flex flex-col justify-center md:p-4 md:pl-7 md:pr-5"
		>
			<Intro />
			<Stack className="mt-4 mb-4 gap-32">
				{bands.map((band) => {
					return (
						<Band
							key={uuid()}
							band={band}
						/>
					);
				})}
			</Stack>
		</Container>
	);
};

export default memo(Bands);
