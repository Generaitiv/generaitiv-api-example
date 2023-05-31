import { Heading, Box, Link } from "@chakra-ui/react";

const Final = ({ slug, tokenId }) => (
  <Box>
    <Heading>Congratulations!</Heading>
    Your token is complete and available{" "}
    <Link color="blue.400" href={`https://gai.gg/c/${slug}/${tokenId}`}>
      here
    </Link>
  </Box>
);
export default Final;
