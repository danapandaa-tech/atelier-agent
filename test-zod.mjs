import { z } from 'zod';
const s = z.object({q: z.string()});
console.log('~standard' in s);
console.log(s['~standard']?.version);
console.log(s['~standard']?.vendor);
