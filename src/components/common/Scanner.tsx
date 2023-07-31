import { useEffect } from "react";
import Quagga from "quagga";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
type Props = {
  onDetected: (result: string) => void;
};

const FullscreenVideo = styled("video")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const FullscreenCanvas = styled("canvas")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

//TODO: any外す
const Scanner = ({ onDetected }: Props): JSX.Element => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "live",
          type: "LiveStream",
          target: document.querySelector("#Quagga"),
          constraints: {
            facingMode: "environment",
          },
        },
        locator: {
          patchSize: "large",
          halfSample: true,
        },

        // other options...
        decoder: {
          readers: ["ean_reader"],
        },
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
      if (result == null) return; // 未検出の場合
      if (typeof result != "object") return;
      if (result.boxes == undefined) return;
      const ctx = Quagga.canvas.ctx.overlay;
      const canvas = Quagga.canvas.dom.overlay;
      ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
      Quagga.ImageDebug.drawPath(result.boxes, { x: 0, y: 1 }, ctx, {
        color: "blue",
        lineWidth: 5,
      }); // 結果を描画
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result: any) => {
    onDetected(result.codeResult.code);
  };

  return (
    <>
      <Box
        sx={{
          width: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        id="Quagga"
      >
        <FullscreenVideo />
        <FullscreenCanvas />
      </Box>
    </>
  );
};

export default Scanner;
