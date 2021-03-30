class consultasFactory{

    consultas(consulta){
        var day = consulta.data.getDate()+1;
        var month = consulta.data.getMonth();
        var year = consulta.data.getFullYear();
        var hour =  Number.parseInt(consulta.hora.split(":")[0]);
        var minutes = Number.parseInt(consulta.hora.split(":")[1]);

        var startDate = new Date(year,month,day,hour,minutes,0,0);
        
        var appo = {
            id: consulta._id,
            title: consulta.nome + " - " + consulta.descricao, 
            start: startDate,
            end: startDate,
            notified: consulta.notificar,
            email: consulta.email
        }

        return appo;
    }
}

module.exports = new consultasFactory