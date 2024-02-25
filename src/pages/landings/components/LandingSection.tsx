import React from 'react';
import sectionImageSrc from '~/images/section-image.png';

interface Props {}

const LandingSection: React.FC<Props> = () => {
    return (
        <section className="w-full">
            <div className="flex items-center justify-center py-12">
                <div className="custom-container">
                    <div className="flex gap-x-10">
                        <div className="flex-1 pr-16">
                            <h2 className="font-semibold text-4xl mb-4 text-left">
                                Biến đám đông khó tính thành khán giả thân thiết
                            </h2>
                            <div className="text-xl font-normal pl-6">
                                <div className="relative before:absolute before:top-2 before:-left-5 before:w-2 before:h-2 before:bg-[#10b882]">
                                    Xây dựng kết nối ngay lập tức với khán giả và biến họ trở thành một phần trong bài
                                    thuyết trình của bạn.
                                </div>
                                <div className="mt-8 relative before:absolute before:top-2 before:-left-5 before:w-2 before:h-2 before:bg-[#10b882]">
                                    Tạo trải nghiệm tương tác cho phép mọi người bỏ phiếu, đặt câu hỏi và tương tác
                                    xuyên suốt.
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="w-full">
                                <img src={sectionImageSrc} className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingSection;
