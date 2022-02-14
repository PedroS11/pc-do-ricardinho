import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import { HEIGHT, marchTimestamp, TRAVEL_DISTANCE, WIDTH } from "../utils/constants";
import { calculateCurrentPosition } from "../utils/calculateCurrentPosition";
import { getCountdownMessage } from "../utils/calculateRemaingTime";


const Home: NextPage = () => {
    const [timeLeft, setTimeLeft] = useState(Math.floor((marchTimestamp - Date.now()) / 1000));

    useEffect(() => {
        setInterval(() => {
            setTimeLeft( Math.floor((marchTimestamp - Date.now()) / 1000));
        }, 1000)

        let antonioImage = new Image();
        antonioImage.src = 'dc.jpeg'; //i

        let macbookImage = new Image();
        macbookImage.src = 'macbook.jpeg';

        const canvas = document.getElementById("myCanvas");
        // @ts-ignore
        const ctx = canvas.getContext("2d");

        let ang = 0; //angle

        setInterval(function () {
            const currentPosition = calculateCurrentPosition();

            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            if (timeLeft >= 0) {
                ctx.save();
                ctx.translate(currentPosition, 100);
                ctx.rotate(Math.PI / 180 * (ang += 5))
                ctx.translate(-50, -50);
                ctx.drawImage(macbookImage, 0, 0, 100, 100);
                ctx.restore();

                setTimeLeft(Math.floor((marchTimestamp - Date.now()) / 1000));
            } else {
                setTimeLeft(0);
            }

            ctx.drawImage(antonioImage, 550, 25, 150, 150); //draw the image ;)
        }, 50);
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Onde está o Mac do Toninho?</title>
                <meta name="description" content="Toninho também é impaciente"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Onde está o Mac do Toninho?
                </h1>

                <div className={styles.grid}>
                    <canvas id="myCanvas"
                            width={WIDTH}
                            height={HEIGHT}>
                    </canvas>
                </div>
                {
                    timeLeft <= 0
                        ? <div>Já estamos em Março, onde está o meu pc?????</div>
                        : <div>Faltam {getCountdownMessage(timeLeft)} até Março</div>
                }
            </main>
        </div>
    )
}

export default Home
