import { useState, useEffect } from "react";

const Carousel = (props) => {
    const [statusImage, setStatusImage] = useState(1)
    const onChangeStatusImagePrev = () => {
        if (statusImage == 1) {
            setStatusImage(3)
        }else {
            setStatusImage(statusImage - 1)
        }
        
    }
    const onChangeStatusImageNext = () => {
        if (statusImage == 3) {
            setStatusImage(1)
        }else {
            setStatusImage(statusImage + 1)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => onChangeStatusImageNext(), 10000);
        return () => clearTimeout(timer);
    }, [statusImage]);
    return <div className="">

        <div id="default-carousel" className="relative" data-carousel="static">
                {
                    props.imageCarousel.map(({id, src, alt, title}) => (
                        statusImage == id && (
                           <div key={id} className="flex flex-col justify-center items-center w-96">
                            <div className="translate-y-1/3 overflow-hidden rounded-lg md:h-96">
                                <div className="duration-700 ease-in-out z-20">
                                    <img 
                                    src={src} 
                                    className="w-72 min-w-full" 
                                    alt={alt}
                                    loading="lazy"
                                    />
                                </div>
                            </div>
                           <div className="text-xl font-semibold text-black sm:text-xl dark:text-white hidden sm:hidden md:contents lg:contents xl:contents 2xl:contents">{title}</div>
                           </div>
                        )
                    ))
                }
                
    
    <button type="button" onClick={() => onChangeStatusImagePrev()} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 ">
            <svg aria-hidden="true" className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" onClick={() => onChangeStatusImageNext()} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10">
            <svg aria-hidden="true" className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

    </div>
}
 
export default Carousel;