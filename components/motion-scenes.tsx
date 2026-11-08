"use client";
import {useEffect} from 'react';
/** Optional enhancement only: navigation, controls, and content remain native HTML. */
export function MotionScenes(){
useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const sections=Array.from(document.querySelectorAll<HTMLElement>('.workflow-story,.service-lab,.sample-cta,.process,.cta'));const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){(e.target as HTMLElement).dataset.revealed='true';observer.unobserve(e.target);}});},{threshold:0.08});sections.forEach(el=>{el.dataset.reveal='ready';observer.observe(el);});return()=>{observer.disconnect();sections.forEach(el=>{delete el.dataset.reveal;delete el.dataset.revealed;});};},[]);return null;}
