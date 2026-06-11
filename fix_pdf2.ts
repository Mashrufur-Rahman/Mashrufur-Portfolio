import fs from 'fs';

let appStr = fs.readFileSync('src/App.tsx', 'utf8');

// Also remove `{!CERTIFICATIONS_DATA[selectedCertIndex].pdf && (` around zoom buttons
appStr = appStr.replace(/\{\!CERTIFICATIONS_DATA\[selectedCertIndex\]\.pdf && \([\s\S]*?<button[\s\S]*?Zoom Out[\s\S]*?<span[\s\S]*?Zoom In[\s\S]*?<\/button>\n\s*<\/>\n\s*\)\}/, 
`<button 
                onClick={() => { playCustomBeep(600, 0.05); setZoomScale(s => Math.max(1, s - 0.5)); }}
                className="hover:text-[#00FFFF] border border-white/5 hover:border-[#00FFFF]/30 bg-white/5 rounded px-2.5 py-1 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                Zoom Out
              </button>
              <span className="text-white font-bold">{zoomScale * 100}%</span>
              <button 
                onClick={() => { playCustomBeep(600, 0.05); setZoomScale(s => Math.min(3, s + 0.5)); }}
                className="hover:text-[#00FFFF] border border-white/5 hover:border-[#00FFFF]/30 bg-white/5 rounded px-2.5 py-1 transition-colors cursor-pointer"
                title="Zoom In"
              >
                Zoom In
              </button>`);

appStr = appStr.replace(/\{CERTIFICATIONS_DATA\[selectedCertIndex\]\.pdf \? \([\s\S]*?\) : \([\s\S]*?<img\n\s*src={CERTIFICATIONS_DATA\[selectedCertIndex\]\.image}[\s\S]*?<\/div>/, 
`<img 
                src={CERTIFICATIONS_DATA[selectedCertIndex].image} 
                alt={CERTIFICATIONS_DATA[selectedCertIndex].title}
                referrerPolicy="no-referrer"
                style={{ transform: \`scale(\${zoomScale})\` }}
                className="max-w-full max-h-[50vh] object-contain rounded-lg transition-transform duration-300"
              />
            </div>`);

fs.writeFileSync('src/App.tsx', appStr);
