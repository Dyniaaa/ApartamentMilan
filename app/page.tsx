"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const images = [
  {
    src: "/Salon1.jpg",
    alt: "Jasny salon apartamentu",
    label: "Salon",
  },
  {
    src: "/Sypialnia1.jpg",
    alt: "Nowoczesna sypialnia",
    label: "Sypialnia",
  },
  {
    src: "/Aneks1.jpg",
    alt: "Kuchnia z naturalnymi detalami",
    label: "Kuchnia",
  },
  {
    src: "/Łazienka1.jpg",
    alt: "Elegancka łazienka",
    label: "Łazienka",
  },
];
const navLinks = [
  ["O apartamencie", "about"],
  ["Galeria", "gallery"],
  ["Udogodnienia", "amenities"],
  ["Lokalizacja", "location"],
];
const amenities = [
  "Wi-Fi",
  "Bezpłatny parking",
  "W pełni wyposażona kuchnia",
  "Pralka",
  "Balkon z widokiem",
  "Smart TV",
];

function SectionHeading({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className={`${styles.sectionHeading} ${light ? styles.light : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (lightbox !== null && event.key === "ArrowRight")
        setLightbox((lightbox + 1) % images.length);
      if (lightbox !== null && event.key === "ArrowLeft")
        setLightbox((lightbox - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <main className={styles.site}>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <a
          className={styles.brand}
          href="#top"
          onClick={() => setMenuOpen(false)}
        >
          <strong>UM</strong>
          <span>
            Apartament
            <br />u Milana
          </span>
        </a>
        <nav className={styles.desktopNav}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={`#${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <button
          className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ""}`}
          aria-label="Otwórz menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i />
          <i />
          <i />
        </button>
        {menuOpen && (
          <nav className={styles.mobileNav}>
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className={styles.hero} id="top">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>
            Apartament u Milana <span>·</span> Busko-Zdrój
          </p>
          <h1>
            Przestrzeń
            <br />
            <em>do bycia.</em>
          </h1>
          <p className={styles.heroText}>
            Jasny, spokojny apartament na dobry odpoczynek. Zatrzymaj się na
            chwilę i poczuj się jak u siebie.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.textLinkLight} href="#gallery">
              Zobacz zdjęcia <span>↓</span>
            </a>
          </div>
        </div>
        <div className={styles.heroBottom}>
          <span>50° 28&apos; 05&quot; N</span>
          <span className={styles.scrollHint}>
            Przewiń <b>↓</b>
          </span>
          <span>20° 43&apos; 09&quot; E</span>
        </div>
      </section>

      <section className={styles.intro} id="about">
        <div className={styles.introLabel}>01 / O apartamencie</div>
        <div className={styles.introCopy}>
          <h2>
            Wszystko, czego <em>potrzebujesz.</em>
          </h2>
          <p>
            Apartament u Milana to miejsce stworzone z myślą o wygodnym i
            spokojnym pobycie w Busku-Zdroju. Jasne, nowoczesne wnętrze i
            wszystko, czego potrzebujesz na co dzień, pozwolą Ci po prostu
            odpocząć i poczuć się swobodnie. To dobre miejsce zarówno na
            weekendowy wyjazd, jak i dłuższy pobyt w mieście znanym z uzdrowisk,
            parków i spokojnej atmosfery.
          </p>
          <a className={styles.textLink} href="#amenities">
            Poznaj apartament <span>↗</span>
          </a>
        </div>
        <div className={styles.introStamp}>
          u<br />
          <b>M</b>
          <br />
          2026
        </div>
      </section>
      <section className={styles.featureImage}>
        <Image
          src="/Salon3.jpg"
          alt="Salon apartamentu"
          fill
          sizes="100vw"
        />
        <div>
          <span>01</span>
          <p>
            Światło, cisza
            <br />i dobry sen.
          </p>
        </div>
      </section>
      <section className={styles.amenities} id="amenities">
        <div className={styles.amenitiesTop}>
          <SectionHeading
            eyebrow="02 / Udogodnienia"
            title="Zadbaliśmy o szczegóły."
          />
          <p>
            Małe rzeczy robią dużą różnicę. Znajdziesz tu wszystko, co potrzebne
            do komfortowego pobytu.
          </p>
        </div>
        <div className={styles.amenityGrid}>
          {amenities.map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <i>+</i>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.gallery} id="gallery">
        <SectionHeading
          eyebrow="03 / Galeria"
          title="Zobacz, gdzie odpoczniesz."
        />
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <button
              className={styles.galleryItem}
              key={image.src}
              onClick={() => setLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span>
                {image.label} <b>↗</b>
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.quote}>
        <p>
          „Najlepsze miejsca nie
          <br /> robią dużo <em>hałasu.</em>”
        </p>
      </section>
      <section className={styles.location} id="location">
        <div>
          <SectionHeading eyebrow="04 / Lokalizacja" title="Busko-Zdrój." />
          <p className={styles.locationText}>
            Apartament położony jest w spokojnej części Buska-Zdroju. Rano kawa
            na balkonie, wieczorem gwiazdy zamiast miejskiego zgiełku.
          </p>
        </div>
        <div className={styles.map}>
          <iframe
            title="Lokalizacja Apartamentu u Milana"
            src="https://www.google.com/maps?q=Wary%C5%84skiego+52,+Busko-Zdr%C3%B3j&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <section className={styles.contactStrip} id="contact">
        <div>
          <span className={styles.contactLabel}>05 / Kontakt</span>
          <h2>
            Masz pytania?
            <br />
            <em>Jesteśmy tutaj.</em>
          </h2>
        </div>
        <div className={styles.contactLinks}>
          <a href="mailto:apartamentyuchnasta3@gmail.com">
            apartamentyuchnasta3@gmail.com <span>↗</span>
          </a>
          <a href="tel:+48884875800">
            +48 884 875 800 <span>↗</span>
          </a>
          <p>ul. Waryńskiego 52, Busko-Zdrój</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <a className={styles.brand} href="#top">
          <strong>UM</strong>
          <span>
            Apartament
            <br />u Milana
          </span>
        </a>
        <p>Spokojnie. Naturalnie. U siebie.</p>
        <a className={styles.phone} href="tel:+48884875800">
          +48 884 875 800
        </a>
        <span>© 2026 Apartament u Milana</span>
      </footer>

      {lightbox !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            className={styles.close}
            aria-label="Zamknij"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            className={styles.prev}
            aria-label="Poprzednie zdjęcie"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
          >
            ←
          </button>
          <div
            className={styles.lightboxImage}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              sizes="90vw"
            />
          </div>
          <button
            className={styles.next}
            aria-label="Następne zdjęcie"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
          >
            →
          </button>
          <span className={styles.counter}>
            {String(lightbox + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </main>
  );
}
