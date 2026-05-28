const colors = [
    { name: "Black", code: "#000000" },
    { name: "Red", code: "#ff0000" },
    { name: "Dark Red", code: "#8b0000" },
    { name: "Blue", code: "#0000ff" },
    { name: "Sky Blue", code: "#87ceeb" },
    { name: "Navy", code: "#000080" },
    { name: "Green", code: "#00ff00" },
    { name: "Dark Green", code: "#006400" },
    { name: "Lime", code: "#32cd32" },
    { name: "Yellow", code: "#ffff00" },
    { name: "Gold", code: "#ffd700" },
    { name: "Orange", code: "#ffa500" },
    { name: "Dark Orange", code: "#ff8c00" },
    { name: "Pink", code: "#ffc0cb" },
    { name: "Hot Pink", code: "#ff69b4" },
    { name: "Purple", code: "#800080" },
    { name: "Violet", code: "#ee82ee" },
    { name: "Indigo", code: "#4b0082" },
    { name: "Brown", code: "#8b4513" },
    { name: "Chocolate", code: "#d2691e" },
    { name: "Beige", code: "#f5f5dc" },
    { name: "Gray", code: "#808080" },
    { name: "Light Gray", code: "#d3d3d3" },
    { name: "Dark Gray", code: "#505050" },
    { name: "Cyan", code: "#00ffff" },
    { name: "Teal", code: "#008080" },
    { name: "Turquoise", code: "#40e0d0" },
    { name: "Magenta", code: "#ff00ff" },
    { name: "Lavender", code: "#e6e6fa" },
    { name: "Olive", code: "#808000" },
    { name: "Mint", code: "#98ff98" },
    { name: "Coral", code: "#ff7f50" },
    { name: "Salmon", code: "#fa8072" },
    { name: "Plum", code: "#dda0dd" },
    { name: "Khaki", code: "#f0e68c" },
    { name: "Azure", code: "#f0ffff" },
    { name: "Ivory", code: "#fffff0" },
    { name: "Maroon", code: "#800000" },
    { name: "Crimson", code: "#dc143c" },
    { name: "Orchid", code: "#da70d6" },
    { name: "Peru", code: "#cd853f" },
    { name: "Slate Blue", code: "#6a5acd" },
    { name: "Steel Blue", code: "#4682b4" },
    { name: "Forest Green", code: "#228b22" },
    { name: "Sea Green", code: "#2e8b57" },
    { name: "Spring Green", code: "#00ff7f" },
    { name: "Dodger Blue", code: "#1e90ff" },
    { name: "Deep Pink", code: "#ff1493" },
    { name: "Royal Blue", code: "#4169e1" }
];

let index = 0;

function changeColor() {
    const box = document.getElementById("colorBox");
    const name = document.getElementById("colorName");
    const number = document.getElementById("colorNumber");

    const current = colors[index];

    box.style.background = current.code;
    name.innerText = current.name;
    number.innerText = "Color No : " + (index + 1);

    const darkColors = [
        "Black","Dark Red","Navy","Dark Green","Purple","Indigo",
        "Brown","Crimson","Teal","Slate Blue","Royal Blue"
    ];

    const textColor = darkColors.includes(current.name) ? "white" : "black";

    name.style.color = textColor;
    number.style.color = textColor;

    index = (index + 1) % colors.length;
}