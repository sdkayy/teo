import React, { useState } from "react";
import {
  Tournament,
  Result,
  Team as ITeam,
  ResultParticipant
} from "../../types";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import { VerticalContainer, DisplayCard } from "../Containers";
import Team from "./team";
import dayjs from "dayjs";
import Error from "../Error";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Button from "../Buttons";

const Header = styled.div`
  width: 100%;
  padding: 4px 8px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const Date = styled.p`
  font-size: 14px;
`;

const TeamEntry = styled(VerticalContainer)`
  margin-top: 12px;
  border-bottom: 1px solid #e2e5ea;

  &:last-of-type {
    border: none;
  }
`;

const SortingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

interface TourneyProps {
  tId: string;
  isSoloView: boolean;
}

export default (props: TourneyProps) => {
  const [sorting, setSorting] = useState("DESC");
  dayjs.extend(advancedFormat);
  const matchQuery = useFetch(
    `https://api.eslgaming.com/play/v1/leagues/${props.tId}/results`,
    {
      headers: { accept: "application/json" }
    }
  );

  const tournyQuery = useFetch(
    `https://api.eslgaming.com/play/v1/leagues/${props.tId}`,
    {
      headers: { accept: "application/json" }
    }
  );

  const teamsQuery = useFetch(
    `https://api.eslgaming.com/play/v1/leagues/${props.tId}/contestants`,
    {
      headers: { accept: "application/json" }
    }
  );

  if (matchQuery.error || teamsQuery.error) {
    return <Error message={"Problem finding tournamnet information!"} />;
  }

  // @ts-ignore
  const matches: Result[] = matchQuery.response ? matchQuery.response : [];
  // @ts-ignore
  const tourny: Tournament = tournyQuery.response ? tournyQuery.response : [];
  // @ts-ignore
  const teams: ITeam[] = teamsQuery.response ? teamsQuery.response : [];

  if (!matchQuery.response || !teamsQuery.response) {
    return <p>Loading...</p>;
  }

  /* NOTES:
    I had an insanely hard time getting the leagues request to work, I am unsure as to why but it just would never return anything and I'd get a CORBS block.
    This is the reason for the default names for the league descriptions.
  */
  return (
    <>
      <DisplayCard
        isSpecial={true}
        isBigger={!props.isSoloView}
        style={{ marginBottom: "16px" }}
      >
        <Header>
          <Title>{tourny.name || "Default Name"}</Title>
          <Date>
            {dayjs(
              tourny.timeline ? tourny.timeline.checkIn.begin : dayjs()
            ).format("Do MMMM YYYY")}
          </Date>
        </Header>
      </DisplayCard>
      <DisplayCard isBigger={!props.isSoloView}>
        <VerticalContainer style={{ maxHeight: "550px", overflow: "auto" }}>
          <SortingContainer>
            <Button
              onClick={() => setSorting(sorting === "ASC" ? "DESC" : "ASC")}
            >
              {sorting}
            </Button>
          </SortingContainer>
          {matches &&
            matches
              .sort((a, b) => {
                // Can't think of a better solution ATM
                const aBigger = dayjs(a.beginAt).isAfter(b.beginAt);
                if (aBigger) {
                  if (sorting === "ASC") {
                    return 1;
                  } else {
                    return -1;
                  }
                }
                const bBigger = dayjs(b.beginAt).isAfter(a.beginAt);
                if (bBigger) {
                  if (sorting === "ASC") {
                    return -1;
                  } else {
                    return 1;
                  }
                }
                return 0;
              })
              .map((match: Result) => {
                return (
                  <TeamEntry key={match.id}>
                    <Date
                      style={{
                        marginBottom: "6px",
                        color: "#818F8F"
                      }}
                    >
                      {dayjs(match.beginAt).format("HH:MM")}
                    </Date>
                    {match.participants.map((team: ResultParticipant) => {
                      const realTeam = teams.filter(
                        _team => _team.id === team.id
                      )[0];
                      return (
                        <Team
                          key={team.id}
                          name={realTeam ? realTeam.name : "bye"}
                          winner={
                            match.participants.filter(
                              (_team: ResultParticipant) =>
                                _team.points[0] < team.points[0]
                            ).length > 0
                          }
                          score={team.points[0]}
                        />
                      );
                    })}
                  </TeamEntry>
                );
              })}
        </VerticalContainer>
      </DisplayCard>
    </>
  );
};
