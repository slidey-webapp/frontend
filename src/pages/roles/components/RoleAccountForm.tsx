import { useEffect, useRef, useState } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import Loading from '~/components/loadings/Loading';
import Overlay, { OverlayRef } from '~/components/loadings/Overlay';
import TransferList, { TransferRef } from '~/components/transfers/TransferList';
import { requestApi } from '~/libs/axios';
import { ACCOUNT_COMBO_API } from '~/pages/account-management/api/account-management.api';
import { BaseFormModalProps, ComboOption } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { ROLE_ASSIGN_API } from '../api/role.api';
import { RoleDto } from '../types/role';

interface Props extends Omit<BaseFormModalProps, 'modalType'> {
    rowData?: RoleDto;
}

const RoleAccountForm: React.FC<Props> = ({ rowData, onClose, onSuccess }) => {
    const transferRef = useRef<TransferRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<ComboOption[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await requestApi<ComboOption[]>('get', ACCOUNT_COMBO_API);
            setIsLoading(false);

            if (response.status === 200) {
                setOptions(response.data.result || []);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const accounts = transferRef.current?.getValue();
        overlayRef.current?.open();
        try {
            const response = await requestApi('post', ROLE_ASSIGN_API, {
                roleID: rowData?.roleID,
                accountIDs: accounts?.map(x => x.value),
            });
            if (response?.status === 200 || response?.status === 400) {
                if (response.status === 200) {
                    onSuccess();
                } else {
                    NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
                }
            }
        } catch (err) {
            console.log('err: ', err);
        } finally {
            overlayRef.current?.close();
            onClose();
        }
    };

    if (isLoading)
        return (
            <div className="w-full h-96 relative">
                <Loading />
            </div>
        );

    return (
        <div className="w-full h-full relative">
            <TransferList ref={transferRef} options={options} value={rowData?.accountRoles.map(x => x.accountID)} />
            <div className="w-full mt-6 flex items-center justify-end">
                <ButtonBase title="Đóng" startIcon="close" color="secondary" onClick={onClose} className="!mx-1" />
                <ButtonBase title="Lưu" startIcon="save" className="!mx-1" onClick={handleSubmit} />
            </div>
            <Overlay ref={overlayRef} />
        </div>
    );
};

export default RoleAccountForm;
