"""Local route, link, anchor, asset and metadata smoke checks; no browser automation."""
from html.parser import HTMLParser
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit, unquote
import sys
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
routes=['/','/services','/about','/projects','/contact','/privacy','/careers','/investors','/suppliers','/updates','/demo?example=reporting','/demo?example=cleanup','/demo?example=files']
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.assets=[];self.ids=set();self.h1=0;self.description=False;self.title=False;self.main=False;self.lang=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag in ['img','script','source'] and a.get('src'):self.assets.append(a['src'])
  if tag=='meta' and a.get('name')=='description' and a.get('content'):self.description=True
  if tag=='title':self.title=True
  if tag=='h1':self.h1+=1
  if tag=='main':self.main=True
  if tag=='html' and a.get('lang')=='en':self.lang=True
cache={};fail=[];assets=set();links=set()
def page(path):
 if path not in cache:
  with urlopen(base+path,timeout=20) as r:
   assert r.status==200,(path,r.status)
   p=Page();p.feed(r.read().decode());cache[path]=p
 return cache[path]
for route in routes:
 try:
  p=page(route)
  assert p.h1==1 and p.description and p.title and p.main and p.lang,('semantics',route)
  for link in p.links:
   url=urlsplit(urljoin(base+route,link))
   if url.netloc==urlsplit(base).netloc:links.add((url.path+('?' +url.query if url.query else ''),unquote(url.fragment)))
  assets.update(p.assets)
 except Exception as e:fail.append(str(e))
for path,fragment in links:
 try:
  target=page(path)
  if fragment:assert fragment in target.ids,('missing fragment',path,fragment)
 except Exception as e:fail.append(str(e))
for asset in assets|{'/social.png','/images/vendrick-earth.webp','/images/vendrick-logo.png','/__forms.html','/sitemap.xml','/robots.txt'}:
 try:
  with urlopen(urljoin(base,asset),timeout=20) as r:assert r.status==200,(asset,r.status)
 except Exception as e:fail.append(str(e))
try:
 urlopen(base+'/this-page-does-not-exist',timeout=15);fail.append('missing 404')
except HTTPError as e:
 if e.code!=404:fail.append('unexpected 404 status '+str(e.code))
except Exception as e:fail.append(str(e))
print({'pages':len(routes),'unique_internal_links':len(links),'assets':len(assets),'failures':fail})
if fail:sys.exit(1)
