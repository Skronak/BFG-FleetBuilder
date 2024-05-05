import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Wrapper,
    CalenderHead,
    SevenColGrid,
    HeadDay,
    ClenderBody,
    StyledDay,
    StyledEvent,
} from "./Calendrier_style";

const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
    });
    return newDate;
};

const Calendrier2 = () => {
    const MOCKEVENTS = [
        { date: new Date(2024, 2, 10), title: "bonjour" },
        { date: new Date(2024, 2, 15), title: "aurevoir" },
        { date: new Date(2024, 2, 5), title: "salut" },
    ];

    const getData = () => {
        axios
            .get("http://localhost:3004/temps")
            .then((res) => setBlogData(res.data));
    };
    useEffect(() => getData(), []);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [blogData, setBlogData] = useState([]);
    const [events, setEvents] = useState(MOCKEVENTS);

    const nextMonth = () => {
        if (currentMonth < 11) {
            setCurrentMonth((next) => next + 1);
        } else {
            setCurrentMonth(0);
            setCurrentYear((next) => next + 1);
        }
    };
    const prevMonth = () => {
        if (currentMonth > 0) {
            setCurrentMonth((prev) => prev - 1);
        } else {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        }
    };

    const DAYS = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];

    const MONTHS = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];

    const range = (end) => {
        const { result } = Array.from({ length: end }).reduce(
            ({ result, current }) => ({
                result: [...result, current],
                current: current + 1,
            }),
            { result: [], current: 1 }
        );
        return result;
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getSortedDays = (month, year) => {
        const dayIndex = new Date(year, month, 1).getDay();
        return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
    };

    const getDateObj = (day, month, year) => {
        return new Date(year, month, day);
    };

    const areDatesTheSame = (first, second) => {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
    };

    const getRandomDarkcColor = () => {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    };

    const addEvent = (date, color) => {
        const text = window.prompt("text");
        setEvents((prev) => [...prev, { date, title: text, color }]);
    };
    const onAddEvent = (date) => {
        addEvent(date, getRandomDarkcColor());
    };

    return (
        <Wrapper>
            <CalenderHead>
                <ion-icon
                    onClick={prevMonth}
                    name="arrow-back-circle-outline"
                ></ion-icon>
                <p>
                    {MONTHS[currentMonth]} {currentYear}
                </p>

                <ion-icon
                    onClick={nextMonth}
                    name="arrow-forward-circle-outline"
                ></ion-icon>
            </CalenderHead>
            <SevenColGrid>
                {getSortedDays(currentMonth, currentYear).map((day) => (
                    <HeadDay>{day}</HeadDay>
                ))}
            </SevenColGrid>
            <ClenderBody fourcol={getDaysInMonth(currentMonth, currentYear) === 28}>
                {range(getDaysInMonth(currentMonth, currentYear)).map((day) => (
                    <StyledDay
                        onClick={() =>
                            onAddEvent(getDateObj(day, currentMonth, currentYear))
                        }
                        active={areDatesTheSame(
                            new Date(),
                            getDateObj(day, currentMonth, currentYear)
                        )}
                    >
                        <p>{day}</p>

                        {events.map(
                            (e) =>
                                areDatesTheSame(
                                    getDateObj(day, currentMonth, currentYear),
                                    e.date
                                ) && (
                                    <StyledEvent bgColor={e?.color}>
                                        {e.title}
                                        {dateFormater(e.date)}
                                    </StyledEvent>
                                )
                        )}

                        {blogData.map(
                            (e) =>
                                areDatesTheSame(
                                    getDateObj(day, currentMonth, currentYear),
                                    // new Date(dateFormater(e.date_saisie))
                                    new Date(2024, 2, 12)
                                ) && (
                                    <StyledEvent bgColor={e?.color}>
                                        {e.author}
                                        {dateFormater(e.date_saisie)}
                                    </StyledEvent>
                                )
                        )}
                    </StyledDay>
                ))}
            </ClenderBody>
        </Wrapper>
    );
};

export default Calendrier2;
