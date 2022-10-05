const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const API=process.env.API_KEY;
const URL=process.env.URL_KEY;
const FROM=process.env.FROM_ID;
const TOO=process.env.ADMIN_ID;

const mg = mailgun.client({
    username: 'api',
    key: API,
});
const url = URL;

function orderController() {
    return {
        store(req, res) {
            message1 = 'An order has been placed by  ' + req.body.Name + '\n'
                + '\n' + ' Customers email-ID: ' + req.body.email + '\n'
                + '\n' + 'At address ' + req.body.address + '\n' +
                '\n' + 'total amount :' + req.session.cart.totalPrice + '\n' +
                ' THANK YOU!';
            mg.messages.create(url, {
                    from: FROM,
                    to: [TOO],
                    subject: "Order Details",
                    text: message1,
                })
                    delete req.session.cart
                    return res.json({ message : 'Order placed succesfully , you will recieve mail shortly'  });
        }
        
        
    }
    
}

module.exports = orderController