import { useEffect } from "react";
import Quagga from "quagga";
import { Box } from "@mui/material";

type Props = {
  onDetected: (result: string) => void;
};

//TODO: any外す
const Scanner = ({ onDetected }: Props): JSX.Element => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "live",
          type: "LiveStream",
          target: document.querySelector("#Quagga"),
        },
        // other options...
        decoder: {
          readers: ["ean_reader"],
        },
        locator: true,
        numOfWorkers: 4,
        frequency: 10,
        locate: true,
      },
      (err: any) => {
        if (err) {
          console.log(err, "error msg");
        }
        Quagga.start();
        return () => {
          Quagga.stop();
        };
      }
    );

    Quagga.onProcessed((result: any) => {
      if (result) {
        //console.log(result);
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result: any) => {
    onDetected(result.codeResult.code);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      id="Quagga"
    />
  );
};

export default Scanner;
