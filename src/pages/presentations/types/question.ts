import { FullAuditedTimeDto, Id } from '~/types/shared';

export interface QuestionDto extends FullAuditedTimeDto {
    questionID: Id;
    sessionID: Id;
    participantID: Id;
    content: string;
    isAnswered: boolean;
    totalVoted: number;
    votes: Array<QuestionVoteDto>;
}

export interface QuestionVoteDto extends FullAuditedTimeDto {
    questionVoteID: Id;
    questionID: Id;
    participantID: Id;
}
