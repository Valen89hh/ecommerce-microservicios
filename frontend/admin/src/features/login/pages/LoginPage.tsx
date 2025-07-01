/* eslint-disable react-hooks/rules-of-hooks */
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";

// Generador de valores aleatorios
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Crear 10 círculos con propiedades únicas
const generateCircles = () =>
    Array.from({ length: 10 }, (_, i) => ({
        id: i,
        size: random(3, 8),        // en vw
        top: random(0, 90),        // en %
        left: random(0, 90),       // en %
        delay: random(0, 5),       // en segundos
        opacity: random(0.1, 0.4), // opacidad variable para profundidad
        parallaxFactor: random(5, 25), // intensidad del efecto parallax
    }));

const LoginPage = () => {
    const [circles] = useState(generateCircles());

    // Movimiento del mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2; // rango -1 a 1
            const y = (e.clientY / innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="relative min-h-screen p-4 w-full flex justify-center items-center overflow-hidden bg-secondary dark:bg-dark-secondary">
            <LoginForm />

            {/* Círculo grande inferior izquierdo */}
            <motion.div
                className="absolute bg-primary dark:bg-dark-primary rounded-full z-0 opacity-50"
                style={{
                    width: 'min(35vw, 350px)',
                    height: 'min(35vw, 350px)',
                    bottom: '-5%',
                    left: '-5%',
                }}
                animate={{
                    x: [0, 10, -10, 0],
                    y: [0, 10, -5, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Círculo grande superior derecho */}
            <motion.div
                className="absolute bg-primary dark:bg-dark-primary rounded-full z-0 opacity-30"
                style={{
                    width: 'min(25vw, 250px)',
                    height: 'min(25vw, 250px)',
                    top: '-5%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -15, 15, 0],
                    y: [0, -10, 5, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Círculos pequeños con parallax y opacidad variable */}
            {circles.map((circle) => {
                const parallaxX = useTransform(mouseX, x => x * circle.parallaxFactor);
                const parallaxY = useTransform(mouseY, y => y * circle.parallaxFactor);
                const springX = useSpring(parallaxX, { stiffness: 50, damping: 15 });
                const springY = useSpring(parallaxY, { stiffness: 50, damping: 15 });

                return (
                    <motion.div
                        key={circle.id}
                        className="absolute bg-primary dark:bg-dark-primary rounded-full z-0"
                        style={{
                            width: `${circle.size}vw`,
                            height: `${circle.size}vw`,
                            top: `${circle.top}%`,
                            left: `${circle.left}%`,
                            opacity: circle.opacity,
                            x: springX,
                            y: springY,
                        }}
                        animate={{
                            scale: [1, 1.05, 0.95, 1],
                        }}
                        transition={{
                            duration: random(6, 10),
                            repeat: Infinity,
                            delay: circle.delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default LoginPage;
