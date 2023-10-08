import { Navigate } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';

const RegisterView: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    if (!!isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="w-full h-screen relative flex items-center justify-center">
            <div className="w-[380px] min-h-[350px] bg-white rounded-md shadow p-3 pt-0 flex flex-col">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-[#ffba00] font-bold text-xl">Đăng ký</div>
                        <div className="text-[#9b9b9b] font-md">Tạo tài khoản ngay</div>
                    </div>
                    {/* <div>
                        <img src={happyImage} width={200} alt="" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default RegisterView;
