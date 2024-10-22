
import styles from "../css/animetScroll.module.css";
import { PhotosLandingI } from "@/interfaces/photosLandingInterface";
export default function PhotosPublic() {
    const imagesLanding:PhotosLandingI = {
        firstRow:[
            'https://res.cloudinary.com/dpc1anfoi/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20calabazas./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/ms0hgtxgn1xd7nurtd1u?_a=BAVCyODW0',
            'https://res.cloudinary.com/dcc5lrydj/image/upload/e_gen_background_replace:prompt_Coloca%20el%20fondo%20con%20tem%C3%A1tica%20de%20Halloween./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/pjexr7ep15oiun1dqqnv?_a=BAVCyODW0',
            'https://res.cloudinary.com/dpc1anfoi/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20calabazas./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/b7nniowvrhkzv1gjxg9j?_a=BAVCyODW0',
            'https://res.cloudinary.com/dcc5lrydj/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20estilo%20Silent%20Hill./e_gen_restore/c_limit,w_1870/f_auto/q_auto/v1/qanvqz6ltzzpv4kyup7i?_a=BAVCyODW0',

        ],
        secondRow:[
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.51.51_AM_bvaraz.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.57.01_AM_qj3ssq.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.56.47_AM_pmzbx3.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.53.39_AM_gmphvg.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.53.28_AM_zs9a8p.jpg",
        ],
        thirdRow:[
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.52.30_AM_ajpxlp.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.52.05_AM_vjtzdg.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_12.51.30_AM_k8hq2b.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20terror%20y%20halloween/WhatsApp_Image_2024-10-22_at_1.04.36_AM_s7w5kn.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20payasos%20de%20hallowen/WhatsApp_Image_2024-10-22_at_1.15.08_AM_v8j5vu.jpg",
        
        ],
        fourthRow:[
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20payasos%20de%20hallowen/WhatsApp_Image_2024-10-22_at_1.08.18_AM_f8uvmb.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20silent%20hill/d8d0daec1739996d0fb6fc2b4927121c_asuhso.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20silent%20hill/fd73b7aad23d9be49486ebfc2cd63a95_jzgfwh.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20silent%20hill/WhatsApp_Image_2024-10-22_at_1.22.42_AM_hhwofm.jpg",
            "https://res.cloudinary.com/dhmhmfjhw/image/upload/e_gen_background_replace:prompt_Cambia%20el%20fondo%20con%20tematica%20de%20silent%20hill/1d3be3f9dba18fe5874c0a356d7d2acf_pegmtn.jpg",
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
