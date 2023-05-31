import {
  Heading,
  Box,
  Avatar,
  HStack,
  Button,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react";
import { AutoForm } from "@saas-ui/react";
import { zodForm } from "@saas-ui/forms/zod";
import * as z from "zod";

const NewToken = ({ collection, file, setFile, createNewToken }) => {
  const tokenSchema = z.object({
    name: z.string().min(1).describe("Name"),
    description: z.string().min(1).describe("Description"),
    amount: z.string().min(1).describe("Number of editions"),
  });
  return (
    <>
      <Box>
        <Heading>Create Token in: </Heading>
        <HStack py="5">
          <Avatar src={collection?.image} />
          <Heading>{collection?.name}</Heading>
        </HStack>
        Description: {collection?.description}
      </Box>
      <Box pt="10">
        <Button>
          <label htmlFor="file">{file?.name || "Upload File"}</label>
        </Button>
      </Box>
      <VisuallyHidden>
        <Input
          name="file"
          id="file"
          maxW="500px"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </VisuallyHidden>
      <AutoForm
        py="5"
        maxW="500px"
        w="100%"
        defaultValues={{
          title: "",
          description: "",
          amount: "1",
        }}
        onSubmit={(values) => {
          createNewToken(values);
        }}
        {...zodForm(tokenSchema)}
      />
    </>
  );
};

export default NewToken;
