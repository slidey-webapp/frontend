import { FormControl, TextField } from '@mui/material';
import _ from 'lodash';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import heroImageSrc from '~/images/hero-image.png';
import { indigo, success, warning } from '~/themes/colors';

interface Props {}

const LandingHero: React.FC<Props> = () => {
    const { isAuthenticated } = useAppSelector(x => x.auth);
    const navigate = useNavigate();
    const textFieldRef = useRef<HTMLInputElement>(null);

    const renderButton = () => {
        if (isAuthenticated) return <ButtonBase title="Không gian làm việc" onClick={() => navigate('/dashboard')} />;
        return <ButtonBase title="Bắt đầu ngay" onClick={() => navigate('/register')} />;
    };

    return (
        <main className="w-full">
            <div className="">
                <div
                    style={{
                        height: 100,
                    }}
                    className="bg-pink-200 flex items-center justify-center"
                >
                    <div className="custom-container flex items-center justify-center">
                        <div
                            style={{
                                height: 72,
                            }}
                            className="flex items-center w-fit bg-white rounded-lg px-4"
                        >
                            <div className="flex items-center gap-x-4">
                                <div>Nhập mã để tham gia bài trình chiếu</div>
                                <FormControl sx={{ width: 150 }} size="small">
                                    <TextField
                                        size="small"
                                        placeholder="ABCD EFGH"
                                        variant="outlined"
                                        inputRef={textFieldRef}
                                    />
                                </FormControl>
                                <ButtonBase
                                    title="Tham gia"
                                    onClick={() => {
                                        const code = textFieldRef.current?.value;
                                        navigate(`/join/${code}`);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="custom-container">
                        <div className="flex gap-x-10">
                            <div className="flex-1 flex flex-col gap-y-6">
                                <div>
                                    <h1
                                        style={{
                                            fontSize: 72,
                                            fontWeight: 600,
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        Làm cho
                                    </h1>
                                    <div
                                        style={{
                                            fontSize: 72,
                                            fontWeight: 600,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            height: 90,
                                        }}
                                    >
                                        <div
                                            id="hero-animation"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            }}
                                        >
                                            {[
                                                {
                                                    title: 'Thời gian',
                                                    color: _.get(indigo, 'main', '#000'),
                                                },
                                                {
                                                    title: 'Các cuộc họp',
                                                    color: _.get(warning, 'main', '#000'),
                                                },
                                                {
                                                    title: 'Các bài giảng',
                                                    color: _.get(success, 'main', '#000'),
                                                },
                                            ].map(x => {
                                                return (
                                                    <div
                                                        key={x.title}
                                                        style={{
                                                            color: x.color,
                                                            lineHeight: 1.25,
                                                        }}
                                                    >
                                                        {x.title}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <h1
                                        style={{
                                            fontSize: 72,
                                            fontWeight: 600,
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        có giá trị hơn
                                    </h1>
                                </div>
                                <p
                                    className="text-2xl font-light"
                                    style={{
                                        width: 400,
                                    }}
                                >
                                    Nhận lại những phản hồi có giá trị từ mọi người.
                                </p>
                                <div>{renderButton()}</div>
                            </div>

                            <div className="flex-1">
                                <div className="w-full">
                                    <img src={heroImageSrc} className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LandingHero;
