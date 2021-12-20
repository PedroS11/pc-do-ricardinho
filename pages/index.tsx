import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";

const HEIGHT = 300;
const WIDTH = 700;
const TRAVEL_DISTANCE = 600;

const beginTimestamp: number = new Date("2021-12-20T17:40:00.000+00:00").getTime();
const marchTimestamp: number = new Date("2021-12-20T18:58:00.000+00:00").getTime();
const timespanInSeconds: number = (marchTimestamp - beginTimestamp) / 1000;

const calculateCurrentPosition = () => (Date.now() - beginTimestamp) / 1000 * TRAVEL_DISTANCE / timespanInSeconds;

const Home: NextPage = () => {
    const [timeReached, setTimeReached] = useState(false)

    useEffect(() => {
        let ricardoImage = new Image();
        ricardoImage.src = 'ricardo.jpeg'; //i

        let macbookImage = new Image();
        macbookImage.src = 'macbook.jpeg';

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        let ang = 0; //angle

        setInterval(function () {
            const currentPosition = calculateCurrentPosition();

            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            if (currentPosition < TRAVEL_DISTANCE) {
                ctx.save();
                ctx.translate(currentPosition, 100);
                // ctx.translate((pcX += .00027), 100);
                ctx.rotate(Math.PI / 180 * (ang += 5))
                ctx.translate(-50, -50);
                ctx.drawImage(macbookImage, 0, 0, 100, 100);
                ctx.restore();
            } else {
                setTimeReached(true)
            }

            ctx.drawImage(ricardoImage, 550, 25, 150, 150); //draw the image ;)
        }, 50);
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Onde está o Mac do Ricardinho?</title>
                <meta name="description" content="Ricardinho é impaciente"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Onde está o Mac do Ricardinho?
                </h1>

                <div className={styles.grid}>
                    <canvas id="myCanvas"
                            width={WIDTH}
                            height={HEIGHT}>
                    </canvas>
                </div>
                {
                    timeReached
                        ? <div>Já estamos em Março, onde está o meu pc?????</div>
                        : <div>Faltam {timespanInSeconds / 3600 / 24} dias até Março</div>
                }
            </main>
        </div>
    )
}

export default Home
