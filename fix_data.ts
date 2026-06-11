import fs from 'fs';

let dataStr = fs.readFileSync('src/data.ts', 'utf8');

const imports = `import IKnowGender from './assets/images/I Know Gender_Course certificate - I Know Gender An Introduction to Gender Equality for UN staff_page-0001.jpg';
import ProtectionHumanRights from './assets/images/Protection_and_promotion_of_human_rights_in_mental_health_and_psychosocial_support_in_emergencies-Course_Certificate_8728215_page-0001.jpg';
import IntroAdvocacy from './assets/images/Advocacy_Course certificate - Introduction to Advocacy_page-0001.jpg';
import DigitalSecurity from './assets/images/Digital Security and human rights amensty_page-0001.jpg';
import PrimaryHealthCare from './assets/images/The primary health care approach_page-0001.jpg';
import ResearchHealth from './assets/images/Reasearch health emergency and disasters_page-0001 (1).jpg';
`;

dataStr = imports + "\n" + dataStr;

dataStr = dataStr.replace(/id: 'cert-unwomen-gender',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: IKnowGender`);
});

dataStr = dataStr.replace(/id: 'cert-who-mental-health',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: ProtectionHumanRights`);
});

dataStr = dataStr.replace(/id: 'cert-savethechildren-advocacy',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: IntroAdvocacy`);
});

dataStr = dataStr.replace(/id: 'cert-amnesty-digital-security',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: DigitalSecurity`);
});

dataStr = dataStr.replace(/id: 'cert-who-primary-health',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: PrimaryHealthCare`);
});

dataStr = dataStr.replace(/id: 'cert-who-health-emergencies-research',[\s\S]*?image: '.*?'/, (match) => {
    return match.replace(/image: '.*?'/, `image: ResearchHealth`);
});

fs.writeFileSync('src/data.ts', dataStr);
console.log("Done");
