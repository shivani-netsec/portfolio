// ── Floating Particles ──
var techItems = ['Nmap','Wireshark','Python','Metasploit','Burp Suite','OSINT','CTF','YARA','Splunk','Linux','Kali','MITRE'];
var colors = ['#00ff41','#00cc33','#39ff14'];

function spawnParticle() {
  var p = document.createElement('div');
  p.className = 'particle';
  var size = Math.random() * 3 + 1;
  var color = colors[Math.floor(Math.random() * colors.length)];
  p.style.cssText = 'left:'+Math.random()*100+'vw;width:'+size+'px;height:'+size+'px;background:'+color+';box-shadow:0 0 '+(size*3)+'px '+color+';animation-duration:'+(Math.random()*12+8)+'s;animation-delay:'+(Math.random()*5)+'s;';
  document.body.appendChild(p);
  setTimeout(function(){ p.remove(); }, 20000);
}
for (var i = 0; i < 18; i++) setTimeout(spawnParticle, i * 400);
setInterval(spawnParticle, 1800);

// ── Marquee ──
var track = document.getElementById('marqueeTrack');
if (track) {
  var all = techItems.concat(techItems);
  all.forEach(function(t) {
    var el = document.createElement('span');
    el.className = 'marquee-item';
    el.innerHTML = '<span class="marquee-dot"></span>' + t;
    track.appendChild(el);
  });
}

// ── Project Modal ──
function showProjectModal(title, desc) {
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(2,12,2,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML = '<div style="background:#050f05;border:1px solid rgba(0,255,65,0.4);padding:40px;max-width:500px;width:100%;position:relative;box-shadow:0 0 40px rgba(0,255,65,0.15);"><button onclick="document.body.removeChild(this.parentElement.parentElement)" style="position:absolute;top:12px;right:16px;background:none;border:none;color:#5a8a5a;font-size:1.8rem;cursor:pointer;line-height:1;">&#215;</button><div style="color:#00ff41;margin-bottom:12px;font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;">Project</div><div style="font-size:1.4rem;margin-bottom:16px;color:#e0ffe0;">' + title + '</div><p style="color:#5a8a5a;line-height:1.7;">' + desc + '</p></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) document.body.removeChild(overlay); });
}

// ── Skill Bars ──
var bars = document.querySelectorAll('.skill-bar-fill');
var barObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, {threshold:0.2});
bars.forEach(function(b){ barObs.observe(b); });

// ── Feedback ──
function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function loadFeedback() {
  var list = document.getElementById('feedbackList');
  var noMsg = document.getElementById('noFeedback');
  if (!list) return;
  var stored = JSON.parse(localStorage.getItem('portfolioFeedback') || '[]');
  if (stored.length === 0) { if(noMsg) noMsg.style.display='block'; return; }
  if (noMsg) noMsg.style.display = 'none';
  list.innerHTML = '';
  stored.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = '<div class="feedback-name">'+escapeHtml(item.name)+'</div><div class="feedback-email">'+escapeHtml(item.email)+'</div><div class="feedback-message">'+escapeHtml(item.message)+'</div>';
    list.appendChild(div);
  });
}

// ── Form ──
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var valid = true;

    document.querySelectorAll('.error-msg').forEach(function(el){ el.classList.remove('show'); });
    document.querySelectorAll('input,textarea').forEach(function(el){ el.classList.remove('error'); });

    if (!name) { document.getElementById('nameError').classList.add('show'); document.getElementById('name').classList.add('error'); valid=false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('emailError').classList.add('show'); document.getElementById('email').classList.add('error'); valid=false; }
    if (!message) { document.getElementById('messageError').classList.add('show'); document.getElementById('message').classList.add('error'); valid=false; }

    if (valid) {
      var stored = JSON.parse(localStorage.getItem('portfolioFeedback') || '[]');
      stored.unshift({name:name, email:email, message:message});
      localStorage.setItem('portfolioFeedback', JSON.stringify(stored.slice(0,20)));
      loadFeedback();
      var s = document.getElementById('successMsg');
      if(s){ s.classList.add('show'); setTimeout(function(){ s.classList.remove('show'); }, 4000); }
      form.reset();
      var fd = document.getElementById('feedback-display');
      if(fd) fd.scrollIntoView({behavior:'smooth'});
    }
    return false;
  });
}

loadFeedback();