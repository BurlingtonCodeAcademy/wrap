jsStringEscape = require('js-string-escape')

function wrap(original, maximumWidth) {
    let words = original.split(' ');
    let lines = words.reduce(wrapWord, ['']);
    return lines.join('\n').trim();

    function wrapWord(lines, word) {
        let line = lines.pop();
        const newLength = (line.length + word.length + 1);
        if (newLength > maximumWidth) {
            lines.push(line.trim());
            line = '';
        }
        line += word + ' ';
        lines.push(line);
        return lines;
    }
    
}















function oldwrap(original, width) {
    let words = original.split(' ');
    let column = 0;
    let line = '';

    let i = 0;
    while (i < words.length) {
        let word = words[i];

        let lastWord = (i === words.length - 1);
        ({ column, line } = handleNextWord(column, word, width, line, lastWord));
        
        i += 1;
    }
    return line;
}

function handleNextWord(column, word, width, line, lastWord) {
    column += word.length;
    if (column > width) {
        line = line.trim() + '\n';
        line = addWord(line, word, lastWord);
        column = word.length;
    }
    else {
        line = addWord(line, word, lastWord);
    }
    return { column, line };
}

function addWord(line, word, lastWord) {
    if (lastWord) {
        line += word;
    }
    else {
        line += word + ' ';
    }
    return line;
}

function assert(value, why) {
    if (value) {
      console.log("Success: " + why);
    } else {
      console.error(new Error("Failure: " + why).stack.slice(0,3));
    }
}

function assertEqual(actualOutput, expectedOutput, why) {
    if (actualOutput === expectedOutput) {
        console.log("\x1b[32mSuccess:\x1b[0m " + why + "\n");
    }
    else {
        console.log(
            "\x1b[31mFailure:\x1b[0m " + why + "\n" +
            "      Expected: '" + jsStringEscape(expectedOutput) + "'\n" +
            "        Actual: '" + jsStringEscape(actualOutput) + "'"
        );
    }
}




assertEqual(wrap(''), '', 'empty string');
assertEqual(wrap('avocado toast', 20) , 'avocado toast', 'string is less than the width')
assertEqual(wrap('avocado toast', 10) , 'avocado\ntoast', 'with two words')
assertEqual(wrap('steel cut oats', 10) , 'steel cut\noats', 'with three short words')
assertEqual(wrap('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 12), 
    'Lorem ipsum\n' +
    'dolor sit\n' + 
    'amet,\n' + 
    'consectetur\n' + 
    'adipiscing\n' + 
    'elit.',
     'a really long sentence')

// 'punctuation'