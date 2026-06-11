import fs from 'fs';

let appStr = fs.readFileSync('src/App.tsx', 'utf8');

const search = `{cert.pdf ? (
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

const replace = `<img 
                              src={cert.image} 
                              alt={cert.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                            />`;

appStr = appStr.split(search).join(replace);
fs.writeFileSync('src/App.tsx', appStr);
