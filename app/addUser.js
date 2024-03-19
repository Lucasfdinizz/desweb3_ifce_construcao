const AdminController = require('./controllers/AdminController');

function getAdminController() {
    return new Promise((resolve, reject) => {
        try {
            const adminController = new AdminController();
            resolve(adminController);
        } catch (error) {
            reject(error);
        }
    });
}

async function addUser(adminController) {
    const userDetails = {
        body: {
            nome: 'Lucas',
            senha: '8784'
        }
    };

    const fakeRes = {
        redirect: (url) => {
            console.log(`Usuário criado com sucesso. Redirecionando para ${url}`);
        }
    };

    try {
        await adminController.create(userDetails, fakeRes);
        console.log('Usuário criado com sucesso');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
}

getAdminController().then(adminController => {
    addUser(adminController);
});