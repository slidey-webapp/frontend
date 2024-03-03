import { PresentationDto } from '~/pages/presentations/types/presentation';
import { FullAuditedDto, Id } from '~/types/shared';

export enum ASSET_TYPE_ENUM {
    PRESENTATION = 'PRESENTATION',
}

export interface HistoryDto extends FullAuditedDto {
    visitHistoryID: Id;
    accountID: Id;
    assetID: Id;
    assetType: ASSET_TYPE_ENUM;
    asset: PresentationDto;
}
