import React from "react";
import Search from "./mini/Search";
import { ReactComponent as LogoIcon } from "../assets/icons/tv.svg";
import { ReactComponent as HamburgerIcon } from "../assets/icons/Menu.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/Home.svg";
import { ReactComponent as MovieIcon } from "../assets/icons/Movie_Projector.svg";
import { ReactComponent as TVIcon } from "../assets/icons/TV_Show.svg";
import { ReactComponent as CalendarIcon } from "../assets/icons/Calendar.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/Logout.svg";

import style from './Header.module.css'
import { NavLink } from "react-router-dom";

interface HeaderProps {
    sidebar?: boolean;
    mini?: boolean;
    children?: React.ReactNode;
}
function Header(props: HeaderProps) {
    return (
        <>
            {props.mini ? 
            <header id={style["site-header"]} className={style.mini}>
                <div className={style.icon}>
                    <span>
                        <LogoIcon />
                    </span>
                    <span>
                        MovieBox
                    </span>
                </div>
                <Search/>
                <div className={style.menu}>
                    <span>Sign in</span>
                    <span>
                        <HamburgerIcon/>
                    </span>
                </div>
            </header> : 
            <header id={style["site-header"]} className={style.navbar}>
                <div className={style.icon}>
                    <span>
                        <LogoIcon />
                    </span>
                    <span>
                        MovieBox
                    </span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" end>
                                <span><HomeIcon /></span>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" 
                            className={style.active}>
                                <span><MovieIcon /></span>
                                <span>Movies</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#">
                                <span><TVIcon /></span>
                                <span>TV Series</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#">
                                <span><CalendarIcon /></span>
                                <span>Upcoming</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div>
                    <p>Play movie quizzes and earn free tickets</p>
                    <p>50k people are playing now</p>
                    <span>
                        Start playing
                    </span>
                </div>
                <div>
                    <span><LogoutIcon /></span>
                    <span>Logout</span>
                </div>
            </header>
            }
        </>
    )
}

export default Header