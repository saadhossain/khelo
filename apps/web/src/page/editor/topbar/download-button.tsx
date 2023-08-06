import { Button, HTMLSelect, Menu, Position, Slider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react-lite';
import { t } from 'polotno/utils/l10n';
import * as unit from 'polotno/utils/unit';
import { useState } from 'react';

export const DownloadButton = observer(({ store }: any) => {
  const [saving, setSaving] = useState(false);
  const [quality, setQuality] = useState(1);
  const [fps, setFPS] = useState(10);
  const [type, setType] = useState('png');
  const [loading, setLoading] = useState(false)
  const getName = () => {
    const texts: any = [];
    store.pages.forEach((p: any) => {
      p.children.forEach((c: any) => {
        if (c.type === 'text') {
          texts.push(c.text);
        }
      });
    });
    const allWords = texts.join(' ').split(' ');
    const words = allWords.slice(0, 6);
    return words.join(' ').replace(/\s/g, '-').toLowerCase() || 'polotno';
  };

  const saveCanvasAsImageToServer = async () => {
    setLoading(true)
    const dataURL = await store.toDataURL();
    console.log(dataURL)
    const base64ImageData = dataURL.split(',')[1];
    const formData = new FormData();
    formData.append('image', base64ImageData);
    const imgbbApi = '460277a64e943a5b0c6a7c361e13ac36'
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data.data.url);
      setLoading(false)
    } catch (error) {
      console.error('Failed to save image to server.', error);
      setLoading(false)
    }
  };
  return (
    <div className='flex gap-3 items-center'>
      <Popover2
        content={
          <Menu>
            <li className="bp4-menu-header">
              <h6 className="bp4-heading">File type</h6>
            </li>
            <HTMLSelect
              fill
              onChange={(e) => {
                setType(e.target.value);
                setQuality(1);
              }}
              value={type}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="pdf">PDF</option>
              <option value="html">HTML</option>
              <option value="gif">GIF</option>
            </HTMLSelect>

            {type !== 'html' && (
              <>
                <li className="bp4-menu-header">
                  <h6 className="bp4-heading">Size</h6>
                </li>
                <div style={{ padding: '10px' }}>
                  <Slider
                    value={quality}
                    labelRenderer={false}
                    // labelStepSize={0.4}
                    onChange={(quality) => {
                      setQuality(quality);
                    }}
                    stepSize={0.2}
                    min={0.2}
                    max={3}
                    showTrackFill={false}
                  />
                  {type === 'pdf' && (
                    <div>
                      {unit.pxToUnitRounded({
                        px: store.width,
                        dpi: store.dpi / quality,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      x{' '}
                      {unit.pxToUnitRounded({
                        px: store.height,
                        dpi: store.dpi / quality,
                        precious: 0,
                        unit: 'mm',
                      })}{' '}
                      mm
                    </div>
                  )}
                  {type !== 'pdf' && (
                    <div>
                      {Math.round(store.width * quality)} x{' '}
                      {Math.round(store.height * quality)} px
                    </div>
                  )}
                  {type === 'gif' && (
                    <>
                      <li className="bp4-menu-header">
                        <h6 className="bp4-heading">FPS</h6>
                      </li>
                      <div style={{ padding: '10px' }}>
                        <Slider
                          value={fps}
                          // labelRenderer={false}
                          labelStepSize={5}
                          onChange={(fps) => {
                            setFPS(fps);
                          }}
                          stepSize={1}
                          min={5}
                          max={30}
                          showTrackFill={false}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {type === 'html' && (
              <>
                <div style={{ padding: '10px', maxWidth: '180px', opacity: 0.8 }}>
                  Download as HTML File
                </div>
              </>
            )}
            <Button
              fill
              intent="primary"
              loading={saving}
              onClick={async () => {
                if (type === 'pdf') {
                  setSaving(true);
                  await store.saveAsPDF({
                    fileName: getName() + '.pdf',
                    dpi: store.dpi / quality,
                    pixelRatio: 2 * quality,
                  });
                  setSaving(false);
                } else if (type === 'html') {
                  setSaving(true);
                  await store.saveAsHTML({
                    fileName: getName() + '.html',
                  });
                  setSaving(false);
                } else if (type === 'gif') {
                  setSaving(true);
                  await store.saveAsGIF({
                    fileName: getName() + '.gif',
                    pixelRatio: quality,
                    fps,
                  });
                  setSaving(false);
                } else {
                  store.pages.forEach((page: any, index: any) => {
                    // do not add index if we have just one page
                    const indexString =
                      store.pages.length > 1 ? '-' + (index + 1) : '';
                    store.saveAsImage({
                      pageId: page.id,
                      pixelRatio: quality,
                      mimeType: 'image/' + type,
                      fileName: getName() + indexString + '.' + type,
                    });
                  });
                }
              }}
            >
              Download {type.toUpperCase()}
            </Button>
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button
          icon="import"
          text={t('toolbar.download')}
          intent="primary"
          loading={saving}
          onClick={() => {
            setQuality(1);
          }}
        />
      </Popover2>
    {/* <div className='flex items-center gap-2'>

        <button
          onClick={() => saveCanvasAsImageToServer()}
          className='py-1 px-3 rounded text-white bg-accent'
        >{loading ? 'Saving' : 'Save Design'}</button>
      </div> */}
    </div>
  );
});
