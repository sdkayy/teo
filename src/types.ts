export interface Name {
  full: string;
  normal: string;
  short: string;
}

export interface SignUp {
  begin: Date;
  end: Date;
}

export interface InProgress {
  begin: Date;
  end: Date;
}

export interface Finished {
  begin: Date;
}

export interface CheckIn {
  begin: Date;
  end: Date;
}

export interface LateSignUp {
  begin: Date;
  end: Date;
}

export interface Timeline {
  signUp: SignUp;
  inProgress: InProgress;
  finished: Finished;
  checkIn: CheckIn;
  lateSignUp: LateSignUp;
}

export interface SignOff {
  enabled: boolean;
}

export interface Params {
  minmembers: number;
  maxmembers: number;
  leagueId?: number;
  max?: number;
  type: string;
  countries: string[];
  nationalities: string[];
}

export interface Restriction {
  type: string;
  params: Params;
}

export interface Contestants {
  signedUp: number;
  checkedIn: number;
  max: number;
  maxSignedUp?: any;
  maxCheckedIn: number;
}

export interface TeamRequirements {
  minMembers: number;
  maxMembers: number;
}

export interface SignUp2 {
  enabled: boolean;
  verificationRequired: boolean;
  premiumRequired: boolean;
  teamRequirements: TeamRequirements;
}

export interface Tournament {
  id: number;
  type: string;
  name: Name;
  contestantType: string;
  uri: string;
  mode: string;
  resultType: string;
  teamSize: number;
  skillLevel: string;
  series: string;
  prizePool?: any;
  state: string;
  timeline: Timeline;
  signOff: SignOff;
  tags: string[];
  gameAccountType: string;
  gameIntegration?: any;
  kickBanDays: number;
  matchSetupAllowed: boolean;
  matchMediaAllowed: boolean;
  mapvoteEnabled: boolean;
  anticheatEnabled: boolean;
  gameId: number;
  restrictions: Restriction[];
  enabledFeatures: any[];
  contestants: Contestants;
  signUp: SignUp2;
  cupMode: string;
}

export interface ResultParticipant {
  id: number;
  place: number;
  points: number[];
}

export interface Result {
  id: number;
  state: string;
  bracket: number;
  round: number;
  position: number;
  participants: ResultParticipant[];
  beginAt: Date;
}

export interface Team {
  id: number;
  seed: number;
  status: string;
  alias: string;
  name: string;
  region: string;
}
