import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VERIFY_ACCOUNT_API } from '~/configs/global.api';
import { requestApi } from '~/libs/axios';
import { VerifyAccountParam } from '~/types/auth';
import NotifyUtil from '~/utils/NotifyUtil';
import Loading from '../loadings/Loading';

export interface Props {}

const VerifyAccount: React.FC<Props> = () => {
    const { accountID, token } = useParams<VerifyAccountParam>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleVerify = async (params: VerifyAccountParam) => {
        const response = await requestApi('post', VERIFY_ACCOUNT_API, params);
        setLoading(false);
        if (response?.status === 200 || response?.status === 400) {
            if (response.status === 200) {
                NotifyUtil.success('Xác minh tài khoản thành công!');
                navigate('/');
            } else {
                NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
            }
        } else {
            NotifyUtil.error('Lỗi kết nối máy chủ, xin vui lòng liên hệ quản trị viên hoặc thử lại sau');
        }
    };

    useEffect(() => {
        handleVerify({ accountID, token });
    }, [accountID, token]);

    if (loading) return <Loading />;
    return <></>;
};

export default VerifyAccount;
