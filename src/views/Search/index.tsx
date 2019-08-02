import * as React from "react";
import {
  Container,
  DisplayCard,
  VerticalContainer
} from "../../components/Containers";
import { Input } from "../../components/FormElements";
import TourneyCard from "../../components/TourneyCard";

export default (props: any) => {
  const [search, setSearch] = React.useState("");
  return (
    <Container>
      <DisplayCard isSpecial={true}>
        <Input
          id="search"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          label="Search for match"
          placeholder="Match ID (e.g 123456)"
        />
        <br />
        {search.length === 6 && (
          <VerticalContainer center={true}>
            <TourneyCard tId={search} isSoloView={false} />
            <a href={`/tournament/${search}`}>Permalink</a>
          </VerticalContainer>
        )}
      </DisplayCard>
    </Container>
  );
};
