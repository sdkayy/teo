import * as React from "react";
import { withRouter } from "react-router-dom";
import { VerticalContainer, Container } from "../../components/Containers";
import TourneyCard from "../../components/TourneyCard";
export default withRouter((props: any) => (
  <Container>
    <VerticalContainer center={true}>
      <TourneyCard tId={props.match.params.id} isSoloView={true} />
    </VerticalContainer>
  </Container>
));
