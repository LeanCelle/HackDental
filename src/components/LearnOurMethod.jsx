import React, { useEffect, useState, useRef } from "react";
import "../styles/LearnOurMethod.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgressSection = ({ number, imageSrc, title, description, items }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { offsetTop, offsetHeight } = ref.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const distanceScrolled = scrollY + windowHeight - offsetTop;
      const totalScrollable = windowHeight + offsetHeight;

      const newProgress =
        Math.max(0, Math.min(distanceScrolled / totalScrollable, 1)) * 100;
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
    className="learn-method-container"
    ref={ref}
    data-aos="fade-zoom-in"
    data-aos-easing="ease-in-back"
    data-aos-delay="100"
    data-aos-offset="0"
  >
    <div className="images-column">
      <img
        src={imageSrc}
        alt="Imagen mostrando el método correcto e incorrecto del marketing digital."
        className="status-image"
      />
    </div>

    <div className="all-scroll-bar">
      <p>{number}</p>
      {number !== "04" && (
        <div className="scroll-bar-container">
          <div
            className="scroll-bar-fill"
            style={{ height: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>

    <div className="listContainer">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul className="info-list">
        {items.map((text, idx) => (
          <li key={idx}>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="1rem"
                height="1rem"
              >
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#006a5a"
                />
                <path
                  d="M369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  fill="white"
                />
              </svg>
            </i>{" "}
            {text}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

const LearnOurMethod = () => {
  const sharedProps = {
    imageSrc: "/imagen-de-test.svg",
    title: (
      <>
        Recibe una auditoría
        <br />
        de marketing gratuita
      </>
    ),
    description: (
      <>
        Aprende más sobre nuestro <strong>programa de 180 días</strong> y cómo
        puede cambiar tu <strong>práctica dental</strong>
      </>
    ),
    items: [
      "Puedes ponerte en contacto con nosotros por correo",
      "Puedes ponerte en contacto con nosotros por correo",
      "Puedes ponerte en contacto con nosotros por correo",
    ],
  };

  return (
    <>
      <div className="logoContainer">
        <img src="/logo-test.svg" alt="Logo" />
      </div>

      <section className="learn-method-section">
        <h1 className="learn-method-title">
          Aprende de Nuestro Método Especializado
          <br />
          de Marketing Dental
          <img
            src="/microscope.png"
            alt="Icono de un microscopio."
            className="telescope-icon"
          />
        </h1>

        {[1, 2, 3, 4].map((n) => (
          <ProgressSection
            key={n}
            number={String(n).padStart(2, "0")}
            {...sharedProps}
          />
        ))}
      </section>
    </>
  );
};

export default LearnOurMethod;
