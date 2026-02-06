
import { motion } from "framer-motion";

interface HoverTextProps {
    text: string;
    className?: string;
    textClassName?: string;
}

const HoverText = ({ text, className = "", textClassName = "" }: HoverTextProps) => {
    const characters = text.split("");

    return (
        <motion.span
            className={`inline-block whitespace-pre cursor-pointer ${className}`}
            initial="initial"
            whileHover="hover"
        >
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    className={`inline-block ${textClassName}`}
                    variants={{
                        initial: {
                            y: 0,
                            scale: 1,
                            rotate: 0,
                        },
                        hover: {
                            y: -8,
                            scale: 1.15,
                            rotate: (i % 2 === 0 ? 3 : -3),
                            transition: {
                                type: "spring",
                                damping: 10,
                                stiffness: 200,
                                delay: i * 0.03,
                            },
                        },
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default HoverText;
