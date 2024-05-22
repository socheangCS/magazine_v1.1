import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Logo from "../assets/cs_black.png"
const ReactDraft = ({ setContent, data }) => {
  const editor = useRef(null);
  const [checkSave, setCheckSave] = useState(false);

  const convertToHTML = () => {
    if (editor.current) {
      const htmlContent = editor.current.value;
      setContent(htmlContent);
      setCheckSave(false);
    }
  };

  const config = {
    buttons: ['bold', 'italic', 'link', 'ul', 'ol', 'code'],
    height: 400,
    extraButtons: [{
      name: 'Insert Code',
      iconURL: Logo, 
      exec: (editor) => {
        const code = prompt('Enter your code:');
        if (code) {
          editor.s.insertHTML(`<pre><code>${hljs.highlightAuto(code).value}</code></pre>`);
        }
      }
    }],
    events: {
      afterSetMode: (newMode) => {
        if (newMode === 'wysiwyg') {
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
        }
      },
    },
  };

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, []);

  return (
    <div className='w-full flex flex-col gap-3'>
      <JoditEditor
        ref={editor}
        value={data || ''}
        config={config}
        onChange={() => setCheckSave(true)}
      />
      {checkSave && (
        <button
          onClick={convertToHTML}
          className='text-[12px] p-2 pl-6 pr-6 hover:bg-slate-500 duration-300 rounded-md bg-black text-white'
        >
          Save Draft
        </button>
      )}
    </div>
  );
};

export default ReactDraft;
