
import styles from "../css/animetScroll.module.css";
import { PhotosLandingI } from "@/interfaces/photosLandingInterface";
export default function PhotosPublic() {
    const imagesLanding:PhotosLandingI = {
        firstRow:[
            'https://res.cloudinary.com/dpc1anfoi/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20calabazas./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/ms0hgtxgn1xd7nurtd1u?_a=BAVCyODW0',
            'https://res.cloudinary.com/dcc5lrydj/image/upload/e_gen_background_replace:prompt_Coloca%20el%20fondo%20con%20tem%C3%A1tica%20de%20Halloween./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/pjexr7ep15oiun1dqqnv?_a=BAVCyODW0',
            'https://res.cloudinary.com/dpc1anfoi/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20calabazas./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/b7nniowvrhkzv1gjxg9j?_a=BAVCyODW0',
            'https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859152/samples/man-portrait.jpg',

        ],
        secondRow:[
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859156/cld-sample.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859152/samples/man-portrait.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1728956530/fv8rgj93f4cko0hozhrk.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859149/samples/balloons.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859157/cld-sample-3.jpg",
        ],
        thirdRow:[
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859156/cld-sample.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859152/samples/man-portrait.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1728956530/fv8rgj93f4cko0hozhrk.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859149/samples/balloons.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859157/cld-sample-3.jpg",
        
        ],
        fourthRow:[
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859156/cld-sample.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859152/samples/man-portrait.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1728956530/fv8rgj93f4cko0hozhrk.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859149/samples/balloons.jpg",
            "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859157/cld-sample-3.jpg",
        ]
    }
    

    return (
        <div className={styles.appContainer}>
            <div className={styles.wrapper}>
     

                <div className={styles.marquee}>
                    <div className={styles.marqueeGroup}>
                        {imagesLanding.firstRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 1 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.marqueeGroup}>
                        {imagesLanding.firstRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 1 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className={styles.marquee}>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {imagesLanding.secondRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 2 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {imagesLanding.secondRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 2 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

            
                <div className={styles.marquee}>
                    <div className={styles.marqueeGroup}>
                        {imagesLanding.thirdRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 3 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.marqueeGroup}>
                        {imagesLanding.thirdRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 3 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className={styles.marquee}>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {imagesLanding.fourthRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 4 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {imagesLanding.fourthRow.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 4 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
