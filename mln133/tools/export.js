const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file:///home/user/mln122/mln133/index.html');await p.waitForTimeout(800);
const ids=await p.evaluate(()=>SLIDES.map(s=>[s.id,(()=>{let m=0;s.nodes.forEach(n=>m=Math.max(m,n.s||0));(s.edges||[]).forEach(e=>m=Math.max(m,e[4]||0));return m})()]));
const STATES={A4:[[2,2,' · chừa chỗ trống'],['max',2,' · đáp án']],A6:[[1,1,' · phân nhóm'],['max',1,' · đáp án']]};
const out=[];
for(const [id,mx] of ids){
  const sts=STATES[id]||[['max',0,'']];
  for(const [st,base,suf] of sts){
    const step=st==='max'?mx:st;
    await p.goto('file:///home/user/mln122/mln133/index.html#'+id+'/'+step);await p.reload();await p.waitForTimeout(700);
    const d=await p.evaluate(({id,base,suf,step,partial})=>{
      const sl=SLIDES.find(s=>s.id===id),stg=document.querySelector('.stage');
      const nmap={};sl.nodes.forEach(n=>nmap[n.id]=n);
      const off=el=>{let x=0,y=0,e=el;while(e&&e!==stg){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent}return{x,y,w:el.offsetWidth,h:el.offsetHeight}};
      const filled=stg.classList.contains('filled'),hlon=stg.classList.contains('hlon');
      const runs=(node,out,fl)=>{node.childNodes.forEach(c=>{
        if(c.nodeType===3){if(c.textContent)out.push({t:c.textContent,b:fl.b,r:fl.r})}
        else if(c.nodeType===1){
          if(c.tagName==='BR'){out.push({nl:1});return}
          if(c.classList.contains('blank')){out.push({t:filled?'dân':'……………',b:true,r:true});return}
          const f={...fl};if(c.tagName==='B')f.b=f.r=true;if(c.tagName==='MARK'&&hlon)f.b=f.r=true;
          runs(c,out,f)}})};
      const nodes=[];
      stg.querySelectorAll('.node').forEach(el=>{
        if(el.classList.contains('gone'))return;
        const n=nmap[el.dataset.id];const phOnly=partial&&(n.s||0)>step;if(phOnly&&n.type!=='hub')return;
        const type=n.type,r=off(el);
        const o={id:n.id,type,s:n.s||0,x:r.x,y:r.y,w:r.w,h:r.h,fs:parseFloat(getComputedStyle(el).fontSize),
          who:n.who||null,xs:(n.x||[]),alert:(n.alert!=null&&step>=n.alert),alertStep:(n.alert!=null?n.alert:null),xcode:n.xcode||null,phOnly};
        const txt=el.querySelector('.txt');
        if(type==='chips'){o.chip={head:txt.querySelector('.ch').textContent,items:[...txt.querySelectorAll('.chip')].map(a=>a.textContent)}}
        else if(type==='xcard'){o.xc={code:txt.querySelector('.xc').textContent,b:txt.querySelector('.xt b').textContent,e:txt.querySelector('.xt em').textContent}}
        else{const rr=[];runs(txt,rr,{b:type==='hub',r:false});o.runs=rr}
        nodes.push(o)});
      const edges=[];
      stg.querySelectorAll('svg.edges path.e').forEach(pa=>{
        const d=pa.getAttribute('d');if(!d)return;
        const kind=[...pa.classList].find(c=>c.startsWith('e-')).slice(2);
        const tk=d.match(/[MLQ]|-?\d+(\.\d+)?/g);const pts=[];let i=0,cmd;
        while(i<tk.length){if(/[MLQ]/.test(tk[i])){cmd=tk[i++];continue}
          if(cmd==='M'||cmd==='L'){pts.push([+tk[i],+tk[i+1]]);i+=2}else{pts.push([+tk[i],+tk[i+1]]);i+=4}}
        const lab=pa.nextElementSibling&&pa.nextElementSibling.classList.contains('elab')?pa.nextElementSibling:null;
        let L=null;if(lab&&lab.classList.contains('on')){const r=lab.querySelector('rect');L={t:lab.querySelector('text').textContent,x:+r.getAttribute('x'),y:+r.getAttribute('y'),w:+r.getAttribute('width')}}
        edges.push({kind,pts,need:+pa.dataset.need||0,on:pa.classList.contains('on'),lab:L})});
      return{id:id+suf,rawid:id,title:sl.title,part:sl.part,cover:!!sl.cover,base,step,nodes,edges}
    },{id,base,suf,step,partial:st!=='max'});
    out.push(d);
  }
}
fs.writeFileSync('/tmp/claude-0/pp/slides.json',JSON.stringify(out));
console.log(out.length,out.map(o=>o.id+':'+o.nodes.length+'/'+o.edges.length).join(' '));
await b.close()})();
