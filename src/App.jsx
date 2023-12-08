import { Gradient } from "../public/Gradient.js";
import { useState, useEffect } from "react";

function App() {
    const [input, setInput] = useState("");
    const [retorno, setRetorno] = useState("");
    const [select, setSelect] = useState("5");
    const [modelo, setModelo] = useState("1");

    useEffect(() => {
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
	}, []);



    function handleChangeInput(e) {
        e.preventDefault();

        setInput(e.target.value);
    }

    async function handleButton() {
        console.log('fetch https://flask-lstm.onrender.com/prever-palavra')
        const response = await fetch('https://flask-lstm.onrender.com/prever-palavra', {
            method: "POST",
            mode: "cors",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
             body: JSON.stringify({
                "frase": input,
                "nPalavra": Number(select),
                "modelo": Number(modelo)
            }),
          });
          console.log(response)
          const data = await response.json();
          setRetorno(data.frasePrevista);
    }   

    return (
        <>
            <canvas id="gradient-canvas" data-js-darken-top data-transition-in />
            <div className="container">
                <main className="glass">
                    <h1>Next Word Prediction using AI 🤖</h1>
                    <input className="gradient-border" placeholder="Digite aqui" value={input} onChange={handleChangeInput}></input>
                    {retorno.length > 0 && <p>{retorno}</p>}
                    <footer>
                        <div>
                            <span>Qtd. Palavras</span>
                            <select value={select} onChange={(e) => setSelect(e.target.value)}>
                                <option value="1">Uma palavra</option>
                                <option value="2">Duas palavras</option>
                                <option value="3">Três palavras</option>
                                <option value="4">Quatro palavras</option>
                                <option value="5">Cinco palavras</option>
                            </select>
                        </div>
                        <div>
                            <span>Modelo treinado</span>
                            <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
                                <option value="1">Mais rápido (~15seg)</option>
                                <option value="2" disabled={true}>Mais lento (~300seg)</option>
                            </select>
                        </div>
                    </footer>
                    <button className="btn" onClick={handleButton}>Prever </button>
                </main>
            </div>
        </>
    );
}

export default App;
