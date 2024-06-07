import {
    Box,
    Heading,
    VStack,
  } from "@chakra-ui/react";

import { useNavigate, useLoaderData, useSearchParams } from "react-router-dom";
import { components } from "schema/main";
import { Table } from "@diamondlightsource/ui-components";
import { SetupStepper } from "components/setupStepper";

type File = components["schemas"]["File"];

const GainRefTransfer = () => {
    const possibleGainRefs = useLoaderData() as File[] | null;
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const SelectGainRef = (data: Record<string, any>, index: number) => {
        const sessid = searchParams.get("sessid");
        const setup = searchParams.get("setup");
        if (setup) sessid ? navigate(`/new_session/parameters/${sessid}`): navigate("/")
        else sessid ? navigate(`/sessions/${sessid}`): navigate("/")
    }

    return (
        <div className='rootContainer'>
        <Box mt='-1em' mx='-7.3vw' bg='murfey.50' flex='1 0 auto'>
            <Box w='100%' overflow='hidden'>
                <VStack className='homeRoot'>
                    <VStack bg='murfey.700' justifyContent='start' alignItems='start'>
                        <Heading size='xl' color='murfey.50'>
                            Possible Gain Reference Files
                        </Heading>
                    </VStack>
                </VStack>
            </Box>
            <Box mt='1em' ml='2em' w='80%' justifyContent={'center'} alignItems={'center'} >
            {searchParams.get("setup") ? <SetupStepper activeStepIndex={1} />: null}
            </Box>
            <Box mt='1em' w='95%' px='1em' justifyContent={'center'} alignItems={'center'}>
            <Table data={possibleGainRefs} headers={[{'key': 'name', 'label': 'Name'}, {'key': 'timestamp', 'label': 'Timestamp'}, {'key': 'size', 'label': 'Size'}]} label={'gainRefData'} onClick={SelectGainRef} /> 
            </Box>
        </Box>
        </div>
    );
};

export { GainRefTransfer };

