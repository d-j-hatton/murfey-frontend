import {
    Card,
    CardBody,
    Button,
    CardHeader,
  } from "@chakra-ui/react";
  
  import { getUpstreamVisits } from "loaders/general";
  import { MdFileDownload } from "react-icons/md";
  
  import React from "react";

  interface SessionId {
    sessid: number
  }

  const UpstreamVisitCard = ({ sessid }: SessionId) => {
    const [upstreamVisits, setUpstreamVisits] = React.useState({});

    const resolveVisits = async () => {
      const visits = await getUpstreamVisits(sessid);
      setUpstreamVisits(visits);
    };
    resolveVisits();
  
    return (<Card alignItems="center">
        <CardHeader>Upstream Visit Data Download</CardHeader>
        {Object.keys(upstreamVisits).map((k) => {
        return (
          <CardBody>
            <Button rightIcon={<MdFileDownload />}>{k}</Button>
          </CardBody>
        )
  })}</Card>);
  };
  
  export { UpstreamVisitCard };
  