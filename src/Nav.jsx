import React from 'react';
import './Nav.css';
import $ from 'jquery';
import Logo from './Logo';
import scrollToContainer from './scrollToContainer';

import { mixpanel } from './App';

const Nav = () =>
    <nav>
        <Logo />
        <a href="#about" onClick={handleClick}>Me</a>
        <a href="#experience" onClick={handleClick}>Projects</a>
        <a href="#writing" onClick={handleClick}>Writing</a>
        <a href="#contact" onClick={handleClick}>Contact Me</a>
    </nav>

export default Nav;

$(document).on('scroll', handleScroll);

function handleScroll () {
    const scrollPos = $(document).scrollTop();
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        $('nav a').removeClass('is-active');
        $('nav a:last-child').addClass('is-active');
    } else {
        $('nav a').each(function() {
            const $currLink = $(this);
            const $refEl = $( $currLink.attr('href') );
            if ($refEl.offset().top <= scrollPos + 200 && $refEl.offset().top + $refEl.height() > scrollPos) {
                $('nav a').removeClass('is-active');
                $currLink.addClass('is-active');
            } else {
                $currLink.removeClass('is-active');
            }
        });
    }    
}

const nextLink = () => {
    const $activeLink = $('nav .is-active');
    if ($activeLink) {
        return $activeLink.next('a');
    } else {
        return $('nav a:first-child');
    }
}
const prevLink = () => {
    const $activeLink = $('nav .is-active');
    if ($activeLink) {
        return $activeLink.prev('a');
    } else {
        return $('nav a:first-child');
    }
}

function queryToHTML($selection) {
    return $.parseHTML($selection[0].outerHTML)[0];
}

function handleKeydown (e) {
    if (e.which === 37 || e.which === 38) {
        if (prevLink().length > 0) {
            const link = queryToHTML(prevLink());
            scrollToContainer(link);
        }
    } else if (e.which === 39 || e.which === 40) {
        if (nextLink().length > 0) {
            const link = queryToHTML(nextLink());
            scrollToContainer(link);
        }
    }
};
$(document).on('keydown', handleKeydown);


function smoothScroll (e) {
    e.preventDefault();
    $(document).off('scroll');

    $('nav a').removeClass('is-active');
    $(e.target).addClass('is-active');
    scrollToContainer(e.target);
}

function handleClick (e) {
    $('nav a').removeClass('is-active');
    $(e.target).addClass('is-active');
    smoothScroll(e);
    mixpanel.track('Link Click', {
        'name': $(e.target).text()
    });
}

