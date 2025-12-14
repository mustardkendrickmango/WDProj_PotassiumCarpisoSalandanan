const cards = document.querySelectorAll(".chr-card");
            const panel = document.getElementById("info-panel");
            const content = document.getElementById("char-desc");

            let activeCard = null;

            cards.forEach(card => {
                card.addEventListener("click", () => {
                    const info = card.querySelector(".chr-info");

                    if (activeCard === card) {
                        panel.classList.remove("show");
                        activeCard = null;
                        return;
                    }

                    content.innerHTML = info.querySelector(".info-content").innerHTML;

                    panel.classList.add("show");
                    activeCard = card;

                    panel.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                });
            });