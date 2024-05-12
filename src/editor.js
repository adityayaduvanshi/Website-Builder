import grapesjs, { Editor } from 'grapesjs';
import GjsEditor, { WithEditor, useEditorMaybe, Canvas } from '@grapesjs/react';

const Container = (props) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      {props.children}
    </div>
  );
};

function MyComponentWithUseEditorMaybe() {
  // The `editor` is not immediately available
  const editor = useEditorMaybe();
  editor.addComponents(`<div>
  <img src="https://path/image" />
  <span title="foo">Hello world!!!</span>
</div>`);

  return (
    <div>
      <div>I will be rendered immediately</div>
      <div>Editor: {editor ? 'created' : 'not yet created'}.</div>
    </div>
  );
}
export default function DefaultEditor() {
  const onEditor = (editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options

      options={{
        height: '94vh',
        storageManager: false,
        // panels: { defaults: [] },
        dragMode: true,

        traitManager: {},
        blockManager: {
          appendTo: '.myblocks',
          custom: true,
          blocks: [
            {
              id: 'image',
              label: 'Image',
              media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
              </svg>`,
              // Use `image` component
              content: { type: 'image' },
              // The component `image` is activatable (shows the Asset Manager).
              // We want to activate it once dropped in the canvas.
              activate: true,
              // select: true, // Default with `activate: true`
            },
          ],
        },
      }}
      onEditor={onEditor}
    >
      <WithEditor>
        <Canvas />
        <MyComponentWithUseEditorMaybe />
      </WithEditor>
    </GjsEditor>
  );
}
