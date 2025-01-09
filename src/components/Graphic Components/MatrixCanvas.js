// Scripts
import { useEffect, useRef } from "react";

const MatrixCanvas = ({ sequential = false, customLetters = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890@#$%&*" }) => { 
    const canvasRef = useRef(null);

    const renderDrops = (canvasConfig) => {
        const { ctx, canvas, drops, charArray, fontSize, sequential } = canvasConfig;
        let charIndex = canvasConfig.charIndex;

        drops.forEach((drop, i) => {
            let char;

            if (sequential) char = charArray[charIndex];
            else char = charArray[Math.floor(Math.random() * charArray.length)];

            const x = i * fontSize;
            const y = drop * fontSize;

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0; // Reset drop position
            }

            drops[i]++; // Move the drop down
        });

        if (sequential) {
            charIndex++;
            if (charIndex >= charArray.length) {
                charIndex = 0; // Loop back to start of the array
            }
        }

        return sequential ? charIndex : null; // Return the updated character index
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const charArray = customLetters.split("");
        const ctx = canvas.getContext("2d");
        const fontSize = 16;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * canvas.height / fontSize));

        const canvasConfig = {
            canvas: canvas,
            charIndex: sequential ? 0 : null,
            ctx: ctx,
            charArray: charArray,
            fontSize: fontSize,
            delay: 70,
            drops: drops,
            sequential: sequential
        }

        // Animation function
        const drawMatrix = () => {
            setTimeout(() => {
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${fontSize}px monospace`;

                canvasConfig.charIndex = renderDrops(canvasConfig);

                // Check for space character
                if (sequential && charArray[canvasConfig.charIndex] === " ") canvasConfig.charIndex = renderDrops(canvasConfig);

                requestAnimationFrame(drawMatrix);
            }, canvasConfig.delay);
        };

        drawMatrix();

        // Handle resizing
        const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drops.length = Math.floor(canvas.width / fontSize);
        drops.fill(0);
        };

        window.addEventListener("resize", handleResize);

        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

  return <canvas ref={canvasRef}/>;
};

export default MatrixCanvas;
