import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [imc, setImc] = useState();
  const tailleRef = useRef(0);
  const poidsRef = useRef(0);
  const nameRef = useRef(0);
  const emailRef = useRef(0);
  const readData = async (e) => {
    e.preventDefault();
    const taille = tailleRef.current.value;
    const poids = poidsRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const result = await fetch("/imc", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taille, poids, name, email }),
    });
    const infos = await result.json();
    setImc(infos);
  };
  return (
    <section className="ligne container">
      <div className="logo column">
        <span style={{ fontSize: 30 }}>Caculez votre</span>
        <span>IMC</span>
      </div>
      <div className="column form">
        {imc ? (
          <div className="resultat">
            <p>Votre imc est: {imc['imc']}</p>
            <p>Il est: {imc['avis']}</p>
          </div>
        ) : (
          <form onSubmit={readData}>
            <p>
              <label htmlFor="taille">Votre taille</label> <br />
              <input
                type="number"
                name="taille"
                id="taille"
                placeholder="1.90"
                style={{ fontSize: 20 }}
                ref={tailleRef}
              />
            </p>
            <p>
              <label htmlFor="poids">Votre poids</label> <br />
              <input
                type="number"
                name="poids"
                id="poids"
                placeholder="90"
                style={{ fontSize: 20 }}
                ref={poidsRef}
              />
            </p>
            <p>
              <label htmlFor="nom">Votre nom</label> <br />
              <input
                type="text"
                name="nom"
                id="nom"
                placeholder="Achille"
                style={{ fontSize: 20 }}
                ref={nameRef}
              />
            </p>
            <p>
              <label htmlFor="email">Votre email</label> <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="accueil@chillo.tech"
                style={{ fontSize: 20 }}
                ref={emailRef}
              />
            </p>
            <button
              type="submit" 
              className="resultat"
            >
              Calculer
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default App;
