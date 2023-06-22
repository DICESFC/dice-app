import { useEffect } from "react";
import Quagga from "quagga";
import { Box } from "@mui/material";

type Props = {
  onDetected: (result: string) => void;
};

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
      (err) => {
        if (err) {
          console.log(err, "error msg");
        }
        Quagga.start();
        return () => {
          Quagga.stop();
        };
      }
    );

    Quagga.onProcessed((result) => {
      if (result) {
        console.log(result);
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result) => {
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
