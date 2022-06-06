import styled from "styled-components";
import { CubeGrid } from "better-react-spinkit";
import Head from "next/head";

const Loader = styled.img`
  height: 150px;
`;

const Title = styled.h3`
  font-size: 25px;
  color: #fff;
  letter-spacing: 1px;
`;

function Loading() {
  return (
    <>
      <Head>
        <title>Whatsapp NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png"
        />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#222e35",
        }}
      >
        <Loader src="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png" />
        <Title>WhatsApp</Title>
        <CubeGrid size={30} color="#47c756" />
      </div>
    </>
  );
}

export default Loading;