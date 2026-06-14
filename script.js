async function translateText() {

    const text = document.getElementById("inputText").value;
    const target = document.getElementById("targetLang").value;

    if (text.trim() === "") {

        alert("Please enter text");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/translate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text,
                    target
                })
            }
        );

        const data = await response.json();

        document.getElementById("outputText").value =
            data.translatedText;

    } catch (error) {

        console.error(error);

        alert("Translation failed");
    }
}

function copyText() {

    const output =
        document.getElementById("outputText");

    navigator.clipboard.writeText(output.value);

    alert("Copied Successfully!");
}

function speakText() {

    const text =
        document.getElementById("outputText").value;

    if (text.trim() === "") {
        alert("No text to speak.");
        return;
    }

    const targetLang =
        document.getElementById("targetLang").value;

    const speech =
        new SpeechSynthesisUtterance(text);

    if (targetLang === "ta") {
        speech.lang = "ta-IN";
    }
    else if (targetLang === "hi") {
        speech.lang = "hi-IN";
    }
    else if (targetLang === "fr") {
        speech.lang = "fr-FR";
    }
    else {
        speech.lang = "en-US";
    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}