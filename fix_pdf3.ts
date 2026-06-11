import fs from 'fs';

let appStr = fs.readFileSync('src/App.tsx', 'utf8');

const searchImageBlock = `{cert.pdf ? (
                          <iframe 
                            src={\`\${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH\`}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 pointer-events-none border-0"
                            title={cert.title}
                          />
                        ) : (
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          />
                        )}`;

const replaceImageBlock = `<img 
                          src={cert.image} 
                          alt={cert.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />`;

appStr = appStr.split(searchImageBlock).join(replaceImageBlock);

const searchModalBlock = `{CERTIFICATIONS_DATA[selectedCertIndex].pdf ? (
                <iframe 
                  src={CERTIFICATIONS_DATA[selectedCertIndex].pdf}
                  title={CERTIFICATIONS_DATA[selectedCertIndex].title}
                  className="w-full h-full min-h-[50vh] rounded-lg border-0"
                />
              ) : (
                <img 
                  src={CERTIFICATIONS_DATA[selectedCertIndex].image} 
                  alt={CERTIFICATIONS_DATA[selectedCertIndex].title}
                  referrerPolicy="no-referrer"
                  style={{ transform: \`scale(\${zoomScale})\` }}
                  className="max-w-full max-h-[50vh] object-contain rounded-lg transition-transform duration-300"
                />
              )}`;

const replaceModalBlock = `<img 
                  src={CERTIFICATIONS_DATA[selectedCertIndex].image} 
                  alt={CERTIFICATIONS_DATA[selectedCertIndex].title}
                  referrerPolicy="no-referrer"
                  style={{ transform: \`scale(\${zoomScale})\` }}
                  className="max-w-full max-h-[50vh] object-contain rounded-lg transition-transform duration-300"
                />`;
                
appStr = appStr.split(searchModalBlock).join(replaceModalBlock);

fs.writeFileSync('src/App.tsx', appStr);
