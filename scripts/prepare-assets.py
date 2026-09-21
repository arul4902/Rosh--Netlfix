from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json, shutil, sys, subprocess, re
sys.path.insert(0, str(Path('.tools/python').resolve()))
import imageio_ffmpeg
out=Path('public/media'); out.mkdir(parents=True,exist_ok=True)
ids=['39b558e7-8706-40bf-bcc4-13dfd995866e','78dacd86-ae2b-4e05-adf6-1da775b394bf','dd78b8ad-f937-4dd8-9ee4-aae4b6a92514','5fa41d16-c31d-4a51-8de9-2a2dca8b2ecb','cd911d38-2625-42c3-b0cd-b47639086d6b','75b3eb96-9602-4cf9-80fe-d6b6b55f7878','0fe53871-abcc-4c1b-a868-7a1ae9b78f6f','3cf03ddd-d2b4-4d4d-81ea-fb0a5623edcb','2e38ec18-b174-406a-aa83-8a6a4dac6f93','23a19128-44ad-4ee6-bf9c-1a6da170b8cf','a0911b72-e64f-4e8e-b27e-cc96a4b89191','7c4efbf6-6c41-4a8b-8a2e-b2668b2dd3b2','dbc008a8-44b9-407c-afe8-b3aecbceacf8','6614e727-0d83-4ded-b191-02ec3da0d832','bc681d4e-b42f-48aa-9d4a-70cb56bf755a','2e332741-a849-4c7c-a991-c21cddd741b4']
for i,k in enumerate(ids,1):
 if i==16: continue
 im=Image.open(Path('C:/Users/User/AppData/Local/Temp')/f'codex-clipboard-{k}.png').convert('RGB')
 if i==1: im=im.transpose(Image.Transpose.ROTATE_270)
 if i==4: im=im.crop((0,98,429,861)).transpose(Image.Transpose.ROTATE_90)
 im.save(out/f'photo-{i:02}.webp',quality=90)
 im.thumbnail((480,640)); im.save(out/f'thumb-{i:02}.webp',quality=82)
prefixes=['rosh insta vid','AQNWjy_','AQMxFq','AQOg9','AQOls3','AQNJOY']
metadata=[]; sheet=Image.new('RGB',(900,640),'#181818'); d=ImageDraw.Draw(sheet)
ff=imageio_ffmpeg.get_ffmpeg_exe()
for i,prefix in enumerate(prefixes,1):
 src=next(Path('C:/Users/User/Downloads').glob(prefix+'*.mp4'))
 shutil.copy2(src,out/f'film-{i}.mp4')
 probe=subprocess.run([ff,'-i',str(src)],capture_output=True,text=True).stderr
 dur=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',probe)
 seconds=sum(float(v)*m for v,m in zip(dur.groups(),[3600,60,1])) if dur else 0
 dims=re.search(r'Video:.*? (\d{2,5})x(\d{2,5})',probe)
 metadata.append({'id':i,'source':src.name,'duration':seconds,'dimensions':list(dims.groups()) if dims else [],'audio':'Audio:' in probe})
 for j,fraction in enumerate([.15,.5,.8]):
  frame=out/f'film-{i}-frame-{j}.jpg'
  subprocess.run([ff,'-y','-ss',str(seconds*fraction),'-i',str(src),'-frames:v','1','-update','1',str(frame)],capture_output=True)
  im=Image.open(frame); im.thumbnail((140,270)); x=(i-1)%3*300+j*95; y=(i-1)//3*320+25
  im.thumbnail((93,275)); sheet.paste(im,(x,y));d.text(((i-1)%3*300+8,(i-1)//3*320+5),f'Film {i} / {seconds:.1f}s',fill='white')
  if j==1: Image.open(frame).save(out/f'film-{i}.webp',quality=85)
  frame.unlink()
Path('asset-video-analysis.json').write_text(json.dumps(metadata,indent=2))
sheet.save('video-contact-sheet.jpg')
print(json.dumps(metadata,indent=2))
