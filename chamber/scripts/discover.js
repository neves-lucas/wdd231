var actual = new Date();

function mostrarCalendario(year, month) {
    const now = new Date(year, month - 1, 1);
    const last = new Date(year, month, 0);
    const primerDiaSemana = now.getDay();
    const ultimoDiaMes = last.getDate();
    let dia = 0;
    let resultado = "<tr>";
    const last_cell = primerDiaSemana + ultimoDiaMes;

    for (let i = 1; i <= 42; i++) {
        if (i == primerDiaSemana + 1) {
            dia = 1;
        }
        if (i <= primerDiaSemana || i >= last_cell) {
            resultado += "<td>&nbsp;</td>";
        } else {
            if (
                dia == actual.getDate() &&
                month == actual.getMonth() + 1 &&
                year == actual.getFullYear()
            )
                resultado += "<td class='hoy'>" + dia + "</td>";
            else
                resultado += "<td style='background-color: silver;'>" + dia + "</td>";
            dia++;
        }
        if (i % 7 == 0) {
            if (dia > ultimoDiaMes) break;
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const nextMonth = month + 1 > 12 ? 1 : month + 1;
    const nextYear = month + 1 > 12 ? year + 1 : year;
    const prevMonth = month - 1 < 1 ? 12 : month - 1;
    const prevYear = month - 1 < 1 ? year - 1 : year;

    document.getElementById("calendar").getElementsByTagName("caption")[0].innerHTML =
        `<div>${meses[month - 1]} / ${year}</div>` +
        `<div><a href='javascript:void(0)' onclick='mostrarCalendario(${prevYear},${prevMonth})'>&lt;</a>` +
        `<a href='javascript:void(0)' onclick='mostrarCalendario(${nextYear},${nextMonth})'>&gt;</a></div>`;

    document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML = resultado;
}

window.onload = function () {
    mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);

    const imagesDiv1 = [
        'images/event1.webp',
        'images/event2.webp',
        'images/event3.webp'
    ];

    const imagesDiv2 = [
        'images/event4.webp',
        'images/event5.webp',
        'images/event6.webp'
    ];

    function updateImages(imagesArray, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} não encontrado!`);
            return;
        }
        
        const imageElements = container.querySelectorAll('.dynamic-image');
        
        console.log(`Atualizando imagens de ${containerId}:`, imageElements);
        
        if (imageElements.length === 0) {
            console.error(`Nenhuma imagem encontrada para ${containerId}!`);
            return;
        }

        imageElements.forEach((img, index) => {
            if (index < imagesArray.length) {
                img.src = imagesArray[index];
                img.onload = () => console.log(`Imagem ${index + 1} carregada: ${imagesArray[index]}`);
                img.onerror = () => console.error(`Erro ao carregar imagem: ${imagesArray[index]}`);
            }
        });
    }

    setTimeout(() => {
        updateImages(imagesDiv1, 'div1');
        updateImages(imagesDiv2, 'div2');
    }, 500);
};