import {
  Button,
  Divider,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  HStack,
  VStack,
  Select,
  Switch,
  Link,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

import React, { ReactElement } from "react";

const formDataSPA: {[key: string]: any} = {
  "dose_per_frame": 1,
  "symmetry": "C1",
};


const SpaForm = (submissionCallback: (arg0: any) => void, sessid: string) => {
  const validateInt = (char: string) => {
    return /\d/.test(char);
  };
  const validateFloat = (char: string) => {
    return /^\d*\.?\d*$/.test(char);
  };
  const [symmetryType, setSymmetryType] = React.useState("C");
  const [particleDetection, setParticleDetection] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSymmetryType(event.target.value);
  };
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParticleDetection(!particleDetection);
  };
  const setFormElement = (event: React.FormEvent<HTMLFormElement>, callback: (arg0: any) => void) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formDataSPA.dose_per_frame = formData.get("dose");
    formDataSPA.symmetry = formData.get("symmetry1") as string + formData.get("symmetry2") as string;
    callback(formDataSPA);
  };

  return (
    <form onSubmit={(e) => setFormElement(e, submissionCallback)}>
      <FormControl>
        <VStack align="start" spacing={10} width="100%" display="flex">
          <VStack align="start" width="100%" display="flex">
            <FormLabel>{"Dose per frame [\u212B / pixel]"}</FormLabel>
            <Input defaultValue="1" name="dose"/>
          </VStack>
          <VStack align="start" width="100%" display="flex">
            <FormLabel>Symmetry</FormLabel>
            <HStack align="start" width="100%" display="flex">
              <Select defaultValue="C" onChange={handleChange} name="symmetry1">
                <option>C</option>
                <option>D</option>
                <option>T</option>
                <option>O</option>
                <option>I</option>
              </Select>
              <NumberInput
                defaultValue={1}
                min={1}
                isValidCharacter={validateInt}
                isDisabled={["T", "O"].includes(symmetryType)}
                name="symmetry2"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </VStack>
          <VStack align="start" width="100%" display="flex">
            <HStack>
              <FormLabel>Automatically detect particle size</FormLabel>
              <Switch
                defaultChecked
                colorScheme="murfey"
                onChange={handleSwitchChange}
                name="detect-particle-size"
              />
            </HStack>
          </VStack>
          {!particleDetection ? (
            <VStack align="start" width="100%" display="flex">
              <FormLabel>{"Particle diameter [\u212B]"}</FormLabel>
              <Input defaultValue={200} />
            </VStack>
          ) : (
            <></>
          )}
          <VStack align="start" width="100%" display="flex">
            <HStack>
              <FormLabel>Downscale in extraction</FormLabel>
              <Switch
                defaultChecked
                colorScheme="murfey"
                onChange={handleSwitchChange}
                name="downscale"
              />
            </HStack>
          </VStack>
        </VStack>
      </FormControl>
      <Button type='submit'>
          Submit
      </Button>
    </form>
  );
};

const TomoForm = () => {
  return (
    <FormControl>
      <FormLabel>{"Dose per frame [\u212B / pixel]"}</FormLabel>
      <Input defaultValue="1" />
    </FormControl>
  );
};

interface Forms {
  [expType: string]: ReactElement;
}

export const getForm = (expType: string, submissionCallback: (arg0: any) => void, sessid: string) => {
  let forms = {
    spa: SpaForm(submissionCallback, sessid),
    tomography: TomoForm(),
  } as Forms;
  return forms[expType];
};
