import { CompletionContext } from '@codemirror/autocomplete';
import {
  LRLanguage,
  LanguageSupport,
  delimitedIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
} from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';
import { parser } from './parser';

//语法高亮
const EXAMPLELanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ')', align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Identifier: tags.variableName,
        Boolean: tags.bool,
        String: tags.string,
        Number: tags.number,
        Blue: tags.blockComment,
        Green: tags.annotation,
        Table: tags.color,
        LineComment: tags.lineComment,
        '( )': tags.paren,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ';' },
  },
});

//关键字补全和提示
function EXAMPLE(option) {
  return new LanguageSupport(EXAMPLELanguage, [
    // EXAMPLELanguage.data.of({
    //   autocomplete: completeFromList(option),
    // }),
    EXAMPLELanguage.data.of({
      autocomplete: (context: CompletionContext) => {
        let word = context.matchBefore(/(#|@|.)(\w+)?/);
        console.log(context, word, 'word',option,'option');

        if (!word) return null;
        if (word && word.from == word.to && !context.explicit) {
          return null;
        }
        return {
          from: word?.from!,
          options: [...option],
        };
      },
    }),
  ]);
}

export { EXAMPLE, EXAMPLELanguage };
