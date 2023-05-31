import {
  Heading,
  Box,
  Avatar,
  HStack,
  Button,
  Image,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react";
import { AutoForm, List } from "@saas-ui/react";
import { zodForm } from "@saas-ui/forms/zod";
import * as z from "zod";
import { AppShell } from "@saas-ui/app-shell";
import { useState, useCallback } from "react";
import { request } from "./utils";
import Sidebar from "./pages/Sidebar";
import Start from "./pages/Start";
import SelectCollection from "./pages/SelectCollection";
import Final from "./pages/Final";
import NewToken from "./pages/NewToken";

export const STEPS = {
  LOADING: "LOADING",
  START: "START",
  COLLECTIONS: "COLLECTIONS",
  TOKEN_FORM: "TOKEN_FORM",
  COMPLETE: "COMPLETE",
};

const App = () => {
  const [user, setUser] = useState("");
  const [apiKey, setAPIKey] = useState("");
  const [collections, setCollections] = useState([]);
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState(null);
  const [tokenId, setTokenId] = useState("");

  const [step, setStep] = useState(STEPS.START);

  const getUserInfoAndCollections = useCallback((apiKey) => {
    const fetchAll = async () => {
      const responseUser = await request(".netlify/functions/user", {
        headers: { Authorization: apiKey },
      });
      setUser(responseUser?.user);
      setCollections(responseUser?.userCollections?.collections || []);
      setAPIKey(apiKey);
      setStep(STEPS.COLLECTIONS);
    };
    fetchAll();
  }, []);

  const createNewToken = useCallback(
    (token) => {
      const fetchAll = async () => {
        const body = {
          address: user?.address,
          slug,
          token,
          fileName: file?.name,
        };

        const tokenResponse = await request(".netlify/functions/upload", {
          headers: {
            Authorization: apiKey,
          },
          method: "POST",
          body: JSON.stringify(body),
        });

        setTokenId(tokenResponse.tokenId);

        const uploadUrl = tokenResponse?.fileUploadUrl?.url;
        await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        setStep(STEPS.COMPLETE);
      };
      fetchAll();
    },
    [slug, file, apiKey, user]
  );

  const collection = collections?.find(
    (collection) => collection.slug === slug
  );

  return (
    <AppShell
      h="100vh"
      navbar={
        <HStack as="header" borderBottomWidth="1px" py="6" px="4">
          <Image w="10" src="/icon_rasterized.png" />
          <Heading>generaitiv api</Heading>
        </HStack>
      }
      sidebar={<Sidebar />}
    >
      <Box w="100%">
        <Box p="10">
          {step === STEPS.START ? (
            <Start getUserInfoAndCollections={getUserInfoAndCollections} />
          ) : step === STEPS.COLLECTIONS ? (
            <SelectCollection
              setSlug={setSlug}
              setStep={setStep}
              user={user}
              collections={collections}
            />
          ) : step === STEPS.TOKEN_FORM ? (
            <NewToken
              collection={collection}
              file={file}
              setFile={setFile}
              createNewToken={createNewToken}
            />
          ) : step === STEPS.COMPLETE ? (
            <Final slug={slug} tokenId={tokenId} />
          ) : null}
        </Box>
      </Box>
    </AppShell>
  );
};

export default App;
