import { Heading, Box, Avatar, HStack, Button } from "@chakra-ui/react";
import { List } from "@saas-ui/react";
import { STEPS } from "../App";

const SelectCollection = ({ user, collections, setSlug, setStep }) => {
  return (
    <>
      <Box>
        <HStack py="5">
          <Avatar src={user?.image} />
          <Heading>{user?.username || user?.address}</Heading>
        </HStack>
        Pick the collection you would like to add a token to
      </Box>
      <List
        items={collections?.map((collection) => ({
          icon: <Avatar size="sm" src={collection?.image} />,
          primary: collection?.name,
          secondary: collection?.description,
          action: (
            <Button
              onClick={() => {
                setSlug(collection?.slug);
                setStep(STEPS.TOKEN_FORM);
              }}
            >
              Pick
            </Button>
          ),
        }))}
      />
    </>
  );
};
export default SelectCollection;
