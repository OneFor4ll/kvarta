"use client";

import { Coffee, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="site-footer">
            <div className="container footer-main">
                <a className="brand footer-brand" href="#home">
                    <span className="brand-mark">
                        <Coffee size={23} strokeWidth={1.6} />
                    </span>
                    <span className="brand-copy">
                        <strong>кварта</strong>
                        <small>ОБЖАРКА КОФЕ · МИНСК</small>
                    </span>
                </a>

                <p className="footer-note">
                    Маленькие партии.
                    <br />
                    Большая любовь к кофе.
                </p>

                <div className="footer-links">
                    <a href="#coffee">Наш кофе</a>
                    <a href="#subscription">Подписка</a>
                    <a href="#delivery">Доставка</a>
                    <a href="#order">
                        Связаться <ArrowUpRight size={14} />
                    </a>
                </div>
            </div>

            <div className="container footer-bottom">
                <span>© {year ?? 2026} Обжарка «Кварта»</span>
                <a href="#home">Наверх ↑</a>
            </div>
        </footer>
    );
}
