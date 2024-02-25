import React from 'react';
import hopinSrc from '~/images/hopin.svg';
import meetSrc from '~/images/meet.svg';
import teamSrc from '~/images/team.svg';
import zoomSrc from '~/images/zoom.svg';

interface Props {}

const LandingFeature: React.FC<Props> = () => {
    return (
        <section className="w-full">
            <div className="flex items-center justify-center py-12 bg-neutral-50">
                <div className="custom-container">
                    <h2 className="font-semibold text-4xl mb-12 text-center">
                        Làm việc với những ứng dụng bạn yêu thích
                    </h2>
                    <div className="flex gap-x-4 select-none">
                        {[
                            {
                                src: zoomSrc,
                                title: 'Zoom',
                            },
                            {
                                src: meetSrc,
                                title: 'Google Meet',
                            },
                            {
                                src: teamSrc,
                                title: 'Microsoft Teams',
                            },
                            {
                                src: hopinSrc,
                                title: 'Hopin',
                            },
                        ].map(x => {
                            return (
                                <div key={x.title} className="flex-1 flex flex-col justify-center items-center">
                                    <img
                                        src={x.src}
                                        style={{
                                            height: 128,
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div className="font-semibold text-2xl mt-6">{x.title}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingFeature;
