let num = document.getElementById('num');
        let tabletitle = document.getElementById('tabletitle');
        let tablelist = document.getElementById('tablelist');
        let outputscreen = document.getElementById('outputscreen');
        let inputscreen = document.getElementById('inputscreen');

        function generate() {
            let n = num.value;
            tabletitle.innerHTML = "Table of " + n;

            tablelist.replaceChildren();
            for (let i = 1; i<=10; i++){
                let elem = document.createElement('li');
                elem.innerHTML = `<span>${n}</span><span>x</span><span>${i}</span><span>=</span><span>${n * i}</span>`
                tablelist.appendChild(elem);
            }
            outputscreen.style.display = "flex";
            inputscreen.style.display = "none";
        }

        function back () {
            outputscreen.style.display = "none";
            inputscreen.style.display = "flex";
        }