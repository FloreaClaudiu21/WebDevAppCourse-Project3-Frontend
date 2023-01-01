import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Info from "../../../assets/infoIMG.png";
import {
	useIntersectionMethod,
	useIntersectionObserver,
} from "../../../hooks/useIntersectionObserver";

const Intro = () => {
	const cbRef = useIntersectionObserver(
		{ threshold: 0, root: null, rootMargin: "-300px" },
		useIntersectionMethod
	);
	return (
		<Stack
			id="whats"
			ref={cbRef}
			className="justify-center place-items-center mb-20"
		>
			<img
				alt=""
				className="w-full min-h-[200px] max-h-80 max-w-[640px] object-fill"
				src={Info}
			/>
			<Typography className="text-base text-center font-bold p-3 text-[#b83a3d] decoration-dotted">
				What Is Rock Music?
			</Typography>
			<hr />
			<div className="p-2 bg-black7 rounded-md">
				<Typography className="indent-8 text-[rgb(252,240,219)]">
					Rock music is a broad genre of popular music that originated as “rock
					and roll” in the United States in the late 1940s and early 1940s
					1950s, becoming a range of different styles by the mid-1950s 1960s and
					later, especially in the United States and Great Britain. their has
					its roots in 1940s and 1950s rock and roll, a style that has drawn
					directly from the blues and rhythm and blues genres of music
					African-American and country music. Rock music originated, from also
					from many other genres such as electric blues and folk, and
					incorporated influences from jazz, classical and other styles musical.
					For instrumentation, rock focused on the guitar electric, usually as
					part of a rock group with electric bass, drums and one or more
					singers. Usually rock is based music on songs with the 4 4 time
					signature using a verse-chorus form, but the genre has become
					extremely diverse. Just like pop music, the lyrics often emphasizes
					romantic love, but also addresses a large variety of other themes that
					are frequently social or political.
					<br />
					The rock bands that I will present are:
					<br />
				</Typography>
				<ol className="list-inside list-disc text-[rgb(252,240,219)]">
					<li>Queen</li>
					<li>AC/DC</li>
					<li>Red Hot Chili Peppers</li>
					<li>The Beatles</li>
					<li>U2</li>
				</ol>
			</div>
		</Stack>
	);
};

export default Intro;
