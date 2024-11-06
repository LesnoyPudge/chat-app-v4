import { U } from '@lesnoypudge/utils/namespace';



const qwe = {
    data: 'qwe',
    some: 5,
    wow: 'zxc',
};

const zxc = Object.keys<typeof qwe>(qwe);
//    ^?

// console.log('in server!! yup', process.env.NODE_ENV);