import { Id } from '~/types/shared';

export interface QuestionDto {
    questionID: Id;
    sessionID: Id;
    content: string;
    isAnswered: boolean;
    totalVoted: number;
    createdBy: Id;
}
