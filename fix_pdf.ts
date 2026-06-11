import fs from 'fs';

// 1. Fix src/types.ts
let typesStr = fs.readFileSync('src/types.ts', 'utf8');
typesStr = typesStr.replace("  pdf?: string;\n", "");
fs.writeFileSync('src/types.ts', typesStr);

// 2. Fix src/data.ts
let dataStr = fs.readFileSync('src/data.ts', 'utf8');
dataStr = dataStr.replace(/,\s*pdf:\s*'.*?'/g, "");
fs.writeFileSync('src/data.ts', dataStr);

// 3. Fix src/App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');

const searchLink = `    link.href = cert.pdf || cert.image;
    link.target = '_blank';
    const isPdf = !!cert.pdf;
    link.download = \`\${cert.title.replace(/\\s+/g, '_')}_Certificate.\${isPdf ? 'pdf' : 'jpg'}\`;`;
const replaceLink = `    link.href = cert.image;
    link.target = '_blank';
    link.download = \`\${cert.title.replace(/\\s+/g, '_')}_Certificate.jpg\`;`;
appStr = appStr.replace(searchLink, replaceLink);

appStr = appStr.replace(/{cert\.pdf \? \([\s\S]*?\) : \([\s\S]*?<img\n\s*src={cert\.image}\n\s*alt={cert\.title}\n\s*referrerPolicy="no-referrer"\n\s*className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"\n\s*\/>\n\s*\)\}/g, 
`<img 
                          src={cert.image} 
                          alt={cert.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />`);

appStr = appStr.replace(/\{\!CERTIFICATIONS_DATA\[selectedCertIndex\]\.pdf && \([\s\S]*?<button[\s\S]*?Zoom Out[\s\S]*?<span[\s\S]*?Zoom In[\s\S]*?<\/button>\n\s*<\/>\n\s*\)\}/g, 
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

appStr = appStr.replace(/\{CERTIFICATIONS_DATA\[selectedCertIndex\]\.pdf \? \([\s\S]*?\) : \([\s\S]*?<img\n\s*src={CERTIFICATIONS_DATA\[selectedCertIndex\]\.image}[\s\S]*?<\/div>/g, 
`<img 
                src={CERTIFICATIONS_DATA[selectedCertIndex].image} 
                alt={CERTIFICATIONS_DATA[selectedCertIndex].title}
                referrerPolicy="no-referrer"
                style={{ transform: \`scale(\${zoomScale})\` }}
                className="max-w-full max-h-[50vh] object-contain rounded-lg transition-transform duration-300"
              />
            </div>`);

fs.writeFileSync('src/App.tsx', appStr);
console.log("Done");
