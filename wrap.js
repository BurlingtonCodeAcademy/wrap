jsStringEscape = require('js-string-escape')

function wrap(original, width) {
    if (original.length > width) {
        let words = original.split(' ');
        // console.log(words)
        let column = 0;
        let line = '';
        let i = 0;
        while (i<words.length) {
            let word = words[i];
            let lastWord = (i === words.length - 1);
            column += word.length;
            if (column > width) {
                line = line.trim() + '\n' 
                if (lastWord) {
                    line += word;
                } else {
                    line += word + ' ';
                }
                column = word.length;
            } else {
                if (lastWord) {
                    line += word;
                } else {
                    line += word + ' ';
                }
            }
            console.log('---');
            console.log(line)

            i += 1;
        }
        return line;
    }
    return original;
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