import { useState, useEffect } from 'react';
const CountDown = (props) => {
    const [count, setCount] = useState(300);

    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        }
        if (props.isFinish) return; // Dừng timer nếu đã finish

        const timer = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [count, props.isFinish]);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num / 60) % 60);
        const seconds = sec_num % 60;
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(" : ");
    }

    return (
        <div className="countdown-container">
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown;