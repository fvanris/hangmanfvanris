
const A = 65;
const Z = 90;

const words = [];

for (let chr = A; chr <= Z; ++chr) {
    const text = require("./" + String.fromCharCode(chr) + ".js").default;
    const lines = text.split('\n');
    const re = /^\w+$/;
    lines.forEach(line => {
        if (line.length < 6 || 10 < line.length || !re.test(line))
            return;
        words.push(line.toLocaleUpperCase());
    });
}

export default words;
