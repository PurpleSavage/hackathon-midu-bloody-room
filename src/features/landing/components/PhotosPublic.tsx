
import styles from "../css/animetScroll.module.css";

export default function PhotosPublic() {
    const images = [
        "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859156/cld-sample.jpg",
        "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859152/samples/man-portrait.jpg",
        "https://res.cloudinary.com/dcc5lrydj/image/upload/v1728956530/fv8rgj93f4cko0hozhrk.jpg",
        "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859149/samples/balloons.jpg",
        "https://res.cloudinary.com/dcc5lrydj/image/upload/v1718859157/cld-sample-3.jpg",
    ];

    return (
        <div className={styles.appContainer}>
            <div className={styles.wrapper}>
     

                <div className={styles.marquee}>
                    <div className={styles.marqueeGroup}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 1 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.marqueeGroup}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 1 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className={styles.marquee}>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 2 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 2 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

            
                <div className={styles.marquee}>
                    <div className={styles.marqueeGroup}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 3 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.marqueeGroup}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 3 - ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className={styles.marquee}>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {images.map((url, index) => (
                            <div className={styles.imageGroup} key={index}>
                                <img src={url} className={styles.image} alt={`Row 4 - ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.marqueeGroup} ${styles.marqueeGroupReverse}`}>
                        {images.map((url, index) => (
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
