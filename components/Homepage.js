import styled from "styled-components";
import Image from "next/image";
import homeImage from "../public/homepage.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  flex: 100%;
`;

const Head = styled.h2`
  font-size: 2rem;
  font-weight: 100;
  font-family: roboto;
  margin-bottom: 0;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 100;
  letter-spacing: 0.5px;
  opacity: 0.5;
  width: 50%;
  text-align: center;
  line-height: 1.5em;
`;

function Homepage() {
  return (
    <Container>
      <Image src={homeImage} />
      <Head>WhatsApp Web Clone</Head>
      <Paragraph>
        This is the WhatsApp Web Clone Build using NextJS. and It is build for
        only Practice Purpose.
      </Paragraph>
    </Container>
  );
}

export default Homepage;
