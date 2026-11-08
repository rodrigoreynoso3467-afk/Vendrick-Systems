import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry } from '../lib/inquiry.ts';
import { submitInquiry } from '../lib/submit-inquiry.ts';
const valid={name:'Launch test', email:'vendricksystems@gmail.com', description:'Please prepare a recurring report from our weekly exports.', budget:'Not sure yet', topic:'project', service:'not-sure', phone:''};
test('valid inquiry accepts optional phone omitted or populated',()=>{
 assert.ok(validateInquiry(valid));
 assert.ok(validateInquiry({...valid,phone:'+1 555 010 1234'}));
});
test('required fields, lengths, email, phone, topic and honeypot validated',()=>{
 for(const patch of [{name:''},{email:''},{description:''},{email:'bad-address'},{description:'short'},{phone:'x'.repeat(41)},{phone:'555\r\nheader'},{website:'spam'},{topic:'unknown'},{service:'unknown'},{budget:'unknown'}])assert.equal(validateInquiry({...valid,...patch}),null,JSON.stringify(patch));
});
test('form request reaches static endpoint and encodes submitted fields',async()=>{
 let request;
 await submitInquiry({...valid,'form-name':'vendrick-inquiry'},async(url,options)=>{
  request={url,...options}; return new Response('',{status:200,headers:{'x-nf-request-id':'test-acceptance'}});
 });
 assert.equal(request.url,'/__forms.html');assert.equal(request.method,'POST');
 const body=new URLSearchParams(request.body);assert.equal(body.get('form-name'),'vendrick-inquiry');assert.equal(body.get('email'),valid.email);
 assert.equal(request.redirect,'error');
});
test('failure, missing Netlify acceptance, redirect, timeout and network errors cannot show success',async()=>{
 for(const response of [new Response('',{status:404}),new Response('',{status:500}),new Response('',{status:200})])await assert.rejects(submitInquiry(valid,async()=>response));
 await assert.rejects(submitInquiry(valid,async()=>{throw new Error('network failure')}));
});
test('blueprint registers every possible form field and honeypot',async()=>{
 const {readFile}=await import('node:fs/promises');const html=await readFile(new URL('../public/__forms.html',import.meta.url),'utf8');
 for(const name of ['form-name','name','email','phone','company','description','topic','service','budget','tools','website'])assert.ok(html.includes('name="'+name+'"'),name);
 assert.ok(html.includes('netlify-honeypot="website"'));assert.ok(html.includes('data-netlify="true"'));
});
