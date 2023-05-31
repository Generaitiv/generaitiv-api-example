import { Heading, Text, Box } from "@chakra-ui/react";
import { AutoForm } from "@saas-ui/react";
import { zodForm } from "@saas-ui/forms/zod";
import * as z from "zod";

const Start = ({ getUserInfoAndCollections }) => {
  const schema = z.object({
    apiKey: z.string().min(1).describe("API Key"),
  });

  return (
    <>
      <Box>
        <Heading>Info</Heading>
        This is an example application for how to work with the generaitiv.xyz
        api
        <Text pt="5">Enter Your API key below to get started</Text>
      </Box>
      <AutoForm
        py="5"
        maxW="500px"
        w="100%"
        defaultValues={{
          apiKey: "",
        }}
        onSubmit={(values) => {
          getUserInfoAndCollections(values.apiKey);
        }}
        submitProps="Save post"
        {...zodForm(schema)}
      />
    </>
  );
};

export default Start;
