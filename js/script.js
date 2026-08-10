/* =========================
   TV EHRENFELD DAMENVOLLEYBALL
   SCRIPT.JS
========================= */

/* =========================
   IMMER OBEN STARTEN
========================= */

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}


window.scrollTo(0, 0);


/* =========================
   TEAMS AUS teams.js LADEN
========================= */


const teamContainer =
document.getElementById("teamContainer");


const trainingContainer =
document.getElementById("trainingContainer");



if(teamContainer && trainingContainer && typeof teams !== "undefined"){



    teams.forEach(team => {



        /* =========================
           TEAMKARTE
        ========================= */


        const card = document.createElement("div");

        card.classList.add("team-card");



        card.innerHTML = `

<h3>
    ${team.name}
</h3>

<p>

${team.typ === "beach" ? `

<strong>Modus:</strong>

<br>

${team.modus}

` : `

<strong>Liga:</strong>

<br>

${team.liga || "Kein Ligabetrieb"}

`}

</p>

<p>

    <strong>
        Jahrgang:
    </strong>

    <br>

    ${team.jahrgang}

</p>

<div class="mobile-card">

    <button class="team-info-btn">
        Mehr Infos
    </button>

</div>

${team.link && team.link.trim() !== "" ? `

<a
href="${team.link}"
class="team-link"
target="_blank">

    Zur Mannschaftsseite

</a>

` : `

<a class="no-link">
    -- nicht vorhanden --
</a>

`}

`;



        teamContainer.appendChild(card);


const infoButton = card.querySelector(".team-info-btn");

if(infoButton){

    infoButton.addEventListener("click", () => {

        const modalBody =
        document.getElementById("modalBody");

        modalBody.innerHTML = `

            <h2>${team.name}</h2>

            <p>

                <strong>Liga:</strong>

                <br>

                ${team.liga || "Kein Ligabetrieb"}

            </p>

            <p>

                <strong>Jahrgang:</strong>

                <br>

                ${team.jahrgang}

            </p>

            <hr>

            <h3>Trainingszeiten</h3>

            ${team.training.map(training => `

                <p>

                    <strong>${training.tag}</strong>

                    <br>

                    ${training.zeit}

                    <br>

                    <a
                    href="${training.maps}"
                    target="_blank"
                    class="location">

                        📍 ${training.halle}

                    </a>

                </p>

            `).join("")}

        `;

        document
            .getElementById("teamModal")
            .classList.add("show");
            
        document.body.classList.add("no-scroll"); 


    });

}



        /* =========================
   TRAININGSTABELLE
========================= */


let training1 = "";
let training2 = "";



if(team.training[0]) {


    training1 = `

        <strong>
        ${team.training[0].tag}
        </strong>

        <br>

        ${team.training[0].zeit}

        <br><br>

        <a 
href="${team.training[0].maps}"
target="_blank"
class="location">

📍 ${team.training[0].halle}

</a>

    `;

}



if(team.training[1]) {


    training2 = `

        <strong>
        ${team.training[1].tag}
        </strong>

        <br>

        ${team.training[1].zeit}

        <br><br>

        <a 
href="${team.training[1].maps}"
target="_blank"
class="location">

📍 ${team.training[1].halle}

</a>

    `;

}



const row =
document.createElement("tr");



row.innerHTML = `


<td>

${team.name}

</td>


<td>

${training1}

</td>


<td>

${training2}

</td>


`;



trainingContainer.appendChild(row);


    });


}
else {


    console.error(
        "Teams konnten nicht geladen werden. Prüfe teams.js und die Einbindung."
    );


}


/* =========================
   SCROLL ANIMATIONEN
========================= */


const animatedElements =
document.querySelectorAll(
    ".team-card, .feature-grid div, .welcome p, .training table, .contact form"
);


const observer =
new IntersectionObserver(


(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });


},


{
    threshold:0.15
}


);




animatedElements.forEach(element=>{


    element.classList.add("hidden");


    observer.observe(element);


});







/* =========================
   SMOOTH SCROLL
========================= */


document.querySelectorAll('a[href^="#"]')
.forEach(link=>{


    link.addEventListener("click",(event)=>{


        const target =
        document.querySelector(
            link.getAttribute("href")
        );


        if(target){


            event.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});



/* =========================
   KONTAKT TEAM AUS teams.js
========================= */


const teamSelect = document.getElementById("teamSelect");


if(teamSelect && typeof teams !== "undefined"){


    teams.forEach(team => {


        const option = document.createElement("option");


        option.value = team.name;


        option.textContent = team.name;


        teamSelect.appendChild(option);


    });


}

// Verhindert, dass Spam-Bots die E-Mail-Adresse im HTML finden
document.addEventListener("DOMContentLoaded", function() {
    const mailLink = document.getElementById("secure-mail-link");
    if (mailLink) {
        const user = "tve.damenvolleyball";
        const domain = "gmail.com";
        
        // Erst beim Laden der Seite im Browser wird der Link zusammengebaut
        mailLink.href = "mailto:" + user + "@" + domain;
        mailLink.innerHTML = '<img src="icons/envelope.svg" class="icon" alt=""> E-Mail an TVE Damenvolleyball';
    }
});





/* =========================
   KONTAKTFORMULAR
========================= 


const contactForm = document.getElementById("contactForm");


if(contactForm){

    contactForm.addEventListener("submit", function(event){

        event.preventDefault();


        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const team = document.getElementById("teamSelect").value;
        const jahrgang = document.getElementById("jahrgang").value;
        const experience = document.getElementById("experience").value;
        const message = document.getElementById("message").value;


        const subject = 
        "Probetraining TV Ehrenfeld";


        const body =
`Name: ${name}

E-Mail: ${email}

Mannschaft: ${team}

Jahrgang: ${jahrgang}

Erfahrung: ${experience}

Nachricht:
${message}`;


        window.location.href =
        `mailto:tve.damenvolleyball@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


    });

}*/

/* =========================
   MODAL (ÖFFNEN, SCHLIESSEN & SCROLL-SPERRE)
========================= */

const modal = document.getElementById("teamModal");

if(modal){

    const closeButton = modal.querySelector(".close-modal");

    // Funktion zum Schließen des Modals & Aktivieren des Scrollens
    const closeModalWindow = () => {
        modal.classList.remove("show");
        document.body.classList.remove("no-scroll"); // Gibt das Scrollen der Seite wieder frei
    };

    // Klick auf das "X" schließt das Modal
    closeButton.addEventListener("click", closeModalWindow);

    // Klick auf den dunklen Hintergrund schließt das Modal
    modal.addEventListener("click", (event) => {
        if(event.target === modal){
            closeModalWindow();
        }
    });

}
