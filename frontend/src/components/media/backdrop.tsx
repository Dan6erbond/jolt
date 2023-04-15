import {
  Box,
  Image
} from "@mantine/core";

interface BackdropProps {
  backdropPath: string
}

const Backdrop = ({backdropPath}:BackdropProps) => {
  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        styles={{
          root: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -10,
          },
          figure: { height: "100%" },
          imageWrapper: { height: "100%" },
          image: {
            objectPosition: "center top",
          },
        }}
        height="100%"
        fit="cover"
      />
      <Box
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 24, 39, 0.47) 0%, rgb(17, 24, 39) 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
        }}
      />
    </>
  );
}

export default Backdrop
