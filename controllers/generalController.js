const { getSorteos, GetWeeks, GetAvalaibleSorteos, getReporteSemanal } = require('../config/db');
const nodemailer = require("nodemailer");

exports.getSorteos = async (req, res) =>{
    if(req.usuario){

        getSorteos().then(response=>{
            res.json({Sorteos: response})
        });
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.getSorteosDropdown = async (req, res) =>{
    if(req.usuario){
        GetAvalaibleSorteos().then(response=>{
            res.json({response})
        });
       
    }
    else{
        res.sendStatus(401);
    }
}

exports.ReporteSemanal = async (req, res) =>{
    if(req.usuario){
        const {agentParentId, Fecha} = req.body;
        getReporteSemanal(agentParentId, Fecha).then(response=>{
            res.json({response})
        });
    }
    else{
        res.sendStatus(401);
    }
}
exports.GetWeeks = async (req, res) =>{
    if(req.usuario){

        GetWeeks().then(response=>{
            res.json(response)
        });
    }
    else{
        res.sendStatus(401);
    }
}

exports.sendMail = async (req, res) => {
    const {msg} = req.body;
    var request = require("request");
    var options = {
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers:
        {
            'Postman-Token': 'c6e2e63a-6e5f-43ac-821d-4483a6822717',
            'cache-control': 'no-cache',
            Authorization: 'Bearer ',
            'Content-Type': 'application/json'
        },
        body:
        {
            personalizations:
                [{
                    to: [{ email: "nilton.obregon@agenciadatsun.com" }],
                  cc: [{ email: "m.hernandez@audicr.com" }],
                    subject: "Audi Web"
                }],
            from: { email: 'agentevirtual@nissancr.com' },
            content: [{ type: 'text/html', value: msg }]
        },
        json: true
    };

    request(options, function (error, response, msg) {
        if (error) throw new Error(error);

    });
    res.sendStatus(200);
}
exports.sendMailGeneral = async (req, res) => {
    const {msg, subject} = req.body;

    var request = require("request");
    var options = {
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers:
        {
            'Postman-Token': 'c6e2e63a-6e5f-43ac-821d-4483a6822717',
            'cache-control': 'no-cache',
            Authorization: 'Bearer ',
            'Content-Type': 'application/json'
        },
        body:
        {
            personalizations:
                [{
                    to: [{ email: "nilton.obregon@agenciadatsun.com" }, { email: "angelica.rodriguez@agenciadatsun.com" }, { email: "billy.rodriguez@agenciadatsun.com" }, { email: "jorge.rojas@grupodanissa.com" }],
                  cc: [{ email: "jorgek8001@gmail.com" }],
                    subject: subject
                }],
            from: { email: 'agentevirtual@nissancr.com' },
            content: [{ type: 'text/html', value: msg }]
        },
        json: true
    };

    request(options, function (error, response, msg) {
        if (error) throw new Error(error);

    });
    res.sendStatus(200);
}