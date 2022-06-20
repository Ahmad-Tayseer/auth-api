'use strict';

module.exports = (capability) => {
    // 'update'
    return (req, res, next) => {
        try {
            // user can do action
            if (req.user.actions.includes(capability)) {
                next();
            } else {
                next('Access Denied');
            }
        } catch (e) {
            next('invalid login')
        }
    }
}

// 'use strict';
// module.exports = (action) => (req, res, next) => {
//     console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
//     try {
//         if (req.user.actions.includes(action)) {
//             console.log('hi');
//             next();
//         } else {
//             next('access denied')
//         }
//     } catch (e) {

//     }
// }