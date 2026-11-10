/* Wedding invitation: photo lightbox, countdown and animated falling flowers.
   Event date, location and bank QR images are in index.html for easy editing. */
'use strict';

// Subtle entrance animations (with accessible reduced-motion fallback).
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.reveal');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -20px 0px'});
  revealTargets.forEach((node, i) => observer.observe(node));
} else { revealTargets.forEach(node => node.classList.add('visible')); }

// Simple photo gallery: tap or click any photo to enlarge.
const dialog = document.getElementById('photo-dialog');
const dialogImage = document.getElementById('dialog-image');
const dialogDescription = document.getElementById('dialog-description');
document.querySelectorAll('[data-full]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.full;
    dialogImage.alt = button.dataset.alt || 'A couple portrait';
    dialogDescription.textContent = button.querySelector('.photo-mark')?.textContent || 'Our moments';
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

// 5 PM in Cambodia time (UTC +7), Sunday 20 December 2026.
const weddingDate = Date.parse('2026-12-20T17:00:00+07:00');
const countdown = document.getElementById('countdown');
function updateCountdown(){
  let remaining = Math.max(0, weddingDate - Date.now());
  if (!remaining) {
    countdown.hidden = true;
    document.getElementById('countdown-ended').hidden = false;
    return;
  }
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000); remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  for(const [id,n] of Object.entries({days,hours,minutes,seconds})) {
    document.getElementById(id).textContent = String(n).padStart(2,'0');
  }
}
updateCountdown();
setInterval(updateCountdown,1000);

// Animated flowers / petals drawn on a transparent overlay.
// A canvas avoids inserting dozens of heavy DOM elements on mobile.
const canvas = document.getElementById('flower-canvas');
if (!reducedMotion && canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1, flowers = [], last = 0, raf = 0;
  const palette = ['#fff0dc','#ecc5c0','#e7b9c2','#f7dfc8','#dcb887','#ffeddc'];
  const random = (min,max) => min + Math.random()*(max-min);
  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w*dpr);
    canvas.height = Math.round(h*dpr);
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = w < 700 ? 22 : 34;
    flowers = Array.from({length:count}, (_,i) => makeFlower(random(-20,w+20), random(-20,h+20), i%3===0));
  }
  function makeFlower(x,y,full){
    return {x,y,originX:x,phase:random(0,Math.PI*2),size:full?random(6,12):random(5,10),speed:random(11,31),drift:random(8,27),rotation:random(0,7),spin:random(-.4,.4),full,color:palette[Math.floor(Math.random()*palette.length)],opacity:random(.38,.87)};
  }
  function drawOne(f){
    ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rotation);ctx.globalAlpha=f.opacity;
    ctx.fillStyle=f.color;
    if(f.full){
      for(let j=0;j<5;j++){
        ctx.rotate(Math.PI*2/5);ctx.beginPath();
        ctx.ellipse(0,-f.size*.63,f.size*.42,f.size*.73,0,0,Math.PI*2);ctx.fill();
      }
      ctx.fillStyle='#e2bc79';ctx.beginPath();ctx.arc(0,0,f.size*.17,0,Math.PI*2);ctx.fill();
    } else {
      ctx.beginPath();ctx.moveTo(0,-f.size);ctx.bezierCurveTo(f.size*.85,-f.size*.7,f.size*.9,f.size*.2,0,f.size);
      ctx.bezierCurveTo(-f.size*.85,f.size*.3,-f.size*.65,-f.size*.65,0,-f.size);ctx.fill();
    }
    ctx.restore();
  }
  function animate(now){
    const dt=Math.min((now-last)/1000||.016,.06);last=now;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<flowers.length;i++){
      const f=flowers[i];f.y+=f.speed*dt;
      f.phase+=dt*1.1;f.x=f.originX+Math.sin(f.phase)*f.drift;f.rotation+=f.spin*dt;
      if(f.y>h+22){flowers[i]=makeFlower(random(-20,w+20),-22,f.full)}
      drawOne(f);
    }
    raf=requestAnimationFrame(animate);
  }
  resize();window.addEventListener('resize',resize,{passive:true});raf=requestAnimationFrame(animate);
  document.addEventListener('visibilitychange',()=>{last=performance.now();});
}
