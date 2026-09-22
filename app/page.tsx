 'use client';

import { useEffect, useRef, useState } from 'react';

const photos = [
  '/photos/dita.jpg',
  '/photos/photo-2.jpg',
  '/photos/photo-3.jpg',
  '/photos/photo-4.jpg',
];

export default function Home() {
  const [musicOn, setMusicOn] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const target = new Date('2026-12-31T00:00:00');
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor(diff / 3600000) % 24);
      setMinutes(Math.floor(diff / 60000) % 60);
      setSeconds(Math.floor(diff / 1000) % 60);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        alert('Tambahkan file public/music/birthday.mp3 terlebih dahulu.');
      }
    }
  };

  const openSurprise = () => {
    setSurprise(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <main>
      <audio ref={audioRef} src="/music/birthday.mp3" loop />

      <nav className="nav">
        <a href="#home" className="logo">♡ Dhita</a>
        <div className="navlinks">
          <a href="#story">Story</a>
          <a href="#gallery">Gallery</a>
          <a href="#letter">Letter</a>
        </div>
        <button className="musicBtn" onClick={toggleMusic}>
          {musicOn ? '♫ Playing' : '♫ Music'}
        </button>
      </nav>

      <section id="home" className="hero">
        <div className="stars" />
        <div className="heroGlow" />
        <div className="heroContent">
          <p className="eyebrow">A little surprise made with love</p>
          <h1>Happy Birthday,<br /><span>Dhita</span> ♡</h1>
          <p className="heroText">
            Untuk seseorang yang membuat hari-hari biasa terasa jauh lebih indah.
          </p>
          <button className="primary" onClick={openSurprise}>Buka Kejutan 🎁</button>
          <a className="scroll" href="#message">↓ scroll pelan-pelan</a>
        </div>
        <div className="floatingHeart">♥</div>
      </section>

      <section id="message" className="section center">
        <p className="eyebrow">Today is about you</p>
        <h2>Selamat ulang tahun, Dhita.</h2>
        <p className="lead">
          Semoga di usia yang baru ini kamu selalu menemukan alasan untuk tersenyum,
          dikelilingi orang-orang yang tulus, dan mendapatkan hal-hal baik yang kamu
          perjuangkan.
        </p>
        <div className="quoteCard">
          <span>“</span>
          Terima kasih sudah hadir dan menjadi bagian indah dari perjalanan hidupku.
          <span>”</span>
        </div>
      </section>

      <section id="story" className="section">
        <div className="sectionHead">
          <p className="eyebrow">Our little story</p>
          <h2>Beberapa hal yang ingin kuingat</h2>
        </div>
        <div className="timeline">
          {[
            ['01', 'Pertama kali bertemu', 'Dari sebuah pertemuan sederhana, ternyata bisa lahir begitu banyak cerita.'],
            ['02', 'Momen-momen kecil', 'Obrolan, tawa, dan hal-hal sederhana yang akhirnya menjadi kenangan.'],
            ['03', 'Hari ini', 'Hari ini adalah tentang kamu. Tentang bertambahnya satu tahun cerita baru.'],
            ['04', 'Untuk ke depannya', 'Semoga langkahmu selalu membawa kamu ke tempat-tempat yang membuatmu bahagia.'],
          ].map(([n, title, text]) => (
            <article className="timelineItem" key={n}>
              <div className="number">{n}</div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="sectionHead">
          <p className="eyebrow">Little memories</p>
          <h2>Foto-foto yang ingin kuabadikan</h2>
          <p className="muted">Ganti file di folder <b>public/photos</b> dengan foto pilihanmu.</p>
        </div>
        <div className="gallery">
          {photos.map((src, i) => (
            <div className={`photo p${i}`} key={src}>
              <img src={src} alt={`Kenangan ${i + 1}`} onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = '0';
              }} />
              <div className="photoFallback">Foto {i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="letter" className="section letterSection">
        <div className="envelope">
          <div className="seal">♥</div>
          <p className="eyebrow">A letter for you</p>
          <h2>Untuk Dhita</h2>
          <div className="letter">
            <p>Hai, Dhita.</p>
            <p>
              Hari ini aku cuma ingin mengingatkan kamu bahwa kamu adalah seseorang
              yang sangat berarti. Aku berharap tahun baru dalam hidupmu membawa
              lebih banyak kebahagiaan, kesehatan, keberanian, dan mimpi-mimpi yang
              menjadi nyata.
            </p>
            <p>
              Tetaplah menjadi dirimu sendiri. Terus berjalan, terus bertumbuh,
              dan jangan lupa menikmati setiap hal kecil yang membuatmu bahagia.
            </p>
            <p>Selamat ulang tahun, Dhita. 🤍</p>
            <p className="signature">— someone who cares about you</p>
          </div>
        </div>
      </section>

      <section id="countdown" className="section center">
        <p className="eyebrow">Counting the moments</p>
        <h2>Menuju ulang tahun berikutnya</h2>
        <div className="countdown">
          {[[days,'Days'],[hours,'Hours'],[minutes,'Minutes'],[seconds,'Seconds']].map(([v,l]) => (
            <div className="timeBox" key={l as string}><strong>{String(v).padStart(2,'0')}</strong><span>{l}</span></div>
          ))}
        </div>
      </section>

      <section className={`finale ${surprise ? 'show' : ''}`}>
        <div className="confetti" />
        <div className="finaleCard">
          <div className="bigHeart">♥</div>
          <p className="eyebrow">One last thing</p>
          <h2>Happy Birthday, Dhita!</h2>
          <p>
            Semoga tahun ini menjadi salah satu bab terbaik dalam hidupmu.
            Jangan berhenti bermimpi, jangan berhenti tersenyum.
          </p>
          <div className="love">I LOVE YOU ♡</div>
          <button className="primary" onClick={() => setSurprise(false)}>Tutup kejutan</button>
        </div>
      </section>

      <footer>Made with ♡ especially for Dhita</footer>
    </main>
  );
}
